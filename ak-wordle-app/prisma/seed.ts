import { PrismaClient } from '@prisma/client'
import db from '../../operator_db/operator_db.json'

// To run
// "npx prisma db seed"
// dumb shit prisma seeding
// https://github.com/prisma/prisma/issues/7053#issuecomment-1679880184
interface Dictionary<T> {
    [Key: string]: T;
}

interface Operator {
    charId: string;
    gender: string;
    race: string;
    group?: string;
    nation: string;
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
                nation: operator.nation,
                profession: operator.profession,
                rarity: operator.rarity,
                cost: operator.cost,
                infected: operator.infected,
            },
            update: {},
        });

        if (operator.group !== '') {
            await prisma.operator.update({
                where: {
                    charId: operator.charId
                },
                data: {
                    group: operator.group
                }
            })
        }

        amt += 1
    }
    
    // Remove the 's from the Justice knight just for indexing
    try {
        await prisma.operator.update({
            where: {
                name: "'Justice Knight'",
            },
            data: {
                name: 'Justice Knight'
            }
        });
    }
    catch {
        console.log('Justice Knight name change??/')
    }

    console.log(amt + ' operators seeded into db');
    console.log(`Removed all chosen ops (${await prisma.chosenOperators.count()})`);
    
    await prisma.chosenOperators.deleteMany()

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