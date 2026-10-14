import { useRef, useEffect } from 'react'

function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  autoFocus = false,
  placeholder = ''
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <p id={`${name}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormInput