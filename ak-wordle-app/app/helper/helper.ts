export const GUESS_CATEGORIES = ['Gender', 'Race', 'Allegiance', 'Infected', 'Profession', 'Rarity', 'Cost']

export function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}