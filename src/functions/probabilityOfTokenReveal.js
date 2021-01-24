import characters from '../lookups/characters'
export default function probabilityOfTokenReveal(token, bag, characterIdx) {
    let bagSize = bag.length;
    let tokenAmountInBag = tokenAmount(token, bag, characterIdx);
    let first = (bagSize - tokenAmountInBag) / bagSize;
    let second = (bagSize - tokenAmountInBag - 1) / (bagSize - 1);
    let third = (bagSize - tokenAmountInBag - 2) / (bagSize - 2);
    let probability = 1 - (first * second * third);
    return probability * 100
}

function tokenAmount(token, bag, characterIdx) {
    let character = characterIdx ? characters[characterIdx] : {}
    let jimCulver = (character.name === "Jim Culver" && token.label === "Skull")

    let results = []
    bag.forEach(bagToken => {
        if (bagToken.label === token.label || (bagToken.label === "Elder Sign" && jimCulver)) {
            results.push(1)
        } else {
            results.push(0)
        }
    })

    return results.reduce((a, b) => a + b, 0)
}