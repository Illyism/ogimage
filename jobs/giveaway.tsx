import { client } from '@/jobs/trigger'
import { Resend } from '@trigger.dev/resend'
import { eventTrigger } from '@trigger.dev/sdk'
import { z } from 'zod'

const resend = new Resend({
  // This ID should match your Resend integration ID on the 'Your connected integrations' dashboard.
  id: 'resend',
  apiKey: process.env.RESEND_API_KEY!,
})

// This job sends a basic email built using React and Typescript
client.defineJob({
  id: 'resend-giveaway',
  name: 'Resend: send email on form submit',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'send.giveaway.email',
    schema: z.object({
      to: z.string(),
    }),
  }),
  integrations: {
    resend,
  },
  run: async (payload, io) => {
    await io.resend.emails.send('send-giveaway-email', {
      to: payload.to,
      from: 'Ilias from ogimage.org <contact@ogimage.org>',
      reply_to: 'ilias@magicspace.agency',
      subject: `You're in for a treat! 🎉`,
      html: `
<p>Hi there!</p>

<p>Before we proceed, I’d like you to have a <b>little welcome gift</b> to thank you for joining our community 🎁</p>

<p><a href="https://magic-space.notion.site/Open-Graph-Image-Kit-Free-Pack-b03215fd1fa04ec4973635e6c503eb36?pvs=4">https://magic-space.notion.site/Open-Graph-Image-Kit-Free-Pack-b03215fd1fa04ec4973635e6c503eb36?pvs=4</a></p>

<p>It’s a <b>free pack of Open Graph Image templates</b> so you can familiarize yourself with the product and start creating your own images right away.</p>

<p>It just holds a few of the very best templates we have, but it’s a great way to get started and see what’s possible with Open Graph Images.</p>

<p>Our mission is to make sure that every website has a beautiful and engaging image for every page, and we’re excited to have you on board!</p>

<p>We are open to collaborate: DM me <a href="https://twitter.com/illyism">@illyism</a> or reply to this email.

<p>We also have a great <a href="https://store.magicspace.agency/affiliates">affiliate program</a> that pays <b>40% commission</b> for every customer you refer to us.</p>

<p>Warm regards,<br />
<a href="https://il.ly">Ilias Ism</a>
<br />
<a href="https://ogimage.org">ogimage.org</a></p>
`.trim(),
      text: `
Hi there!

Before we proceed, I’d like you to have a little welcome gift to thank you for joining our community 🎁

https://magic-space.notion.site/Open-Graph-Image-Kit-Free-Pack-b03215fd1fa04ec4973635e6c503eb36?pvs=4

It’s a free pack of Open Graph Image templates so you can familiarize yourself with the product and start creating your own images right away.

It just holds a few of the very best templates we have, but it’s a great way to get started and see what’s possible with Open Graph Images.

Our mission is to make sure that every website has a beautiful and engaging image for every page, and we’re excited to have you on board!

We are open to collaborate: DM me @illyism or reply to this email.

We also have a great affiliate program that pays 40% commission for every customer you refer to us: https://store.magicspace.agency/affiliates

Warm regards,
Ilias Ism
ogimage.org
`.trim(),
    })

    await io.wait('wait 7 days', 7 * 24 * 60 * 60)

    await io.resend.emails.send('send-affiliate-followuemail', {
      to: payload.to,
      from: 'Ilias from ogimage.org <contact@ogimage.org>',
      reply_to: 'ilias@magicspace.agency',
      subject: `RE: You're in for a treat! 🎉`,
      html: `
<p>Hi!</p>

<p>Wondering if you had a chance to try out the free pack of Open Graph Image templates I sent you last week?</p>

<p>Let me know if you have any questions or need help getting started.</p>

<p>If you loved it, please <a href="https://love.blogkit.org/r/share">leave a review</a> to help us spread the word.</p>

<p>Thank you for being part of our community!</p>

<a href="https://il.ly">Ilias Ism</a>
<br />
<a href="https://ogimage.org">ogimage.org</a></p>
`.trim(),
      text: `
Hi!

Wondering if you had a chance to try out the free pack of Open Graph Image templates I sent you last week?

Let me know if you have any questions or need help getting started.

If you loved it, please leave a review to help us spread the word: https://https://love.blogkit.org/r/share

Thank you for being part of our community!

Ilias Ism
ogimage.org
`.trim(),
    })
  },
})
