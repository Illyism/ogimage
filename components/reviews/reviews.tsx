export interface Endorser {
  name: string
  email: string
  avatar: string
  tagline: string
  username: string
  company: string
  url: string
}

export interface Review {
  id?: string
  type: string
  integration: string
  title: string
  text: string
  rating: string
  attachments: string
  url: string
  date: string
  platform_id: string
  video_mp4_url: string
  video_poster?: string
  tags: string
  likes: string
  endorser: Endorser
}

export interface Highlight {
  highlight: string
  review: Review
  endorser: Endorser
  index: number
}

import rawReviews from './reviews.json'

export const reviews: Review[] = []
export const endorsers: Endorser[] = []

rawReviews.forEach((review) => {
  const endorser: Endorser = {
    name: review['endorser.name'],
    email: review['endorser.email'],
    avatar: review['endorser.avatar'],
    tagline: review['endorser.tagline'],
    username: review['endorser.username'],
    company: review['endorser.company'],
    url: review['endorser.url'],
  }

  const newReview: Review = {
    ...review,
    endorser,
  }

  reviews.push(newReview)
  endorsers.push(endorser)
})

export const getReview = (id: string) => {
  return reviews.find((review) => review.id === id)
}

let seed = new Date().getDate()
function addPunc(str: string) {
  if (str.endsWith('.')) return str
  if (str.endsWith('!')) return str
  return str + '!'
}
function capitalize(str: string) {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const highlights: Highlight[] = reviews
  .flatMap((review, index) => {
    const regex = /<mark>(.*?)<\/mark>/g
    const matches = [...review.text.matchAll(regex)].map((match) => match[1])
    return matches.map((match) => {
      return {
        highlight: capitalize(addPunc(match)),
        review,
        endorser: review.endorser,
        index,
      }
    })
  })
  .sort((a) => {
    // Use the seed to generate a pseudo-random number
    const pseudoRandomNumber = Math.sin(seed++) * 10000
    return (pseudoRandomNumber % 1) * a.highlight.length
  })
