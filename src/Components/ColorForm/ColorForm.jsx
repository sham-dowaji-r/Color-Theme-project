import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import { nanoid } from "nanoid";

export default function ColorForm({ onSubmitColor, initialData }) {
  const [role, setRole] = useState(initialData?.role || "");
  const [hex, setHex] = useState(initialData?.hex || "#121212");
  const [contrastText, setContrastText] = useState(
    initialData?.contrastText || "#ffffff"
  );

  function handleSubmit(event) {
    event.preventDefault();

    const newColor = {
      id: initialData?.id || nanoid(),
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

      <button type="submit">
        {initialData ? "Save Changes" : "Add Color"}
      </button>
    </form>
  );
}
