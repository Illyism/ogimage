import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const inspiration = await prisma.inspiration.findUnique({
      where: { slug },
    })

    if (!inspiration) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(inspiration)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch' },
      { status: 500 },
    )
  }
}
