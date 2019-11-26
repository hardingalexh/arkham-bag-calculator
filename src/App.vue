<template>
  <div id="app is-size-7">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">Arkham Horror LCG: Probability Calculator</a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
    <section id="main-content">
      <div class="columns is-gapless">
        <div class="column">
          <!-- Chaos Bag Card -->
          <div class="card config">
            <header class="card-header">
              <p class="card-header-title">Configure Chaos Bag and Card Effects</p>
            </header>
            <div class="card-content">
              <div class="content">
                <!-- Campaign -->
                <div class="field">
                  <div class="select is-fullwidth">
                    <select v-on:change="setDefault($event.target.value)">
                      <option>Choose Campaign</option>
                      <option
                        v-for="(bag,key) in bags"
                        :key="key"
                        :value="key"
                      >{{bag.campaign}}: {{bag.difficulty}}</option>
                    </select>
                  </div>
                </div>
                <!-- Character -->
                <div class="field">
                  <div class="select is-fullwidth">
                    <select v-model="characterIdx">
                      <option>Choose Character</option>
                      <option
                        v-for="(character,key) in characters"
                        :key="key"
                        :value="key"
                      >{{character.name}}</option>
                    </select>
                  </div>
                </div>
                <table class="table is-narrow is-fullwidth">
                  <thead>
                    <th>Token</th>
                    <th>Quantity</th>
                    <th>Effect</th>
                    <th>Other</th>
                  </thead>
                  <tbody>
                    <tokenRow v-for="token in tokens" :key="token.label" :token="token" />
                  </tbody>
                </table>
                <card
                  v-for="(cardKey, cardValue) in cards"
                  :cardKey="cardKey"
                  :cardValue="cardValue"
                  :cards="cards"
                  :tokens="tokens"
                  :key="cardValue"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <!-- Probability of Success Card -->
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Probability of Success</p>
            </header>
            <div class="card-content">
              <div class="content">
                <highcharts :options="chartOptions" class="vh70"></highcharts>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// higcharts
import { Chart } from "highcharts-vue";
// components
import card from "./components/card";
import tokenRow from "./components/tokenRow";
// lookups
import tokens from "./lookups/tokens";
import characters from "./lookups/characters";
import bags from "./lookups/bags";
import cards from "./lookups/cards";
// functions
import applyToken from "./functions/applyToken";

export default {
  name: "app",
  components: {
    highcharts: Chart,
    tokenRow: tokenRow,
    card: card
  },
  data() {
    return {
      activeTab: "configuration",
      tokens: tokens,
      tests: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      characters: characters,
      bags: bags,
      cards: cards,
      campaign: null,
      characterIdx: null
    };
  },
  computed: {
    chartOptions() {
      return {
        chartType: "line",
        // chart: {
        //   backgroundColor: "#363636"
        // },
        credits: {
          enabled: false
        },
        title: {
          text: ""
        },
        legend: {
          enabled: false
        },
        yAxis: {
          title: {
            text: "Probability of success (percent)"
            // style: {
            //   color: "white"
            // }
          },
          gridLineColor: "grey",
          max: 100,
          min: 0
        },
        xAxis: {
          title: {
            text: "Difference between stat and test difficulty"
            // style: {
            //   color: "white"
            // }
          },
          lineColor: "grey",
          type: "category",
          categories: this.tests
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
              formatter: function() {
                return this.x + ": " + this.y + "%";
              }
              // style: {
              //   color: "white",
              //   textOutline: "0px"
              // }
            }
          }
        },
        series: [{ data: this.probabilities(), color: "#00d1b2" }]
      };
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
    },
    tokenWarnings() {
      return this.tokens.filter(token => {
        return (
          token.quantity > 0 &&
          token.effect === null &&
          token.label !== "Autofail"
        );
      });
    }
  },
  watch: {
    characterIdx: function(newIdx) {
      let elderSign = this.tokens.filter(
        token => token.label == "Elder Sign"
      )[0];
      let character = this.characters[newIdx];
      elderSign.effect = character.effect;
      elderSign.autosucceed = character.autosucceed;
    }
  },
  methods: {
    probabilities(bag = this.bag) {
      let probabilities = [];
      this.tests.forEach(test => {
        let results = [];
        bag.forEach(token => {
          results.concat(applyToken(test, token, bag, this.cards, this.characterIdx, results));
          token.appliedModifiers = [];
        });
        let sum = results.reduce((a, b) => a + b, 0);

        let outcome = Math.round((sum / results.length) * 100);

        probabilities.push(outcome);
      });
      return probabilities;
    },
    setDefault(key) {
      let bag = bags[key];
      this.campaign = bag.campaign + " (" + bag.difficulty + ")";
      this.tokens.forEach(token => {
        token.quantity = bag[token.label];
      });
    }
  }
};
</script>
<style>
body {
  font-size: 0.75em !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
}
input {
  border: none;
}
td {
  border: none;
}
.checkbox {
  margin-left: 5px;
}

.card {
  margin: 1rem;
}
.card.chart {
  max-height: 350px;
  min-height: 350px;
}

.card.config {
  max-height: 768px;
  min-height: 768px;
}
</style>
