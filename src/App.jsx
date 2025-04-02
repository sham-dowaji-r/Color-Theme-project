import { useState } from "react";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import { initialColors } from "./lib/colors";
import "./App.css";

export default function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([newColor, ...colors]); // إضافة اللون الجديد في البداية
  }

  function handleEditColor(updatedColor) {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
  }

  return (
    <div>
      <h1>Theme Creator</h1>

      {/* نموذج إضافة لون جديد */}
      <ColorForm onSubmitColor={handleAddColor} />

      {/* عرض الألوان */}
      <div className="color-cards-container">
        {colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onUpdatedColor={handleEditColor}
          />
        ))}
      </div>
    </div>
  );
}
