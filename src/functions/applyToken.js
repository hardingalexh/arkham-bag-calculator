import characters from '../lookups/characters'
export default function applyToken(test, token, bag, cards, characterIdx, results) {
  return applyTokenNormally(test, token, bag, cards, characterIdx, results)
}

function applyTokenNormally(test, token, bag, cards, characterIdx, results) {
  let character = characterIdx ? characters[characterIdx] : {}
  /******************************************
   * set up card-specific conditions        *
   *******************************************/
  // father mateo
  let fatherMateo =
    character.name === "Father Mateo" &&
    (token.label == "Autofail" || token.label == "Elder Sign")

  // jim culver
  let jimCulver = character.name === "Jim Culver" && token.label == "Skull"

  /******************************************
   * check automatic conditions              *
   *******************************************/
  // check autofail
  if (token.autofail && !fatherMateo) {
    results.push(0)
    return results
  }

  // check autosucceed
  if (token.autosucceed || fatherMateo) {
    results.push(1)
    return results
  }

  // check counterspell
  if (token.symbol && cards["Counterspell"]) {
    results.push(1)
    return results
  }

  /******************************************
   * apply modifiers                         *
   *******************************************/
  test = Number(test)

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

  /******************************************
   * loop if draw again                      *
   *******************************************/
  if (token.draw_again) {
    let bagClone = [...bag]
    bagClone.splice(bagClone.indexOf(token), 1)
    let nestedResults = []
    bagClone.forEach(token => {
      let nestedResult = applyToken(test, token, bagClone, cards, characterIdx, nestedResults)
      nestedResults.concat(nestedResult)
    })
    let sum = nestedResults.reduce((a, b) => a + b, 0)
    results.push(sum / nestedResults.length)
    return results
  }

  /******************************************
   * test for success                        *
   *******************************************/
  if (Number(test) >= 0) {
    results.push(1)
  } else {
    results.push(0)
  }
  return results
}
