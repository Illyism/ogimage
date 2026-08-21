import { createHmac, timingSafeEqual } from 'node:crypto'
import { Octokit } from 'octokit'
import { PostHog } from 'posthog-node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

function verifySignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const hmac = createHmac('sha256', secret)
  const digest = hmac.update(body).digest('hex')
  return timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-signature')
    if (!signature) {
      return Response.json({ error: 'Missing signature' }, { status: 401 })
    }

    const body = await request.text()
    const isValid = verifySignature(
      body,
      signature,
      process.env.LMSQUEEZY_SECRET!,
    )

    if (!isValid) {
      return Response.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data = JSON.parse(body)

    const {
      order_number,
      user_email: email,
      user_name: name,
    } = data.data.attributes
    const { variant_name } = data.data.attributes.first_order_item
    const distinct_id = data.meta?.custom_data?.distinct_id

    // Send to PostHog
    if (distinct_id) {
      const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      })
      posthogClient.capture({
        distinctId: distinct_id,
        event: 'Order Completed',
        properties: {
          $set: {
            email,
            name,
          },
          order_number,
          price: data.data.attributes.total_usd,
          variant_name,
        },
      })
      posthogClient.shutdown()
    }

    // Invite to GitHub
    if (process.env.GITHUB_TOKEN) {
      try {
        const octokit = new Octokit({
          auth: process.env.GITHUB_TOKEN,
        })
        await octokit.request('POST /orgs/{org}/invitations', {
          email,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
          org: 'blogkit-org',
          role: 'direct_member',
          team_ids: [9_606_305],
        })
      } catch (error: any) {
        console.error('Failed to invite user to GitHub', error)
      }
    }

    // Send order email
    await resend.emails.send({
      from: 'Ilias from ogimage.org <contact@ogimage.org>',
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
      replyTo: 'ilias@magicspace.agency',
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
      to: email,
    })

    // Note: Follow-up email after 7 days would need to be handled separately
    // (e.g., using a cron job or scheduled task)

    return Response.json({ success: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return Response.json(
      { error: error.message || 'Failed to process webhook' },
      { status: 500 },
    )
  }
}
