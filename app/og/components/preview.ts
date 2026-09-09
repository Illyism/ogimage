export type Preview = 'twitter' | 'simple' | 'linkedin' | 'source'

const PREVIEWS: Preview[] = ['twitter', 'simple', 'linkedin', 'source']

export function parsePreview(value?: string): Preview | undefined {
  if (value && PREVIEWS.includes(value as Preview)) {
    return value as Preview
  }
}
