import { getPosthogClient, getPosthogId } from '@/core/analytics/bootstrapData'
import {
  type NewCheckout,
  createCheckout,
  lemonSqueezySetup,
} from '@lemonsqueezy/lemonsqueezy.js'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  lemonSqueezySetup({ apiKey: process.env.LMSQUEEZY! })

  const client = getPosthogClient()
  const distinct_id = await getPosthogId()

  const storeId = 70232 // magicspace

  // Get plan from URL search params
  const { searchParams } = new URL(request.url)
  const plan = searchParams.get('plan') || 'essential'

  // Set variant ID based on plan
  let variantId: number
  if (plan === 'pro') {
    variantId = process.env.LMSQUEEZY_ENV === 'production' ? 988010 : 266572 // Use dev variant for pro in dev
  } else {
    variantId = process.env.LMSQUEEZY_ENV === 'production' ? 265794 : 266572 // Essential plan
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const planName = plan === 'pro' ? 'Pro' : 'Essential'
  const newCheckout: NewCheckout = {
    productOptions: {
      name: `OG Image Generator - ${planName} Plan`,
      description:
        'Create OG Images for SEO - Works for any blog, website, Next.js and more - All source code',
    },
    checkoutData: {
      custom: {
        distinct_id,
        plan: plan,
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
      plan: plan,
    },
  })

  if (data?.data.attributes.url) {
    redirect(data.data.attributes.url)
  }

  return new Response('No checkout URL', { status: 500 })
}
