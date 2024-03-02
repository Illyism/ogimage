import csv from 'csv-parser'
import fs from 'fs'

interface Review {
  type: string
  integration: string
  title: string
  text: string
  rating: number
  attachments: string
  url: string
  date: string
  platform_id: string
  video_mp4_url: string
  tags: string
  likes: number
  customer_name: string
  customer_email: string
  customer_avatar: string
  customer_tagline: string
  customer_username: string
  customer_company: string
  customer_url: string
}

const reviews: Review[] = []
fs.createReadStream(__dirname + '/reviews.csv')
  .pipe(csv())
  .on('data', (data) => reviews.push(data))
  .on('end', () => {
    fs.writeFile(
      __dirname + '/reviews.json',
      JSON.stringify(reviews, null, 2),
      (err) => {
        if (err) throw err
        console.log('The file has been saved!')
      },
    )
  })
