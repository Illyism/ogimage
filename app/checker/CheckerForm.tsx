'use client'

import {
  CircleCheckIcon,
  CircleXIcon,
  SearchIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import {
  type CheckIssue,
  type CheckReport,
  type CheckState,
  checkPage,
} from './_actions'

const initialState: CheckState = { status: 'idle' }

export function CheckerForm() {
  const [state, formAction, pending] = useActionState(checkPage, initialState)

  useEffect(() => {
    if (state.status === 'success') {
      window.plausible?.('Check')
    }
  }, [state])

  return (
    <div className="flex flex-col gap-10">
      <form action={formAction} className="flex max-w-2xl flex-col gap-3">
        <Field data-invalid={state.status === 'error' || undefined}>
          <FieldLabel htmlFor="checker-url">Page URL</FieldLabel>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              aria-invalid={state.status === 'error'}
              autoComplete="url"
              defaultValue={state.report?.url}
              id="checker-url"
              inputMode="url"
              name="url"
              placeholder="https://example.com/blog/post"
              required
            />
            <Button disabled={pending} type="submit">
              {pending ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <SearchIcon data-icon="inline-start" />
              )}
              {pending ? 'Checking…' : 'Check OG image'}
            </Button>
          </div>
          {state.status === 'error' && state.error ? (
            <FieldError>{state.error}</FieldError>
          ) : null}
        </Field>
      </form>

      {state.report ? <Report report={state.report} /> : null}
    </div>
  )
}

function Report({ report }: { report: CheckReport }) {
  const errors = report.issues.filter((issue) => issue.level === 'error')
  const warnings = report.issues.filter((issue) => issue.level === 'warning')

  return (
    <div className="flex flex-col gap-10">
      <Card>
        <CardHeader>
          <CardTitle>
            {errors.length === 0 && warnings.length === 0
              ? 'No problems found'
              : `${errors.length} errors, ${warnings.length} warnings`}
          </CardTitle>
          <CardDescription className="break-all">{report.url}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            {report.issues.map((issue) => (
              <IssueRow issue={issue} key={issue.text} />
            ))}
          </ul>
          {report.image && errors.length === 0 ? null : (
            <p className="mt-4 text-muted-foreground text-sm">
              Need a new image?{' '}
              <Link className="underline underline-offset-4" href="/generator">
                Make one with the OG image generator
              </Link>
              .
            </p>
          )}
        </CardContent>
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl tracking-tight">Link preview</h2>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <Preview label="X (Twitter)">
            <div className="relative overflow-hidden rounded-2xl border">
              <PreviewImage report={report} />
              <span className="absolute bottom-2 left-2 max-w-[90%] truncate rounded bg-black/70 px-1.5 py-0.5 text-white text-xs">
                {report.title ?? report.host}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground text-xs">
              From {report.host}
            </p>
          </Preview>

          <Preview label="Facebook">
            <div className="overflow-hidden border">
              <PreviewImage report={report} />
              <div className="flex flex-col gap-0.5 bg-muted px-3 py-2">
                <span className="text-muted-foreground text-xs uppercase">
                  {report.host}
                </span>
                <span className="line-clamp-2 font-semibold text-sm">
                  {report.title ?? report.host}
                </span>
                <span className="line-clamp-1 text-muted-foreground text-xs">
                  {report.description}
                </span>
              </div>
            </div>
          </Preview>

          <Preview label="LinkedIn">
            <div className="overflow-hidden rounded-lg border">
              <PreviewImage report={report} />
              <div className="flex flex-col gap-0.5 px-3 py-2">
                <span className="line-clamp-2 font-semibold text-sm">
                  {report.title ?? report.host}
                </span>
                <span className="text-muted-foreground text-xs">
                  {report.host}
                </span>
              </div>
            </div>
          </Preview>

          <Preview label="Slack and Discord">
            <div className="flex flex-col gap-1 border-l-4 pl-3">
              <span className="font-semibold text-xs">
                {report.siteName ?? report.host}
              </span>
              <span className="font-semibold text-blue-500 text-sm">
                {report.title ?? report.host}
              </span>
              <span className="line-clamp-3 text-sm">{report.description}</span>
              <div className="mt-1 max-w-sm overflow-hidden rounded-lg">
                <PreviewImage report={report} />
              </div>
            </div>
          </Preview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl tracking-tight">
          Open Graph tags on this page
        </h2>
        {report.tags.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            This page has no Open Graph or Twitter card tags.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <tbody>
                {report.tags.map((tag) => (
                  <tr className="border-b last:border-b-0" key={tag.key}>
                    <th className="whitespace-nowrap px-3 py-2 align-top font-medium font-mono text-xs">
                      {tag.key}
                    </th>
                    <td className="break-all px-3 py-2 text-muted-foreground">
                      {tag.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

const ISSUE_STYLE = {
  error: { className: 'text-destructive', icon: CircleXIcon },
  pass: { className: 'text-emerald-500', icon: CircleCheckIcon },
  warning: { className: 'text-amber-500', icon: TriangleAlertIcon },
}

function IssueRow({ issue }: { issue: CheckIssue }) {
  const style = ISSUE_STYLE[issue.level]
  return (
    <li className="flex items-start gap-2">
      <style.icon className={cn('mt-0.5 size-4 shrink-0', style.className)} />
      <span>{issue.text}</span>
    </li>
  )
}

function Preview({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-muted-foreground text-sm">{label}</h3>
      <div>{children}</div>
    </div>
  )
}

function PreviewImage({ report }: { report: CheckReport }) {
  if (!report.image) {
    return (
      <div className="flex aspect-1200/630 items-center justify-center bg-muted text-muted-foreground text-sm">
        No image
      </div>
    )
  }
  return (
    <img
      alt={`Link preview of ${report.host}`}
      className="aspect-1200/630 w-full bg-muted object-cover"
      height={630}
      // The image comes from the checked site. Do not send it our URL.
      referrerPolicy="no-referrer"
      src={report.image}
      width={1200}
    />
  )
}
