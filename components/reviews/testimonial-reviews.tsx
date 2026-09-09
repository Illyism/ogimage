import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { endorsers } from './reviews'

export const TestimonialReviews = () => (
  <div className="flex">
    {endorsers.slice(0, 6).map((person, index) => (
      <Avatar
        className="-ml-2 size-9 border first:ml-0"
        key={person.username || person.name || index}
      >
        <AvatarImage alt="" src={person.avatar} />
        <AvatarFallback>{person.name.slice(0, 1)}</AvatarFallback>
      </Avatar>
    ))}
  </div>
)
