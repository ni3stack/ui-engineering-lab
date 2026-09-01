import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import "./switch.css"

type SwitchSize = "small" | "medium" | "large";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    label?:string;
    helperText?:string;
    error?:string;
    switchSize?: SwitchSize;
}

export function Switch({
  id,
  label,
  helperText,
  error,
  className,
  switchSize = "medium",
  ...switcProps
}:SwitchProps) {

  const generatedId = useId();
  const switchId = id || generatedId;
  const messageId = `messageId-${switchId}`;

  const classes = [
    "switch",
    `switch--${switchSize}`,
    className
  ].filter(Boolean).join(" ");

  return (
    <div className="switch-field">
      <label 
        className="switch-label" 
        htmlFor={switchId}
      >
        <input
          {...switcProps}
          id={switchId}
          type="checkbox"
          role="switch"
          className={classes}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || helperText ? messageId : undefined }
        />
        <span className="switch-track" aria-hidden="true">
          <span className="switch-thumb"></span>
        </span>
        { label && ( <span className="swicth-label-text">{label}</span>)}
      </label>
      {
        error ?
          (
            <span 
              id={messageId}
              className="switch-error"
            >
              {error}
            </span>
          ) : (
            helperText && (
            <span 
              id={messageId}
              className="helper-text"
            >
              {helperText}
            </span>
          ))
        }
    </div>
  );
}