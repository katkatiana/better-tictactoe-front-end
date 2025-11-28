import { InputProps } from "../interfaces/form";

export function Input({ label, name, type = "text", placeholder, value, onChangeFunc, min, max, checked }: InputProps) {
  return (
    <div>
      <label>
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
    </div>
  );
}
