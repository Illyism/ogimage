import { Github } from '@trigger.dev/github'
import { Resend } from '@trigger.dev/resend'
import { verifyRequestSignature } from '@trigger.dev/sdk'
import { PostHog } from 'posthog-node'
import { client } from './trigger'

const github = new Github({
  id: 'github',
  token: process.env.GITHUB_TOKEN!,
})

//create an HTTP endpoint
const lmhook = client.defineHttpEndpoint({
  id: 'lemonsqueezy.com',
  source: 'lemonsqueezy.com',
  icon: '🍋',
  verify: async (request) => {
    //this helper function makes verifying most webhooks easy
    return await verifyRequestSignature({
      request,
      headerName: 'x-signature',
      secret: process.env.LMSQUEEZY_SECRET!,
      algorithm: 'sha256',
    })
  },
})

const resend = new Resend({
  // This ID should match your Resend integration ID on the 'Your connected integrations' dashboard.
  id: 'resend',
  apiKey: process.env.RESEND_API_KEY!,
})

client.defineJob({
  id: 'http-lemonsqueezy',
  name: 'LemonSqueezy Webhook',
  version: '1.0.0',
  enabled: true,
  //create a Trigger from the HTTP endpoint above. The filter is optional.
  trigger: lmhook.onRequest(),
  integrations: { github, resend },
  run: async (request, io) => {
    //note that when using HTTP endpoints, the first parameter is the request
    //you need to get the body, usually it will be json so you do:
    const body = await request.json()
    await io.logger.info('Body', body)

    const name = body.data.attributes.user_name
    const email = body.data.attributes.user_email
    const order_number = body.data.attributes.order_number
    const variant_name = body.data.attributes.first_order_item.variant_name
    const distinct_id = body.meta?.custom_data?.distinct_id

    if (distinct_id) {
      const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      })
      posthogClient.capture({
        distinctId: distinct_id,
        event: 'Order Completed',
        properties: {
          order_number: order_number,
          variant_name: variant_name,
          price: body.data.attributes.total_usd,
          $set: {
            email: email,
            name: name,
          },
        },
      })
      await posthogClient.shutdownAsync()
      io.logger.info('Sent event to PostHog', {
        distinct_id: distinct_id,
        event: 'Order Completed',
      })
    }

    // invite the user to the repo
    await io.github.runTask(
      'inviteGitHubUser',
      async (octokit) => {
        try {
          await octokit.request('POST /orgs/{org}/invitations', {
            org: 'blogkit-org',
            email: email,
            role: 'direct_member',
            team_ids: [9606305],
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
          })
        } catch (error: any) {
          await io.logger.error('Failed to invite user to GitHub', error)
        }
      },
      {
        retry: {
          limit: 2,
        },
      },
    )

    await io.resend.emails.send('send-giveaway-email', {
      to: email,
      from: 'Ilias from ogimage.org <contact@ogimage.org>',
      reply_to: 'ilias@magicspace.agency',
      subject: `[OG Image Kit - ${order_number}] Access to the GitHub repository and guide`,
      text: `
Hi ${name}!

Thanks for purchasing ${variant_name}! We are excited to have you on board.

Here is the link to the guide to get started with OG Image Kit:
https://magic-space.notion.site/Open-Graph-Image-Kit-84ad575a680242d6ba64592b8a7988aa?pvs=4

We also invited you to the OG Image Kit repository on GitHub. You can access it here:
https://github.com/blogkit-org/ogimage-next

Can you just confirm that you received this email and that you have access to the GitHub repository?

Thanks,
Ilias Ism
  `.trim(),
      html: `
<p>Hi ${name}!</p>

<p>Thanks for purchasing <b>${variant_name}</b>! We are excited to have you on board.</p>

<p>Here is the link to the guide to get started with OG Image Kit:</p>

<p><a href="https://magic-space.notion.site/Open-Graph-Image-Kit-84ad575a680242d6ba64592b8a7988aa?pvs=4">https://magic-space.notion.site/Open-Graph-Image-Kit-84ad575a680242d6ba64592b8a7988aa?pvs=4</a></p>

<p>We also invited you to the OG Image Kit repository on GitHub. You can access it here:</p>

<p><a href="https://github.com/blogkit-org/ogimage-next">https://github.com/blogkit-org/ogimage-next</a></p>

<p>Can you just <b>confirm</b> that you received this email and that you have access to the GitHub repository?</p>

<p>Thanks,<br />
Ilias Ism</p>
    `.trim(),
    })

    await io.wait('wait 7 days', 7 * 24 * 60 * 60)

    await io.resend.emails.send('send-kit-followup', {
      to: email,
      from: 'Ilias from ogimage.org <contact@ogimage.org>',
      reply_to: 'ilias@magicspace.agency',
      subject: `How's it going with OG Image Kit?`,
      html: `
<p>Hi ${name}!</p>

<p>Wondering if you had a chance to try out the of Open Graph Image Kit I sent you last week?</p>

<p>Let me know if you have any questions or need any custom templates?</p>

<p>If you loved it, please <a href="https://senja.io/p/blogkit/r/8gkozI">leave a review</a> to help us spread the word.</p>

<p>Ilias from ogimage.org</p>
`.trim(),
      text: `
Hi ${name}!

Wondering if you had a chance to try out the of Open Graph Image Kit I sent you last week?

Let me know if you have any questions or need any custom templates?

If you loved it, please leave a review to help us spread the word.

Ilias from ogimage.org
`.trim(),
    })
  },
})
