import Token from "../classes/token";
export default [
    new Token("+1", 1),
    new Token("0", 0),
    new Token("-1", -1),
    new Token("-2", -2),
    new Token("-3", -3),
    new Token("-4", -4),
    new Token("-5", -5),
    new Token("-6", -6),
    new Token("-7", -7),
    new Token("-8", -8),
    new Token("Skull", null, { variable: true, symbol: true }),
    new Token("Cultist", null, { variable: true, symbol: true }),
    new Token("Tablet", null, { variable: true, symbol: true }),
    new Token("Tentacle", null, { variable: true, symbol: true }),
    new Token("Autofail", null, { autofail: true }),
    new Token("Elder Sign", null, { variable: true })
]