import { PrismaClient } from '@prisma/client'
import { links } from '../data/links'

const prisma = new PrismaClient()

async function main() {
    await prisma.link.createMany({
        data: links
    })
}

main()
    .catch(async (error) => {
        console.log(error)
        process.exit(1)
    })
    .finally(async () => await prisma.$disconnect())