import { useState } from "react";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color"; // هذا المكون يعرض بطاقة اللون
import { initialColors } from "./lib/colors";

export default function App() {
  // الحالة لتخزين الألوان المضافة
  const [colors, setColors] = useState(initialColors);

  // الدالة التي تتعامل مع إرسال البيانات من النموذج
  function handleAddColor(newColor) {
    // نضيف اللون الجديد إلى بداية القائمة
    setColors([newColor, ...colors]);
  }

  return (
    <div>
      <h1>Theme Creator</h1>

      {/* عرض النموذج لإضافة لون جديد */}
      <ColorForm onSubmitColor={handleAddColor} />

      {/* عرض الألوان المضافة على شكل بطاقات */}
      <div className="color-cards-container">
        {colors.map((color, index) => (
          <Color key={index} color={color} />
        ))}
      </div>
    </div>
  );
}
