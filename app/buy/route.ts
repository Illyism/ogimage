import {
  createCheckout,
  lemonSqueezySetup,
  type NewCheckout,
} from '@lemonsqueezy/lemonsqueezy.js'
import { redirect } from 'next/navigation'
import { getPosthogClient, getPosthogId } from '@/core/analytics/bootstrapData'

export async function GET(request: Request) {
  lemonSqueezySetup({ apiKey: process.env.LMSQUEEZY! })

  const client = getPosthogClient()
  const distinct_id = await getPosthogId()

  const storeId = 70_232 // magicspace

  // Get plan from URL search params
  const { searchParams } = new URL(request.url)
  const plan = searchParams.get('plan') || 'essential'

  // Set variant ID based on plan
  // NOTE: If you get "Not Found" errors, verify these variant IDs exist in your Lemon Squeezy store
  // You can find variant IDs in your Lemon Squeezy dashboard: Store > Products > [Product] > Variants
  let variantId: number
  if (plan === 'pro') {
    variantId = process.env.LMSQUEEZY_ENV === 'production' ? 988_010 : 266_572 // Use dev variant for pro in dev
  } else {
    // Essential plan - variant ID 265794 may not exist, check your Lemon Squeezy dashboard
    variantId = process.env.LMSQUEEZY_ENV === 'production' ? 265_794 : 266_572 // Essential plan
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const planName = plan === 'pro' ? 'Pro' : 'Essential'
  const newCheckout: NewCheckout = {
    checkoutData: {
      custom: {
        distinct_id,
        plan,
      },
    },
    expiresAt: tomorrow.toISOString(),
    productOptions: {
      description:
        'Create OG Images for SEO - Works for any blog, website, Next.js and more - All source code',
      name: `OG Image Generator - ${planName} Plan`,
    },
  }

  const { error, data } = await createCheckout(storeId, variantId, newCheckout)

  if (error) {
    console.error('Error creating checkout', {
      env: process.env.LMSQUEEZY_ENV,
      error,
      hasApiKey: !!process.env.LMSQUEEZY,
      plan,
      storeId,
      variantId,
    })
    return new Response(
      `Error creating checkout: ${error.message || 'Unknown error'}`,
      { status: 500 },
    )
  }

  client.capture({
    distinctId: distinct_id,
    event: 'Checkout Started',
    properties: {
      checkout_id: data?.data.id,
      checkout_url: data?.data.attributes.url,
      plan,
    },
  })

  if (data?.data.attributes.url) {
    redirect(data.data.attributes.url)
  }

  return new Response('No checkout URL', { status: 500 })
}
