export default class Card {
  constructor(label, disabled = false) {
    this.label = label
    this.active = false
    this.disabled = disabled
  }
}
