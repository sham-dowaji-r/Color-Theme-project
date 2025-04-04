import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import { nanoid } from "nanoid";

export default function ColorForm({ onSubmitColor, initialData }) {
  // الحالة للحقول داخل النموذج، بنعبّيها إذا في بيانات موجودة (تعديل) أو بتكون فاضية (إضافة جديدة)
  const [role, setRole] = useState(initialData?.role || "");
  const [hex, setHex] = useState(initialData?.hex || "#121212");
  const [contrastText, setContrastText] = useState(
    initialData?.contrastText || "#ffffff"
  );

  async function handleSubmit(event) {
    // دالة بتنادي عند إرسال النموذج
    event.preventDefault();

    const newColor = {
      id: initialData?.id || nanoid(), // إذا كان تعديل، خليه نفس الـ id،// وإذا جديد، أنشئ id جديد
      role,
      hex,
      contrastText,
    };

    onSubmitColor(newColor);
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label>
        Role
        <br />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </label>

      <label>
        Hex
        <br />
        <ColorInput value={hex} onChange={(e) => setHex(e.target.value)} />
      </label>

      <label>
        Contrast Text
        <br />
        <ColorInput
          value={contrastText}
          onChange={(e) => setContrastText(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">
        {initialData ? "Save Changes" : "Add Color"}
      </button>
    </form>
  );
}
