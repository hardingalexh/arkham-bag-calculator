<template>
  <div>
    <div class="field is-horizontal" v-if="symbols.includes(cardValue)">
      <div class="field-label is-small">
        <label class="label is-small">{{cardValue}}</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth is-small">
              <select v-model="cards[cardValue]">
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
      </div>
    </div>
    <div class="field is-horizontal" v-else-if="any.includes(cardValue)">
      <div class="field-label is-small">
        <label class="label is-small">{{cardValue}}</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
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
    </div>
    <div class="field is-horizontal" v-else>
      <div class="field-label is-small">
        <label class="label is-small">{{cardValue}}</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <input type="checkbox" :name="cardValue + '-active'" v-model="cards[cardValue]" />
          </div>
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