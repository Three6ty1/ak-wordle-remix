export const GUESS_CATEGORIES = ['Operator', 'Gender', 'Race', 'Allegiance', 'Infected', 'Profession', 'Rarity', 'Cost (E2)']

export function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ICON_DIR = 'https://raw.githubusercontent.com/Three6ty1/ak-wordle-icons/main/avatars/'

export enum OPERATOR_RESULTS {
    name = 0,
    charId = 1,
    rarity = 2,
}

export enum Range {
    Lower = "Lower",
    Correct = "Correct",
    Higher = "Higher",
}

export enum Correctness {
    Wrong = "Wrong",
    Half = "Half",
    Correct = "Correct",
}

export const wordleColors = {
    incorrect: '#919090',
    higher: '#08aadd',
    lower: '#c80000',
    half: '#d3470b',
    correct: '#424142',
    bg_main: '#edeeee',
}

export function getOperatorIconUrl(charId: string, rarity: number) {
    let url;
    if (rarity > 3) {
        url = ICON_DIR + charId + '_2.png'
    } else {
        url = ICON_DIR + charId + '.png'
    }

    return url;
}