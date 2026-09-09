import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import "./input.css";

export type InputSize = "small" | "medium" | "large";

export interface InputProps 
  extends InputHTMLAttributes<HTMLInputElement> {
    label?:string;
    helperText?: string;
    error?:string;
    inputSize?:InputSize,
    showPasswordToggle?: boolean,
}

export function Input({
  id,
  label,
  helperText,
  error,
  className,
  inputSize = "medium",
  showPasswordToggle = false,
  type:inputType,
  ...inputProps
}:InputProps) {

  const [ showPassword, setShowPassword ] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  const isPasswordInput = inputType === "password";
  const shouldShowToggle = isPasswordInput && showPasswordToggle;


  const classes = [
    "input",
    `input--${inputSize}`,
    shouldShowToggle && "input--with-password-toggle",
    className,
  ].filter(Boolean).join(" ");


  return (
    <div className="input-field">
      { label && 
        <label
          htmlFor={inputId}
        >
          {label}
        </label>
      }
      <div className="input-control">
        <input 
          id={inputId}
          className={classes}
          type={
            shouldShowToggle && showPassword
              ? "text" : inputType
          }
          aria-invalid={error ? true : undefined}
          aria-describedby= {
            helperText || error ? messageId : undefined
          }
          {...inputProps} 
        />
        {
          shouldShowToggle && (
            <button
              type="button"
              className="input-password-toggle"
              aria-label={
                showPassword 
                  ? "Hide password"
                  : "Show password"
              }
              onClick={() => setShowPassword((visible) => !visible)}
              disabled={inputProps.disabled}
              onMouseDown={(event) => {
                event?.preventDefault()
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )
        }
      </div>
      { error 
          ? (<span id={messageId} className="input-error">{error}</span>)
          : (helperText && <span id={messageId} className="input-helper">{helperText}</span>
      )}
    </div>
    
  )
}