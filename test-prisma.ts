import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    try {
        const products = await prisma.product.findMany()
        console.log('Successfully connected and fetched products:', products.length)
    } catch (e) {
        console.error('Error:', e)
    } finally {
        await prisma.$disconnect()
        await pool.end()
    }
}

main()
