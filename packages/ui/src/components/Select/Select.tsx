import { type SelectHTMLAttributes } from "react";
import { useId } from "react";
import "./select.css"

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean
}

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    helperText?: string;
    errorText?: string;
    placeholder?: string;
    options: SelectOption[];
    className?:string;
}

export function Select({
  id,
  label,
  helperText,
  errorText,
  options,
  placeholder,
  className,
  ...selectProps
}:SelectProps) {
  const classes = [
    'select',
    `${className}`
  ].filter(Boolean).join(" ");
  const generatedId = useId();
  const selectId = id || generatedId;
  const messageId = `${selectId}-message`;
  return (
    <div className="select-field">
      { label && <label htmlFor={selectId}>{label}</label> }
      <select
        id={selectId}
        className={classes}
        aria-invalid={errorText ? true : undefined}
        aria-describedby={
          helperText || errorText ? messageId : undefined
        }
        {...selectProps}
      >
        {
          placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {
          options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))
        }
      </select>
      { errorText 
          ? (<span id={messageId} className="select-error">{errorText}</span>)
          : helperText && (<span id={messageId} className="select-helper">{helperText}</span>)  
      } 
    </div>
  )
}