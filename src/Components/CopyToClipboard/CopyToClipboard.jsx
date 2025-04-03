import { useState, useEffect } from "react";

export default function CopyToClipboard({ textToCopy }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy); //  نسخ النص إلى الحافظة
      setCopied(true); // عرض رسالة التأكيد
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
  //  إخفاء رسالة التأكيد بعد 3 ثوانٍ
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 3000);
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
