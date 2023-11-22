import { prisma } from '~/prisma.server';
import { randomInteger } from '~/helper/helper';
import { Operator } from '@prisma/client';

enum Range {
    Lower = "Lower",
    Correct = "Correct",
    Higher = "Higher",
}

interface GuessResult {
    gender: boolean,
    race: boolean,
    allegiance: boolean,
    profession: boolean,
    rarity: Range,
    cost: Range,
    infected: boolean,
}

// Chooses a new operator for today
// Restrains the new operator to not have been picked in the last TOTAL_OPERATORS/2 days
const chooseNewOperator = async() => {
    const prev = await prisma.chosenOperators.findFirst({
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
            if (!prev || chosen.chosen.length <= Math.floor(prev.gameId / Math.floor(operators.length / 2))) {
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

const getTodayOperator = async() => {
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

export const getOperatorStats = async() => {
    return await getTodayOperator();
}

const compareGuessLogic = (answer: Operator, guess: Operator):GuessResult => {
    return {
        gender: answer.gender == guess.gender,
        race: answer.race == guess.race,
        allegiance: answer.allegiance == guess.allegiance,
        profession: answer.profession == guess.profession,
        rarity: ((answer.rarity < guess.rarity) ? Range.Lower : (answer.rarity > guess.rarity) ? Range.Higher : Range.Correct),
        cost: ((answer.cost < guess.cost) ? Range.Lower : (answer.cost > guess.cost) ? Range.Higher : Range.Correct),
        infected: answer.infected == guess.infected,
    }
}

export const compareGuess = async(guess: string) => {
    const compareOp = await prisma.operator.findFirstOrThrow({ where: { charId: (await getTodayOperator()).operatorId } })
    const guessOp = await prisma.operator.findFirst({
        where: { name: guess}
    })

    if (!guessOp) {
        return { error: `Not a valid operator name: ${guess}`}
    }

    return { operator: guessOp, result: compareGuessLogic(compareOp, guessOp)};
}
