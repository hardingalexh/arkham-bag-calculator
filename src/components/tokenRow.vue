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
      <div class="field">
        <div
          :class="'select is-small is-fullwidth ' + (token.variable && token.effect === null && token.quantity > 0 ? 'is-danger' : '')"
        >
          <select v-model="token.effect" :disabled="!token.variable">
            <option value></option>
            <option value="1">+1</option>
            <option value="0">0</option>
            <option value="-1">-1</option>
            <option value="-2">-2</option>
            <option value="-3">-3</option>
            <option value="-4">-4</option>
            <option value="-5">-5</option>
            <option value="-6">-6</option>
            <option value="-7">-7</option>
            <option value="-8">-8</option>
            <option value="-9">-9</option>
            <option value="-10">-10</option>
          </select>
        </div>
      </div>
    </td>
    <td>
      <div class="field" v-if="token.symbol">
        <label class="checkbox">
          <input type="checkbox" :name="token.label + '-drawagain'" v-model="token.draw_again" />
          Draw Again
        </label>
        <label class="checkbox">
          <input type="checkbox" :name="token.label + '-autofail'" v-model="token.autofail" />
          Automatically Fails
        </label>
      </div>
      <div class="field" v-if="token.label === 'Elder Sign'">
        <label class="checkbox">
          <input type="checkbox" :name="token.label + '-autosuceed'" v-model="token.autosucceed" />
          Automatically Succeeds
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