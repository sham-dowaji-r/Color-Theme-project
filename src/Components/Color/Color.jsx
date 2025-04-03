import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./Color.css";

export default function Color({ color, onUpdatedColor, onDeleteColor }) {
  const [editMode, setEditMode] = useState(false); // تتبع وضع التعديل
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleEdit(updatedColor) {
    onUpdatedColor(updatedColor);
    setEditMode(false); // إغلاق وضع التعديل بعد الحفظ
  }

  function deleteColor() {
    setConfirmDelete(true);
  }
  function confirmDeleteColor() {
    onDeleteColor(color.id);
    setConfirmDelete(false);
  }
  function cancelDelete() {
    setConfirmDelete(false);
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
          <button onClick={deleteColor}>Delete</button>
        </>
      )}

      {confirmDelete && (
        <div className="delete-confirm-highlight">
          <div>
            <span>
              <p className="color-card-highlight">Are you sure?</p>{" "}
              <span></span> <button onClick={confirmDeleteColor}>Delete</button>
              <button onClick={cancelDelete}>Cancel</button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
