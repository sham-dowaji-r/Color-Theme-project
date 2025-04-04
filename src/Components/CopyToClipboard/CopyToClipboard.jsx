import { useState, useEffect } from "react";

export default function CopyToClipboard({ textToCopy }) {
  // لتخزين حالة النسخ
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available"); // في حال المتصفح ما بيدعم النسخ
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy); //  نسخ النص إلى الحافظة
      setCopied(true); // عرض رسالة التأكيد
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 3000); //  إخفاء رسالة التأكيد بعد 3 ثوانٍ
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="copy-container">
      {copied ? (
        <p>SUCCESFULLY COPIED!</p> // عرض رسالة التأكيد
      ) : (
        <button onClick={handleCopy}>COPY</button> // عرض الزر إذا لم يتم النسخ
      )}
    </div>
  );
}
