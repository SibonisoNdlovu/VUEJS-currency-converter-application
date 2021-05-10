import Vue from "vue";
import Vuex from "vuex";
import currencyServices from "@/services";
import { getDateBeforeDays } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyCode: {
      to: "BRL",
      from: "USD",
    },
    startDate: getDateBeforeDays(7),
    currenciesOptions: [],
    chartData: null,
    amount:"",
    convertedValue: "",
  },

  mutations: {
    setCurrencyCode(state, { newValue, key }) {
      if (key === "to" || key === "from") {
        state.currencyCode[key] = newValue;
      }
    },
    setStartDate(state, newValue) {
      state.startDate = newValue;
    },
    setCurrenciesOptions(state, newValue) {
      state.currenciesOptions = newValue;
    },
    setChartData(state, newValue) {
      state.chartData = newValue;
    },
    setAmount(state, newValue){
      state.amount = newValue
    },
    setConvertedValue(state, newValue){
      state.convertedValue = newValue
    },
  },

  actions: {
    async getCurrenciesOptions({ commit }) {
      const currencies = await currencyServices.getAllCurrencies();
      var newList = [];

      for (var f in currencies) {
        newList.push({
          id: f,
          description: currencies[f],
        });
      }
      commit("setCurrenciesOptions", newList);
    },
    async getCurrencyRates({ commit }, { from, to, startDate }) {
      const today = getDateBeforeDays();
      const rates = await currencyServices.getRatesHistory(
        from,
        to,
        startDate,
        today,
      );

      const dates = [];
      const RatesCurrency = [];

      for (const date of Object.keys(rates)) {
        dates.push(date.replace(/-/g, "/"));
        RatesCurrency.push(rates[date][to]);
      }

      commit("setChartData", {
        title: `${from} to ${to} Chart`,
        labels: dates,
        datasets: [
          {
            label: `${from} to ${to}`,
            data: RatesCurrency,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            borderColor: "#42b983",
            lineTension: 0,
            pointBorderColor: "#2c3e50",
            pointBackgroundColor: "#2c3e50",
          },
        ],
      });
    },
    async convert({ commit }, {from, to, amount}) {
      const convertedAmount = await currencyServices.convert(
        amount,
        from,
        to,
      );

      var newAmount = parseInt(amount) * convertedAmount.rates[to];
      commit("setConvertedValue",  newAmount.toString());
    },
  },
});
