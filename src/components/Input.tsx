import { InputProps } from "../interfaces/form";
import "../style/Input.css";

export function Input({ label, name, type = "text", placeholder, value, onChangeFunc, min, max, checked, inline }: InputProps) {
  return (
      <label className={`lighter-text-color ${inline ? "input-inline" : "input-block"}`}>
        {label}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChangeFunc}
          min={min}
          max={max}
          checked={checked}
        />
      </label>
  );
}
