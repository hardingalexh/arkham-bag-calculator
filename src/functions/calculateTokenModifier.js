import characters from '../lookups/characters'
export default function calculateTokenModifier(token, bag, cards, characterIdx) {
  return calculateModifier(token, bag, cards, characterIdx)
}

function calculateModifier(token, bag, cards, characterIdx) {
  let character = characterIdx ? characters[characterIdx] : {}
  /******************************************
   * set up card-specific conditions        *
   *******************************************/
  // jim culver
  let jimCulver = character.name === "Jim Culver" && token.label == "Skull"

  /******************************************
   * apply modifiers                         *
   *******************************************/
  let test = 0

  if (token.symbol && cards["Counterspell"]) {
    return test
  }

  // recall the future(s)
  if (
    token.label === cards["Recall the Future"] &&
    !token.appliedModifiers.includes("Recall the Future")
  ) {
    test += 2
    token.appliedModifiers.push("Recall the Future")
  }
  if (
    token.label === cards["Recall the Future (second copy)"] &&
    !token.appliedModifiers.includes("Recall the Future (second copy)")
  ) {
    test += 2
    token.appliedModifiers.push("Recall the Future (second copy)")
  }

  // apply card effects
  if (cards["Ritual Candles"] && token.symbol) {
    test += 1
  }
  if (cards["Ritual Candles (second copy)"] && token.symbol) {
    test += 1
  }

  /******************************************
   * apply token effect                      *
   *******************************************/
  // if the token isn't being nulled by jim or defiance
  if (!(token.label === cards["Defiance"]) && !jimCulver) {
    test += Number(token.effect)
  }

  return Number(test)
}
