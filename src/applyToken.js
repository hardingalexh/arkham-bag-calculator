export default function applyToken(test, token, bag, cards, results) {
  /******************************************
   * set up card-specific conditions        *
   *******************************************/

  // father mateo
  let fatherMateo = cards["Father Mateo"] && token.label == "Autofail"

  // jim culver
  let jimCulver = cards["Jim Culver"] && token.label == "Skull"

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
    token.recallFuture1 &&
    !token.appliedModifiers.includes("recallFuture1")
  ) {
    test += 2
  }
  if (
    token.recallFuture2 &&
    !token.appliedModifiers.includes("recallFuture2")
  ) {
    test += 2
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
  if (!token.defiance && !jimCulver) {
    test += Number(token.effect)
  }

  /******************************************
   * loop if draw again                      *
   *******************************************/
  if (token.draw_again) {
    let bagClone = [...bag]
    bagClone.splice(bagClone.indexOf(token), 1)
    bagClone.forEach(token => {
      results.concat(applyToken(test, token, bagClone, cards, results))
    })
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
