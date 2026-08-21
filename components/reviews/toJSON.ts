import fs from 'node:fs'
import csv from 'csv-parser'

interface Review {
  attachments: string
  customer_avatar: string
  customer_company: string
  customer_email: string
  customer_name: string
  customer_tagline: string
  customer_url: string
  customer_username: string
  date: string
  integration: string
  likes: number
  platform_id: string
  rating: number
  tags: string
  text: string
  title: string
  type: string
  url: string
  video_mp4_url: string
}

const reviews: Review[] = []
fs.createReadStream(`${import.meta.dirname}/reviews.csv`)
  .pipe(csv())
  .on('data', (data) => reviews.push(data))
  .on('end', () => {
    fs.writeFile(
      `${import.meta.dirname}/reviews.json`,
      JSON.stringify(reviews, null, 2),
      (err) => {
        if (err) {
          throw err
        }
        console.log('The file has been saved!')
      },
    )
  })
