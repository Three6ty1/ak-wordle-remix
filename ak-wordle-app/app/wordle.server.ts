import { prisma } from '~/prisma.server';
import { randomInteger } from '~/helper/helper';

// Chooses a new operator for today
// Restrains the new operator to not have been picked in the last TOTAL_OPERATORS/2 days
const chooseNewOperator = async() => {
    const prev = await prisma.chosenOperators.findFirstOrThrow({
        where: { date: Number(new Date(new Date().getDate() - 1).toLocaleDateString().replaceAll('/', ''))}
    });

    const operators = await prisma.operator.findMany();

    while(true) {
        // Get a random operator
        let toChoose = operators[randomInteger(0, operators.length)];

        let chosen = await prisma.operator.findFirst({
            where: {
                charId: toChoose.charId
            },
            include: {
                chosen: true,
            },
        });

        // An operator might not have been chosen before.
        if (chosen) {  
            // If amount of times chosen is more than the total games played / half the amount of operators, choose a new operator.
            if (chosen.chosen.length <= Math.floor(prev.gameId / Math.floor(operators.length / 2))) {
                return chosen
            }
        }
    } 
}

const handleNewDay = async(date: number) => {
    const chosen = await chooseNewOperator();
    
    const res = await prisma.chosenOperators.create({
        data: {
            date: date,
            operatorId: chosen.charId,
            timesGuessed: 0,
        }
    });
    console.log(`New Operator chosen ${chosen.name}`)

    return res;
}

export const getOperatorStats = async() => {
    const now = new Date();
    const date = Number(now.toLocaleDateString().replaceAll('/', ''));

    // Is there a game created for today?
    let res = await prisma.chosenOperators.findFirst({
        where: { date: date },
    })

    if (!res) {
        res = await handleNewDay(date);
    }
    
    return res
}