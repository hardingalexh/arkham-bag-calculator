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
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-light"
              href="https://github.com/hardingalexh/arkham-bag-calculator"
              alt="Github Link"
            >
              <i class="fab fa-github"></i>
            </a>
            <a class="button is-light" @click="help = true">
              <strong>Help</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <section id="main-content">
      <div class="columns is-desktop is-gapless">
        <div class="column">
          <!-- Config Card -->
          <div class="card config">
            <header class="card-header">
              <p class="card-header-title">Configure Chaos Bag and Card Effects</p>
            </header>
            <div class="card-content">
              <div class="tabs is-boxed is-small">
                <ul>
                  <li id="chaosBagTab" :class="tab === 'chaosBag' ? 'is-active' : ''">
                    <a @click="tab = 'chaosBag'">Chaos Bag</a>
                  </li>
                  <li id="cardEffectsTab" :class="tab === 'cardEffects' ? 'is-active' : ''">
                    <a @click="tab = 'cardEffects'">Card Effects</a>
                  </li>
                </ul>
              </div>
              <!-- Campaign -->
              <section id="chaosBagSection" :class="tab != 'chaosBag' ? 'hidden' : ''">
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
                      <option :value="null">Choose Character</option>
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
              </section>

              <section id="cardEffectsSection" :class="tab != 'cardEffects' ? 'hidden' : ''">
                <card
                  v-for="(cardKey, cardValue) in cards"
                  :cardKey="cardKey"
                  :cardValue="cardValue"
                  :cards="cards"
                  :tokens="tokens"
                  :key="cardValue"
                />
              </section>
            </div>
          </div>
        </div>
        <div class="column">
          <!-- Probability of Success Card -->
          <div class="card chart">
            <header class="card-header">
              <p class="card-header-title">Probability of Success</p>
            </header>
            <div class="card-content">
              <div class="content">
                <highcharts :options="successChartOptions" class="vh70"></highcharts>
              </div>
            </div>
          </div>
          <!-- Probability of passing with Olive McBride -->
          <div class="card chart" :class="{ 'hidden': !cards['Olive McBride'] }">
            <header class="card-header">
              <p class="card-header-title">Probability of Success with Olive McBride (counts only token modifiers before resolution)</p>
            </header>
            <div class="card-content">
              <div class="content">
                <highcharts :options="successChartOptionsWithOlive" class="vh70"></highcharts>
              </div>
            </div>
          </div>
          <!-- Probability of Token Card -->
          <div class="card chart">
            <header class="card-header">
              <p class="card-header-title">Probability of Resolving Token</p>
            </header>
            <div class="card-content">
              <div class="content">
                <highcharts :options="tokenChartOptions" class="vh70"></highcharts>
              </div>
            </div>
          </div>
          <!-- Probability of Token Revealing with Olive McBride -->
          <div class="card chart" :class="{ 'hidden': !cards['Olive McBride'] }">
            <header class="card-header">
              <p class="card-header-title">Probability of Token Revealing with Olive McBride</p>
            </header>
            <div class="card-content">
              <div class="content">
                <highcharts :options="tokenChartOptionsWithOlive" class="vh70"></highcharts>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="modal is-active" v-if="help">
      <div class="modal-background" @click="help = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">FAQ and Help</p>
          <button class="delete" aria-label="close" @click="help = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="card-content">
            <p>
              The panel on the left side of the screen titled
              <strong>Configure Chaos Bag and Card Effects</strong> is where you set all of the variables. This panel has a table that represents your chaos bag - for each token, you define how many copies are in the bag, and what modifier each token applies to your test result. To use this tool, try the following:
            </p>
            <br />
            <p>
              <strong>1.</strong> Choose your campaign and difficulty from the
              <strong>Choose Campaign</strong> dropdown. This will set the quantities of tokens to that campaign/difficulty.
            </p>
            <p>
              <strong>2.</strong> Manually add or remove any tokens that have been added/removed by your campaign by changing the dropdown in the
              <strong>Quantity</strong> column for that token.
            </p>
            <p>
              <strong>3.</strong> Define the symbol tokens' modifiers by changing the value of the dropdown in the
              <strong>Effect</strong> column for that token.
            </p>
            <p>
              <small>
                For example, if the skull token is worth -X where X is the number of ghouls at your location, and there are 3 ghouls at your location, set the
                <strong>Effect</strong> for skull to -3.
              </small>
            </p>
            <p>
              <strong>4.</strong> Set any other token effects, such as
              <strong>Draw Again</strong> or
              <strong>Automatically Fails</strong>
            </p>
            <p>
              <strong>5.</strong> Choose a character from the
              <strong>Choose Character</strong> dropdown. This will set the effect of the Elder Sign token, as well as apply and specific effects for investigators like Jim Culver or Father Mateo. If the chosen character's elder sign ability is variable, you may need to manually specify their effect.
            </p>
            <p>
              <strong>6.</strong> Select the
              <strong>Card Effects</strong> tab to select any cards you may be using for this skill test.
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="help = false">Got it!</button>
        </footer>
      </div>
    </div>
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
import calculateTokenModifier from "./functions/calculateTokenModifier";
import probabilityOfToken from "./functions/probabilityOfToken";
import probabilityOfTokenReveal from "./functions/probabilityOfTokenReveal";

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
      characterIdx: null,
      tab: "chaosBag",
      help: false
    };
  },
  computed: {
    tokenChartOptions() {
      return {
        chart: {
          height: 300
        },
        chartType: "column",
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: this.tokens.map(token => token.label),
          title: {
            text: "Tokens"
          },
          type: "category"
        },
        yAxis: {
          title: {
            text: "Probability of Resolving (percent)"
          },
          max: 25,
          min: 0,
          type: "column"
        },
        series: [
          {
            data: this.probabilitiesOfToken(),
            color: "#00d1b2",
            type: "column"
          }
        ],
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
              formatter: function() {
                return String(parseFloat(this.y).toFixed(2)) + "%";
              }
              // style: {
              //   color: "white",
              //   textOutline: "0px"
              // }
            }
          }
        }
      };
    },
    tokenChartOptionsWithOlive() {
      return {
        chart: {
          height: 300
        },
        chartType: "column",
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: this.tokens.map(token => token.label),
          title: {
            text: "Tokens"
          },
          type: "category"
        },
        yAxis: {
          title: {
            text: "Probability of Revealing (percent)"
          },
          max: 80,
          min: 0,
          type: "column"
        },
        series: [
          {
            data: this.probabilitiesOfTokenWithOlive(),
            color: "#00d1b2",
            type: "column"
          }
        ],
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
              formatter: function() {
                return String(parseFloat(this.y).toFixed(2)) + "%";
              }
              // style: {
              //   color: "white",
              //   textOutline: "0px"
              // }
            }
          }
        }
      };
    },
    successChartOptions() {
      return {
        chartType: "line",
        // chart: {
        //   backgroundColor: "#363636"
        // },
        chart: {
          height: 300
        },
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
          max: 100,
          min: 0
        },
        xAxis: {
          title: {
            text: "Difference betweeen test difficulty and character skill"
            // style: {
            //   color: "white"
            // }
          },
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
        series: [{ data: this.probabilitiesOfSuccess(), color: "#00d1b2" }]
      };
    },
    successChartOptionsWithOlive() {
      return {
        chartType: "line",
        // chart: {
        //   backgroundColor: "#363636"
        // },
        chart: {
          height: 300
        },
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
          max: 100,
          min: 0
        },
        xAxis: {
          title: {
            text: "Difference betweeen test difficulty and character skill"
            // style: {
            //   color: "white"
            // }
          },
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
        series: [{ data: this.probabilitiesOfSuccessWithOlive(), color: "#00d1b2" }]
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
    probabilitiesOfSuccess(bag = this.bag) {
      let probabilities = [];
      this.tests.forEach(test => {
        let results = [];
        bag.forEach(token => {
          results.concat(
            applyToken(test, token, bag, this.cards, this.characterIdx, results)
          );
          token.appliedModifiers = [];
        });
        let sum = results.reduce((a, b) => a + b, 0);

        let outcome = Math.round((sum / results.length) * 100);

        probabilities.push(outcome);
      });
      return probabilities;
    },
    probabilitiesOfToken() {
      let probabilities = [];
      this.tokens.forEach(token => {
        let probability = probabilityOfToken(
          token,
          this.bag,
          this.characterIdx
        );
        probabilities.push(probability);
      });
      return probabilities;
    },
    probabilitiesOfTokenWithOlive() {
      let probabilities = [];
      this.tokens.forEach(token => {
        let probability = probabilityOfTokenReveal(
          token,
          this.bag,
          this.characterIdx
        );
        probabilities.push(probability);
      });
      return probabilities;
    },
    probabilitiesOfSuccessWithOlive(bag = this.bag) {
      let probabilities = [];
      let bagModifiers = [];
      for (let i = 0; i < bag.length; i++) {
        let a;
        if (bag[i].label !== 'Autofail') {
          a = calculateTokenModifier(bag[i], bag, this.cards, this.characterIdx);
        } else {
          a = -100;
        }
        bagModifiers.push(a);
      }

      this.tests.forEach(test => {
        let results = [];
        let triads = [];
        let indexes = [];
        for (let i = 0; i < bag.length; i++) {
          up:
            for (let j = 0; j < bag.length; j++) {
              for (let k = 0; k < bag.length; k++) {
                if(i === j || i === k || j === k) {
                  continue up;
                }
                let temp = [i, j, k].sort(function(a,b){return a - b}).join();
                if (!indexes.includes(temp)) {
                  indexes.push(temp);
                  temp = [bagModifiers[i], bagModifiers[j], bagModifiers[k]].sort(function(a,b){return a - b});
                  triads.push(temp);
                }
              }
            }
        }
        triads.forEach(triad => {
          let success = triad[1] + triad[2] + test >= 0;
          results.push(success * 1);
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
html {
  height: 100%;
  min-height: 100%;
}
body {
  min-height: 100%;

  font-size: 0.75em !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  background-color: hsl(0, 0%, 71%);
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
  max-height: 400px;
  min-height: 400px;
}

.card.config {
  min-height: 850px;
}
.hidden {
  display: none;
}
</style>
