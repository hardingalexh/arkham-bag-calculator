<template>
  <tr>
    <td>{{token.label}}</td>
    <td>
      <div class="field">
        <div class="select is-small is-fullwidth">
          <select v-model="token.quantity">
            <option value="0" v-if="token.limit >= 0">0</option>
            <option value="1" v-if="token.limit >= 1">1</option>
            <option value="2" v-if="token.limit >= 2">2</option>
            <option value="3" v-if="token.limit >= 3">3</option>
            <option value="4" v-if="token.limit >= 4">4</option>
            <option value="5" v-if="token.limit >= 5">5</option>
            <option value="6" v-if="token.limit >= 6">6</option>
            <option value="7" v-if="token.limit >= 7">7</option>
            <option value="8" v-if="token.limit >= 8">8</option>
            <option value="9" v-if="token.limit >= 9">9</option>
            <option value="10" v-if="token.limit >= 10">10</option>
          </select>
        </div>
      </div>
    </td>
    <td>
      <div class="field">
        <div
          :class="'select is-small is-fullwidth ' + (token.variable && token.effect === null && token.quantity > 0 ? 'is-danger' : '')"
        >
          <select v-model="token.effect" :disabled="!token.variable">
            <option value></option>
            <option value="10" v-if="token.label === 'Elder Sign'">+10</option>
            <option value="9" v-if="token.label === 'Elder Sign'">+9</option>
            <option value="8" v-if="token.label === 'Elder Sign'">+8</option>
            <option value="7" v-if="token.label === 'Elder Sign'">+7</option>
            <option value="6" v-if="token.label === 'Elder Sign'">+6</option>
            <option value="5" v-if="token.label === 'Elder Sign'">+5</option>
            <option value="4" v-if="token.label === 'Elder Sign'">+4</option>
            <option value="3" v-if="token.label === 'Elder Sign'">+3</option>
            <option value="2" v-if="token.label === 'Elder Sign' || token.label === 'Blessing'">+2</option>
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