export const Logo = ({
  heartColor = '#FFF',
  ...props
}: {
  heartColor?: string
  [key: string]: any
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
      <path
        d="M128,64c0,35.3-28.8,64-64,64S0,99.3,0,64,28.8,0,64,0s64,28.7,64,64Z"
        fill="currentColor"
        stroke-width="0"
      />
      <path
        d="M63.9,46.4c-2.3-3.9-7-8-13.9-8s-16.8,7.2-16.8,18.3c0,19.9,23.4,33.4,26.7,35.2,1.2.6,2.8,1.5,4,1.5s2.8-.9,3.9-1.5c3.3-1.7,26.7-15.4,26.7-35.2s-7.6-18.3-16.8-18.3-11.6,4-13.9,8Z"
        fill={heartColor}
        stroke-width="0"
      />
    </svg>
  )
}
