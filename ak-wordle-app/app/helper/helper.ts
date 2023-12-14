export const GUESS_CATEGORIES = ['Operator', 'Gender', 'Race', 'Allegiance', 'Infected', 'Profession', 'Rarity', 'Cost (E2)']

export function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ICON_DIR = 'https://raw.githubusercontent.com/Three6ty1/ak-wordle-icons/main/avatars/'
export const PROFESSION_ICON_DIR = 'https://raw.githubusercontent.com/Three6ty1/ak-wordle-icons/main/classes/black/'
export type GuessType = [string, string, string, string, number];

export enum GuessTypeValue {
    name = 0,
    charId = 1,
    class = 2,
    archetype = 3,
    rarity = 4,
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
    correct: '#6BBF59',
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

export function getProfessionIconUrl(profession: string) {
    return PROFESSION_ICON_DIR + 'icon_profession_' + profession.toLowerCase() + '_large.png';
}