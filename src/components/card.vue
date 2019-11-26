<template>
  <div>
    <div class="columns" v-if="symbols.includes(cardValue)">
      <div class="column is-6 has-text-right">
        <label class="is-small">{{cardValue}}</label>
      </div>
      <div class="column is-6">
        <div class="select is-fullwidth is-small is-expanded">
          <select v-model="cards[cardValue]" placeholder="Select Token">
            <option></option>
            <option
              v-for="token in symbolTokens"
              :key="token.label"
              :value="token.label"
            >{{token.label}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="columns" v-else-if="any.includes(cardValue)">
        <div class="column is-6 has-text-right">
          <label class="is-small">{{cardValue}}</label>
        </div>
      <div class="column is-6">
        <div class="control">
          <div class="select is-fullwidth is-small">
            <select v-model="cards[cardValue]">
              <option></option>
              <option
                v-for="token in tokens"
                :key="token.label"
                :value="token.label"
              >{{token.label}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="columns" v-else>
      <div class="column is-6 has-text-right">
        <label class="is-small">{{cardValue}}</label>
      </div>
      <div class="column is-6">
        <div class="control">
          <input type="checkbox" :name="cardValue + '-active'" v-model="cards[cardValue]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: ["cardKey", "cardValue", "cards", "tokens"],
  data() {
    return {
      symbols: ["Defiance", "Defiance (second copy)"],
      any: ["Recall the Future", "Recall the Future (second copy)"]
    };
  },
  computed: {
    symbolTokens() {
      return this.tokens.filter(token => token.symbol);
    }
  }
};
</script>