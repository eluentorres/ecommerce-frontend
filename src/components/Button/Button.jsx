function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick
}) {
  return (
    <button
      type={type}
      className={`btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button