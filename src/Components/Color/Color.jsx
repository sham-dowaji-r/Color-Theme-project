import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./Color.css";

export default function Color({ color, onUpdatedColor }) {
  const [editMode, setEditMode] = useState(false); // تتبع وضع التعديل

  function handleEdit(updatedColor) {
    onUpdatedColor(updatedColor);
    setEditMode(false); // إغلاق وضع التعديل بعد الحفظ
  }

  return (
    <div
      className="color-card"
      style={{ background: color.hex, color: color.contrastText }}
    >
      {editMode ? (
        <ColorForm initialData={color} onSubmitColor={handleEdit} />
      ) : (
        <>
          <h3>{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>Contrast: {color.contrastText}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
