import { useId, type InputHTMLAttributes } from "react"
import "./checkbox.css";

export interface CheckboxProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?:string;
    helperText?:string;
    error?: string
  }

export function Checkbox({
  id,
  label,
  helperText,
  error,
  className,
  ...inputProps
}:CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const messageId = `${checkboxId}-message`;

  const checkBoxClass = [
    "checkbox",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className="checkbox-field">
      <label
        className="checkbox-label"
        htmlFor={checkboxId}
      >
        <input
          {...inputProps}
          id={checkboxId}
          type="checkbox"
          className={checkBoxClass}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            helperText || error ? messageId : undefined
          }
        />
        { label && (
          <span className="checkbox-label-text">
            {label}
          </span>
        )}
      </label>
      {
        error ? (
          <span 
            id={messageId}
            className="checkbox-error"
          >
            {error}
          </span>
        )
        : helperText && (
          <span 
            className="checkbox-helper"
            id={messageId}
          >
            {helperText}
          </span>
        )
      }
    </div>
  );
}