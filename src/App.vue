<template>
  <div id="app">
    <section class="hero is-dark is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">Arkham Horror LCG: Probability Calculator</a>
            </div>
            <div id="navbarMenuHeroA" class="navbar-menu is-active">
              <div class="navbar-end">
                <a
                  class="navbar-item"
                  @click="$refs.chaosBagModal.classList.add('is-active')"
                >Configure Chaos Bag</a>
                <a
                  class="navbar-item"
                  @click="$refs.cardModal.classList.add('is-active')"
                >Set Active Card Effects</a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <nav class="level is-mobile">
            <div class="level-item has-text-centered" v-for="(token, key) in bag" :key="key">
              <div>
                <p class="title is-6">{{token.label}}</p>
              </div>
            </div>
          </nav>
          <br />
          <highcharts :options="chartOptions"></highcharts>
        </div>
      </div>
    </section>
    <!-- Chaos bag Modal -->
    <div class="modal is-dark" ref="chaosBagModal">
      <div class="modal-background"></div>
      <div class="modal-card is-dark">
        <header class="modal-card-head">
          <p class="modal-card-title">Chaos Bag</p>
          <button
            class="delete"
            aria-label="close"
            @click="$refs.chaosBagModal.classList.remove('is-active')"
          ></button>
        </header>
        <section class="modal-card-body">
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
          <table class="table is-narrow is-fullwidth is-bordered">
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
        <footer class="modal-card-foot">
          <button class="button" @click="$refs.chaosBagModal.classList.remove('is-active')">Close</button>
        </footer>
      </div>
    </div>
    <!-- Cards Modal -->
    <div class="modal" ref="cardModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-dark">Active Cards</p>
          <button
            class="delete"
            aria-label="close"
            @click="$refs.cardModal.classList.remove('is-active')"
          ></button>
        </header>
        <section class="modal-card-body">
          <card
            v-for="(cardKey, cardValue) in cards"
            :cardKey="cardKey"
            :cardValue="cardValue"
            :cards="cards"
            :tokens="tokens"
            :key="cardValue"
          />
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="$refs.cardModal.classList.remove('is-active')">Close</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import card from "./components/card";
import Token from "./token";
import { Chart } from "highcharts-vue";
import bags from "./bags";
import applyToken from "./applyToken";
import tokenRow from "./components/tokenRow";
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
      tokens: [
        new Token("+1", 1),
        new Token("0", 0),
        new Token("-1", -1),
        new Token("-2", -2),
        new Token("-3", -3),
        new Token("-4", -4),
        new Token("-5", -5),
        new Token("-6", -6),
        new Token("-8", -8),
        new Token("Skull", null, { variable: true, symbol: true }),
        new Token("Cultist", null, { variable: true, symbol: true }),
        new Token("Tablet", null, { variable: true, symbol: true }),
        new Token("Tentacle", null, { variable: true, symbol: true }),
        new Token("Autofail", null, { autofail: true }),
        new Token("Elder Sign", null, { variable: true })
      ],
      tests: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      bags: bags,
      cards: {
        Counterspell: false,
        "Ritual Candles": false,
        "Ritual Candles (second copy)": false,
        "Recall the Future": false,
        "Recall the Future (second copy)": false,
        Defiance: false,
        // "Dark Prophecy": false,
        // "Olive McBride": false,
        // "Grotesque Statue": false,
        // "Rex's Curse": false,
        // "Necronomicon": false,
        "Jim Culver": false,
        "Father Mateo": false
      }
    };
  },
  computed: {
    chartOptions() {
      return {
        chartType: "line",
        chart: {
          backgroundColor: "#363636",
          height: "50%"
        },
        title: {
          text: "Probability of Success"
        },
        legend: {
          enabled: false
        },
        yAxis: {
          title: {
            text: "Probability of success (percent)",
            style: {
              color: "white"
            }
          },
          gridLineColor: "grey",
          max: 100,
          min: 0
        },
        xAxis: {
          title: {
            text: "Difference between stat and test difficulty",
            style: {
              color: "white"
            }
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
              },
              style: {
                color: "white",
                textOutline: "0px"
              }
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
    }
  },
  methods: {
    probabilities(bag = this.bag) {
      let probabilities = [];
      this.tests.forEach(test => {
        let results = [];
        bag.forEach(token => {
          results.concat(applyToken(test, token, bag, this.cards, results));
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
      this.tokens.forEach(token => {
        token.quantity = bag[token.label];
      });
    }
  }
};
</script>
