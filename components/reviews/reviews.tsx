export interface Endorser {
  avatar: string
  company: string
  email: string
  name: string
  tagline: string
  url: string
  username: string
}

export interface Review {
  attachments: string
  date: string
  endorser: Endorser
  id?: string
  integration: string
  likes: string
  platform_id: string
  rating: string
  tags: string
  text: string
  title: string
  type: string
  url: string
  video_mp4_url: string
  video_poster?: string
}

export interface Highlight {
  endorser: Endorser
  highlight: string
  index: number
  review: Review
}

import rawReviews from './reviews.json'

export const reviews: Review[] = []
export const endorsers: Endorser[] = []

for (const review of rawReviews) {
  const endorser: Endorser = {
    avatar: review.customer_avatar,
    company: review.customer_company,
    email: review.customer_email,
    name: review.customer_name,
    tagline: review.customer_tagline,
    url: review.customer_url,
    username: review.customer_username,
  }

  const newReview: Review = {
    ...review,
    endorser,
  }

  reviews.push(newReview)
  endorsers.push(endorser)
}

export const getReview = (id: string) =>
  reviews.find((review) => review.id === id)

let seed = new Date().getDate()
function addPunc(str: string) {
  if (str.endsWith('.')) {
    return str
  }
  if (str.endsWith('!')) {
    return str
  }
  return `${str}!`
}
function capitalize(str: string) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const highlights: Highlight[] = reviews
  .flatMap((review, index) => {
    const regex = /<mark>(.*?)<\/mark>/g
    const matches = [...review.text.matchAll(regex)].map((match) => match[1])
    return matches.map((match) => ({
      endorser: review.endorser,
      highlight: capitalize(addPunc(match)),
      index,
      review,
    }))
  })
  .sort((a) => {
    // Use the seed to generate a pseudo-random number
    const pseudoRandomNumber = Math.sin(seed) * 10_000
    seed += 1
    return (pseudoRandomNumber % 1) * a.highlight.length
  })
