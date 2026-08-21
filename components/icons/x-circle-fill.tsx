export default function XCircleFill({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path d="M15 9l-6 6" stroke="white" />
      <path d="M9 9l6 6" stroke="white" />
    </svg>
  )
}
