import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./Color.css";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import { postFetch } from "../../lib/utils";

export default function Color({ color, onUpdatedColor, onDeleteColor }) {
  const [editMode, setEditMode] = useState(false); // تتبع وضع التعديل

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [contrastScore, setContrastScore] = useState(null); // تخزين النتيجة من API

  useEffect(() => {
    const getScore = async () => {
      setContrastScore(await postFetch(color.hex, color.contrastText)); //جلب نتيجة الفيتش
    };

    if (color.hex && color.contrastText) {
      getScore(); // فقط أرسل الـ request إذا كانت القيم موجودة
    }
  }, [color.hex, color.contrastText]); // التأكد من أن الـ useEffect يتنفذ فقط عندما يتغير hex أو contrastText

  function handleEdit(updatedColor) {
    const checkedColor = { ...updatedColor, contrastScore: contrastScore }; // دمج النتيجة مع اللون
    console.log(checkedColor);
    onUpdatedColor(updatedColor); // تمرير اللون المعدل
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
          <span>
            <h3>{color.hex} </h3> <CopyToClipboard textToCopy={color.hex} />{" "}
          </span>
          <h4>{color.role}</h4>
          <p>Contrast: {color.contrastText}</p>
          {contrastScore && (
            <p
              style={{
                background:
                  contrastScore === "Yup"
                    ? "green"
                    : contrastScore === "Kinda"
                    ? "orange"
                    : "red",
                color: "black",
                width: "fit-content",
              }}
            >
              Overall Contrast Score: {contrastScore}
            </p>
          )}

          <button onClick={() => setEditMode(true)}>EDIT</button>
          <button onClick={deleteColor}>DELETE</button>
        </>
      )}

      {confirmDelete && (
        <div className="delete-confirm-highlight">
          <div>
            <span>
              <p className="color-card-highlight">Are you sure?</p>{" "}
              <span></span> <button onClick={confirmDeleteColor}>DELETE</button>
              <button onClick={cancelDelete}>CANCEL</button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
