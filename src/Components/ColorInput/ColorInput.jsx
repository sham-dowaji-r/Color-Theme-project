export default function ColorInput({ id, value, onChange }) {
  return (
    <>
      <input type="text" id={id} name={id} value={value} onChange={onChange} />
      <input type="color" value={value} onChange={onChange} />
    </>
  );
}
