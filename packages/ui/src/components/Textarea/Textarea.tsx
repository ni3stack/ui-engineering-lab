import { useId, type TextareaHTMLAttributes } from "react";
import "./Textarea.css";

export interface TextareaProps 
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id?: string;
    label?: string;
    helperText?: string;
    error?: string;
    className?: string;
}

export function Textarea({
  id,
  label,
  helperText,
  error,
  className,
  ...textareaProps
}:TextareaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const messageId = `${textareaId}-message`;


  const textareaClassName = [
    "textarea",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className="textarea-field">
      {
        label && (
          <label htmlFor={textareaId} className="textarea-label">
            {label}
          </label>
        )
      }
      <textarea
        {...textareaProps}
        id={textareaId}
        className={textareaClassName} 
        aria-describedby={helperText || error ? `${messageId}` : undefined}
        aria-invalid={error ? true : undefined}
      />
      {
        error ? (
          <span id={messageId} className="textarea-error">
            {error}
          </span>
        ) : helperText && (
          <span id={messageId} className="textarea-helper">
            {helperText}
          </span>
        )
      }
    </div>
  );
}   
