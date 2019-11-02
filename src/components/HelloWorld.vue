<template>
  <div>
    <div v-for="(datum, key) in tokens" :key="key" class="field">
      <label class="label" :for="key">{{datum.label}}</label>
      <input class="input" type="number" :id="key" :name="key" v-model="datum.quantity" />
    </div>
    {{bag}}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      tokens: {
        "+1": {
          label: "+1",
          effect: 1,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "0": {
          label: "0",
          effect: 0,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-1": {
          label: "-1",
          effect: -1,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-2": {
          label: "-2",
          effect: -2,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-3": {
          label: "-3",
          effect: -3,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-4": {
          label: "-4",
          effect: -4,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-5": {
          label: "-5",
          effect: -5,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-6": {
          label: "-6",
          effect: -6,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-7": {
          label: "-7",
          effect: -7,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        "-8": {
          label: "-8",
          effect: -8,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: false
        },
        skull: {
          label: "Skull",
          effect: 0,
          draw_again: false,
          quantity: 0,
          variable: true,
          autofail: false,
          autosucceed: false
        },
        cultist: {
          label: "Cultist",
          effect: 0,
          draw_again: false,
          quantity: 0,
          variable: true,
          autofail: false,
          autosucceed: false
        },
        tablet: {
          label: "Tablet",
          effect: 0,
          draw_again: false,
          quantity: 0,
          variable: true,
          autofail: false,
          autosucceed: false
        },
        tentacle: {
          label: "Tentacle",
          effect: 0,
          draw_again: false,
          quantity: 0,
          variable: true,
          autofail: false,
          autosucceed: false
        },
        autofail: {
          label: "Auto-Fail",
          effect: 0,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: true,
          autosucceed: false
        },
        eldersign: {
          label: "Elder Sign",
          effect: 0,
          draw_again: false,
          quantity: 0,
          variable: false,
          autofail: false,
          autosucceed: true
        }
      },
      tests: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  computed: {
    probability() {
      let ret = {};
      this.tests.forEach(test => {
        let denominator = this.bag.length;
        let successes = 0;
        this.bag.forEach(token => {
          let final = this.applyTokenEffect(test, token);
          if (final >= 0) {
            successes++;
          }
        });
        let outcome = successes / denominator;
        let label = String(test);
        ret.push({ test: label, probability: outcome });
      });
      return ret;
    },
    bag() {
      let bag = [];
      Object.values(this.tokens).forEach(token => {
        let i = 0;
        while (i < token.quantity) {
          bag.push(token);
          i++;
        }
      });
      return bag;
    }
  },
  methods: {
    applyToken() {
      return true;
    }
  }
};
</script>