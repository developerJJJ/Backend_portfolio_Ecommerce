import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, basePrice, category, images, variants } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        basePrice,
        category,
        images: images || [],
        variants: {
          create: variants?.map((v: any) => ({
            name: v.name,
            value: v.value,
            priceAdjustment: v.priceAdjustment,
          })) || [],
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
        include: {
            variants: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    )
  }
}
