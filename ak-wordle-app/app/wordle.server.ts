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
    correct: boolean,
}

// Chooses a new operator for today
// Restrains the new operator to not have been picked in the last TOTAL_OPERATORS/2 days
const chooseNewOperator = async() => {
    const prev = await prisma.chosenOperators.findFirst({
        where: { date: new Date().toDateString()}
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

const handleNewDay = async(date: string) => {
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
    const date = new Date().toDateString();

    // Is there a game created for today?
    let res = await prisma.chosenOperators.findFirst({
        where: { date: date },
    })

    if (!res) {
        res = await handleNewDay(date);
    }

    return res
}

// Get the stats of the currently chosen operator
export const getOperatorStats = async() => {
    return await getTodayOperator();
}

const compareGuessLogic = (answer: Operator, guess: Operator):GuessResult => {
    let result = {
        gender: answer.gender === guess.gender,
        race: answer.race === guess.race,
        allegiance: answer.allegiance === guess.allegiance,
        profession: answer.profession === guess.profession,
        rarity: ((answer.rarity < guess.rarity) ? Range.Lower : (answer.rarity > guess.rarity) ? Range.Higher : Range.Correct),
        cost: ((answer.cost < guess.cost) ? Range.Lower : (answer.cost > guess.cost) ? Range.Higher : Range.Correct),
        infected: answer.infected === guess.infected,
    }

    return {
        ...result,
        correct: result.gender && result.race && result.allegiance && result.profession && result.rarity == Range.Correct && result.cost == Range.Correct && result.infected,
    }
}

// Compare the guess with the operator of the day
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

// Get a list of all the operator names in the database
export const getAllOperators = async() => {
    const ops = await prisma.operator.findMany()
    const names = ops.map(op => op.name)
    return names;
}