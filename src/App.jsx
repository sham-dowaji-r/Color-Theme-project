import useLocalStorageState from "use-local-storage-state";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import { initialColors } from "./lib/colors";
import "./App.css";

export default function App() {
  const [colors, setColors] = useLocalStorageState("themeColors", {
    defaultValue: initialColors,
  });
  console.log("Current Colors:", colors);

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

  function handleDeleteColor(colorId) {
    setColors(
      (prevColors) => prevColors.filter((color) => color.id !== colorId) // إزالة اللون بناءً على الـ id
    );
  }

  return (
    <>
      <ColorForm onSubmitColor={handleAddColor} />
      {colors.length > 0 ? (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onUpdatedColor={handleEditColor}
            onDeleteColor={handleDeleteColor} // تمرير وظيفة الحذف
          />
        ))
      ) : (
        // رسالة إذا كانت القائمة فارغة
        <p>No Colos..Start by adding one!</p>
      )}
    </>
  );
}
