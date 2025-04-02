export default function ColorInput({ label, value, onChange, name }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="#000000"
      />
      <input type="color" name={name} value={value} onChange={onChange} />
    </div>
  );
}
