import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./input.css";

export type InputSize = "small" | "medium" | "large";

export interface InputProps 
  extends InputHTMLAttributes<HTMLInputElement> {
    label?:string;
    helperText?: string;
    error?:string;
    inputSize?:InputSize
}

export function Input({
  id,
  label,
  helperText,
  error,
  className,
  inputSize = "medium",
  ...inputProps
}:InputProps) {

  const classes = [
    "input",
    `input--${inputSize}`,
    className,
  ].filter(Boolean).join(" ");

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`
  return (
    <div className="input-field">
      { label && 
        <label
          htmlFor={inputId}
        >
          {label}
        </label>
      }
      <input 
        id={inputId}
        className={classes}
        aria-invalid={error ? true : undefined}
        aria-describedby= {
          helperText || error ? messageId : undefined
        }
        {...inputProps} 
      />
      { error 
          ? (<span id={messageId} className="input-error">{error}</span>)
          : (helperText && <span id={messageId} className="input-helper">{helperText}</span>
      )}
    </div>
    
  )
}