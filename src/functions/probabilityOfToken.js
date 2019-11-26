import characters from '../lookups/characters'
export default function probabilityOfToken(token, bag, characterIdx) {
    let probabilities = []
    probabilities.push(resolveToken(token, bag, characterIdx))
    let sum = probabilities.reduce((a, b) => a + b, 0);
    return (sum / probabilities.length) * 100
}

function resolveToken(token, bag, characterIdx) {
    let character = characterIdx ? characters[characterIdx] : {}
    let jimCulver = (character.name === "Jim Culver" && token.label === "Skull")

    let results = []
    bag.forEach(bagToken => {
        if (bagToken.label === token.label || (bagToken.label === "Elder Sign" && jimCulver)) {
            results.push(1)
        } else if (bagToken.draw_again) {
            let probabilities = []
            let bagClone = [...bag]
            bagClone.splice(bagClone.indexOf(bagToken), 1)
            probabilities.push(resolveToken(token, bagClone, characterIdx))
            let sum = probabilities.reduce((a, b) => a + b, 0);
            results.push(sum / probabilities.length)
        } else {
            results.push(0)
        }
    })
    let sum = results.reduce((a, b) => a + b, 0)
    return sum / results.length
}