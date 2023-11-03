import { cn } from '@/lib/utils'

export const RankCard = ({
  className,
  keywords,
}: {
  className?: string
  keywords: [string, number, string?][]
}) => {
  return (
    <div
      className={cn(
        'space-y-1 rounded-lg bg-background/30 p-4 shadow',
        className,
      )}
    >
      {keywords.map(([keyword, position, country], index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-2 text-left">
            {country ? (
              <span className="flex h-4 w-4 items-center justify-center text-xl">
                {country}
              </span>
            ) : (
              <svg
                className="mt-0.5 hidden h-4 w-4 sm:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#8ab4f8"
              >
                <path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.6 0 3-.6 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
              </svg>
            )}
            <span className="flex-1 truncate font-medium">
              <span>{keyword}</span>
            </span>
          </div>
          <div className="flex h-6 w-6  items-center justify-center rounded-full border border-green-500 text-xs font-black text-white">
            {position}
          </div>
        </div>
      ))}
    </div>
  )
}
