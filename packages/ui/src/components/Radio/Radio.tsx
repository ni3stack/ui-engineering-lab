import { useId, type InputHTMLAttributes  } from "react";
import "./radio.css"

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>,"type"> {
    label?:string;
    helperText?:string;
    error?:string
  }

export function Radio({
  id,
  label,
  error,
  helperText,
  className,
  ...inputProps
}:RadioProps) {
  const generatedId = useId();
  const radioId = id || generatedId;
  const messageId = `message-${radioId}`

  const classNames = [
    "radio",
    `${className}`,
  ].filter(Boolean).join(" ");


  return (
    <div className="radio-field">
      <label 
        htmlFor={radioId}
        className="radio-label">
        <input
          {...inputProps}
          id={radioId}
          type="radio"
          className={classNames}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error || helperText ? messageId : undefined
          }
        />
        { label && (
          <span 
            className="radio-text-label">{label}
          </span>
        )}
        
      </label>
      {
        error
          ? (<span id={messageId} className="radio-error">{error}</span>)
          : helperText && (
            <span id={messageId} className="radio-helper">{helperText}</span>
          )
      }
    </div>
  );
}