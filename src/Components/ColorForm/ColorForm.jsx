import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import { nanoid } from "nanoid";

export default function ColorForm({ onAddColor }) {
  const [colorData, setColorData] = useState({
    role: "Custom",
    hex: "#3498db",
    contrastText: "#ffffff",
  });

  const handleChange = (e) => {
    setColorData({ ...colorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddColor({ id: nanoid(), ...colorData });
    setColorData({ role: "Custom", hex: "#3498db", contrastText: "#ffffff" }); // إعادة القيم الافتراضية
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Role:</label>
      <input
        type="text"
        name="role"
        value={colorData.role}
        onChange={handleChange}
      />

      <ColorInput
        label="Color Hex:"
        value={colorData.hex}
        onChange={handleChange}
        name="hex"
      />
      <ColorInput
        label="Contrast Text"
        value={colorData.contrastText}
        onChange={handleChange}
        name="contrastText"
      />

      <button type="submit">Add Color</button>
    </form>
  );
}
