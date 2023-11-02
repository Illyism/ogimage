import { Star } from 'lucide-react'
import Image from 'next/image'

export const TestimonialAvatars = () => {
  const people = [
    'https://senjaio.b-cdn.net/public/avatar/3e7dd4ff-5a8c-4e7f-be64-10e2c716d072_Brian-Headshot-29.png',
    'https://senjaio.b-cdn.net/public/media/HybQCvNA4kPb104YrbOrJR1x.jpeg',
    'https://senjaio.b-cdn.net/public/avatar/bb59888a-aaff-4ecb-93d8-0cb926b38cd5_Headshot%20Yanick.png',
    'https://senjaio.b-cdn.net/public/avatar/cca208a2-58d0-4f07-8fde-d4058b65bf03_Frame%202%20with%20bg.png',
    'https://senjaio.b-cdn.net/public/avatar/5dd483f5-e741-44b8-bdfa-1c6b349b290e_1686686461200.jfif',
  ]
  return (
    <div className="inline-flex items-center gap-4 text-sm">
      <div className="flex">
        {people.map((person, index) => (
          <Image
            key={index}
            className="-ml-2 h-10 w-10 rounded-full border-2 border-primary/10 shadow"
            src={person}
            width={40}
            height={40}
            alt="Avatar"
          />
        ))}
      </div>
      <div>
        <div className="flex">
          <Star fill="currentColor" className="h-6 w-6 text-yellow-500" />
          <Star fill="currentColor" className="h-6 w-6 text-yellow-500" />
          <Star fill="currentColor" className="h-6 w-6 text-yellow-500" />
          <Star fill="currentColor" className="h-6 w-6 text-yellow-500" />
          <Star fill="currentColor" className="h-6 w-6 text-yellow-500" />
        </div>
        <div>
          from <span className="font-bold">10+</span> happy customers
        </div>
      </div>
    </div>
  )
}
