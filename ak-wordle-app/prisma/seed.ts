import { PrismaClient } from '@prisma/client'
import db from '../../operator_db/operator_db.json'

// To run
// "npx prisma db seed"

interface Dictionary<T> {
    [Key: string]: T;
}

interface Operator {
    charId: string;
    gender: string;
    race: string;
    allegiance: string;
    profession: string;
    rarity: number;
    cost: number;
    infected: string;
}

const prisma = new PrismaClient()
async function main() {
    let amt = 0
    const operator_db:Dictionary<Operator> = db;
    for (const key in operator_db) {
        const operator = operator_db[key]
        await prisma.operator.upsert({
            where: {
                charId: operator.charId,
            },
            create: { charId: operator.charId,
                name: key,
                gender: operator.gender,
                race: operator.race,
                allegiance: operator.allegiance,
                profession: operator.profession,
                rarity: operator.rarity,
                cost: operator.cost,
                infected: operator.infected,
            },
            update: {},
        });
        amt += 1
    }
    console.log(amt + ' operators seeded into db');
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})