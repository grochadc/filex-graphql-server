import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const queryResult = await prisma.
                            student
                                .findMany({
                                    take: 1
                                });
    console.log(queryResult);
}

main().
    then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1);
    })