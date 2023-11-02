'use client'

import { CheckCircleFill, XCircleFill } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Tooltip from '@/components/ui/tooltip'
import { nFormatter } from '@/lib/utils'
import { DollarSign, Gift, GiftIcon, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Confetti from 'react-dom-confetti'

const PLANS = [
  {
    name: 'Pro',
    slug: 'pro',
    quota: 100000,
    price: 49,
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    quota: 100000000000,
    price: 499,
  },
]

const pricingItems = [
  {
    plan: 'Pro',
    tagline: 'For small businesses looking for OG images',
    quota: PLANS.find((p) => p.slug === 'pro')!.quota,
    features: [
      { text: 'Access to full template library' },
      { text: 'Custom templates' },
      { text: 'Fair use revisions' },
      { text: 'CDN & image hosting included' },
      {
        text: 'CMS integration - DIY',
      },
      { text: 'Self-hosting / On-premise', negative: true },
      { text: 'International image localization', negative: true },
      { text: 'Bulk migration of assets', negative: true },
      { text: 'Priority support', negative: true },
      { text: '$99 setup fee', neutral: true },
    ],
    cta: 'Get started',
  },
  {
    plan: 'Enterprise',
    tagline: 'For large brands with complex, global needs',
    quota: PLANS.find((p) => p.slug === 'enterprise')!.quota,
    features: [
      { text: 'Access to full template library' },
      { text: 'Custom templates' },
      { text: 'Unlimited revisions' },
      { text: 'CDN & image hosting included' },
      {
        text: 'CMS integration - Done For You',
        footnote: 'WordPress, Shopify, etc.',
      },
      { text: 'Self-hosting / On-premise' },
      { text: 'International image localization' },
      { text: 'Bulk migration of assets' },
      {
        text: 'Priority support',
        footnote: 'Email & chat support within 24 hours',
      },
      { text: '$999 setup fee', neutral: true },
    ],
    cta: 'Get started',
  },
]

const Pricing = () => {
  return (
    <div className="contain my-8 text-center">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {pricingItems.map(({ plan, tagline, quota, features, cta }) => {
          const price =
            PLANS.find((p) => p.slug === plan.toLowerCase())?.price || 0
          return (
            <div
              key={plan}
              className={`relative rounded-2xl bg-white ${
                plan === 'Pro'
                  ? 'border-2 border-violet-600 shadow-violet-200'
                  : 'border border-gray-200'
              } shadow-lg`}
            >
              {plan === 'Pro' && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-2 text-sm font-medium text-white">
                  Popular
                </div>
              )}

              <div className="p-5">
                <h3 className="my-3 text-center font-display text-3xl font-bold">
                  {plan}
                </h3>
                <p className="text-gray-500">{tagline}</p>
                <p className="my-5 font-display text-6xl font-semibold">
                  ${price}
                </p>
                <p className="text-gray-500">per month</p>
              </div>
              <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-1">
                  <p className="text-gray-600">
                    {plan === 'Enterprise'
                      ? 'Unlimited images'
                      : `Up to ${nFormatter(quota)} images/mo`}
                  </p>
                  {plan !== 'Enterprise' && (
                    <Tooltip content="If you exceed your monthly usage, we will warn you ahead of time and give you the option to upgrade to the next plan.">
                      <HelpCircle className="h-4 w-4 text-gray-600" />
                    </Tooltip>
                  )}
                </div>
              </div>
              <ul className="my-10 space-y-5 px-8">
                {features.map(({ text, footnote, neutral, negative }) => (
                  <li key={text} className="flex space-x-5">
                    <div className="flex-shrink-0">
                      {neutral ? (
                        <DollarSign className="h-6 w-6 text-transparent" />
                      ) : negative ? (
                        <XCircleFill className="h-6 w-6 text-gray-300" />
                      ) : (
                        <CheckCircleFill className="h-6 w-6 text-green-500" />
                      )}
                    </div>
                    {footnote ? (
                      <div className="flex items-center space-x-1">
                        <p
                          className={
                            negative ? 'text-gray-400' : 'text-gray-600'
                          }
                        >
                          {text}
                        </p>
                        <Tooltip content={footnote}>
                          <HelpCircle className="h-4 w-4 text-gray-600" />
                        </Tooltip>
                      </div>
                    ) : (
                      <p
                        className={negative ? 'text-gray-400' : 'text-gray-600'}
                      >
                        {text}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200" />
              <div className="p-5">
                <Link
                  href={`/buy`}
                  className={`${
                    plan === 'Pro'
                      ? 'border border-transparent bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:border-violet-700 hover:bg-white hover:bg-clip-text hover:text-transparent'
                      : 'border border-gray-200 bg-black text-white hover:border-black hover:bg-white hover:text-black'
                  } block w-full rounded-full py-2 font-medium transition-all`}
                >
                  {cta}
                </Link>
              </div>
            </div>
          )
        })}
        <Coupon />
      </div>
    </div>
  )
}

const Coupon = () => {
  const [showCoupon, setShowCoupon] = useState(false)

  const promotionalItems = [
    { text: '$0 setup fee' },
    { text: 'Free competitor OG Image analysis' },
    { text: 'Free 30-min SEO strategy session' },
  ]

  return (
    <div className="relative mt-12 gap-5 rounded-2xl border-2 border-orange-700 bg-white shadow-lg shadow-orange-200">
      <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-orange-600 to-red-600 px-3 py-2 text-sm font-medium text-white">
        SALE
      </div>
      <div className="p-5">
        <h3 className="my-3 text-center font-display text-3xl font-bold">
          🍁 November Special 🍂
        </h3>
        <p className="text-gray-500">Our biggest sale of the year is here!</p>
        <p className="my-5 font-display text-6xl font-semibold">40% off</p>
        <p className="text-gray-500">first month</p>
      </div>
      <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-1">
          <p className="text-gray-600">
            Over <b>$500</b> in value
          </p>
        </div>
      </div>

      <ul className="my-10 space-y-5 px-8">
        {promotionalItems.map(({ text }) => (
          <li key={text} className="flex space-x-5">
            <div className="flex-shrink-0">
              <GiftIcon className="text-violet-700" />
            </div>
            <p className="text-gray-600">{text}</p>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200" />
      <div className="p-5">
        <div className="mx-auto inline-block text-center">
          <Confetti
            active={showCoupon}
            config={{ elementCount: 200, spread: 90 }}
          />
        </div>
        {showCoupon ? (
          <Button className="w-full py-3" variant="outline" asChild>
            <Link href="https://clients.magicspace.ae/order/ogimage?coupon=BLACKFRIDAY">
              <Gift className="mr-2 inline-block h-5 w-5" />
              BLACKFRIDAY
            </Link>
          </Button>
        ) : (
          <Button
            onClick={() => setShowCoupon(!showCoupon)}
            className="w-full py-3"
          >
            <Gift className="mr-2 inline-block h-5 w-5" />
            Unlock Coupon
          </Button>
        )}
      </div>
    </div>
  )
}

export default Pricing
