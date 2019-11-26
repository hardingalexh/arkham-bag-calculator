export default class Token {
  constructor(label, effect, properties = {}) {
    this.label = label
    this.effect = effect
    this.draw_again = false
    this.quantity = 0
    this.variable = properties.variable || false
    this.autofail = properties.autofail || false
    this.autosucceed = properties.autosucceed || false
    this.symbol = properties.symbol || false
    this.appliedModifiers = []
  }
}
