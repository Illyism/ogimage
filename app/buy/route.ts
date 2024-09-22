import { getPosthogClient, getPosthogId } from '@/core/analytics/bootstrapData'
import {
  type NewCheckout,
  createCheckout,
  lemonSqueezySetup,
} from '@lemonsqueezy/lemonsqueezy.js'
import { redirect } from 'next/navigation'

export async function GET() {
  lemonSqueezySetup({ apiKey: process.env.LMSQUEEZY! })

  const client = getPosthogClient()
  const distinct_id = getPosthogId()

  const storeId = 70232 // magicspace
  const variantId = process.env.LMSQUEEZY_ENV === 'production' ? 265794 : 266572

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const newCheckout: NewCheckout = {
    productOptions: {
      name: 'OG Image Generator - Lifetime Access',
      description:
        'Create OG Images for SEO - Works for any blog, website, Next.js and more - All source code + AI image generation',
    },
    checkoutData: {
      custom: {
        distinct_id,
      },
    },
    expiresAt: tomorrow.toISOString(),
  }

  const { error, data } = await createCheckout(storeId, variantId, newCheckout)

  if (error) {
    console.error('Error creating checkout', error)
    return new Response('Error creating checkout', { status: 500 })
  }

  client.capture({
    event: 'Checkout Started',
    distinctId: distinct_id,
    properties: {
      checkout_id: data?.data.id,
      checkout_url: data?.data.attributes.url,
    },
  })

  if (data?.data.attributes.url) {
    redirect(data.data.attributes.url)
  }

  return new Response('No checkout URL', { status: 500 })
}
