import Vue from "vue"
import App from "./App.vue"
import "./../node_modules/bulma/css/bulma.css"
import "./../node_modules/@fortawesome/fontawesome-free/css/all.css"
import HighchartsVue from "highcharts-vue"

Vue.config.productionTip = false
Vue.use(HighchartsVue)
new Vue({
  render: h => h(App)
}).$mount("#app")
