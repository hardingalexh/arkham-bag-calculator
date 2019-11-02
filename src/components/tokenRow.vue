<template>
  <tr>
    <td>{{token.label}}</td>
    <td>
      <input
        class="input is-small"
        type="number"
        :id="token.label + '-quantity'"
        :name="token.label + '-quantity'"
        v-model="token.quantity"
        min="0"
      />
    </td>
    <td>
      <input
        :class="'input is-small ' + (token.variable ? 'is-danger' : '')"
        type="number"
        :id="token.label + '-effect'"
        :name="token.label + '-effect'"
        v-model="token.effect"
        :disabled="!token.variable"
      />
    </td>
    <td>
      <div class="field">
        <label class="checkbox" v-if="token.symbol">
          <input type="checkbox" :name="token.label + '-drawagain'" v-model="token.draw_again" />
          Draw Again
        </label>
      </div>
      <div class="field">
        <label class="checkbox" v-if="token.symbol">
          <input type="checkbox" :name="token.label + '-autofail'" v-model="token.autofail" />
          Automatically Fails
        </label>
      </div>
    </td>
  </tr>
</template>
<script>
export default {
  name: "tokenRow",
  props: ["token"]
};
</script>