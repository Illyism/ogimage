const colors = {
  blue: {
    dark: 'rgba(59, 130, 246)',
    light: 'rgba(59, 130, 246, 0.4)',
  },
  white: {
    dark: 'rgba(255, 255, 255)',
    light: 'rgba(255, 255, 255, 0.4)',
  },
}

export function Spinner({
  className,
  color = 'blue',
}: {
  className?: string
  color?: 'blue' | 'white'
}) {
  const currentColor = colors[color]

  return (
    <svg
      aria-hidden="true"
      className={`animate-spin motion-reduce:hidden ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="16"
        rx="8"
        stroke={currentColor.light}
        strokeWidth="3"
        width="16"
        x="2"
        y="2"
      />
      <path
        d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2"
        stroke={currentColor.dark}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  )
}
