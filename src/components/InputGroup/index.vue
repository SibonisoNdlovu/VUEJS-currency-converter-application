<template>
  <div class="input-group">
    <label for="from">From:</label>
    <select id="from" class="input input-currency" v-model="currencyCodeFrom">
      <option
        v-for="currency in currenciesOptions"
        :key="currency.id"
        :value="currency.id"
      >
        {{ currency.id + " - " + currency.description }}
      </option>
    </select>

    <label for="to">To:</label>
    <select id="to" class="input input-currency" v-model="currencyCodeTo">
      <option
        v-for="currency in currenciesOptions"
        :key="currency.id"
        :value="currency.id"
      >
        {{ currency.id + " - " + currency.description }}
      </option>
    </select>

    <label for="date">Initial date:</label>
    <input
      type="date"
      id="date"
      class="input input-date"
      :max="yeterday"
      :min="lastYear"
      v-model="startDate"
    />
    <input
      type="text"
      v-model="amount"
      placeholder="Amount"
      class="input input-date"
    />

    <button type="button" class="button" @click="handleConvertAmount">
      CONVERT
    </button>'

    <div>
      <div>
        <h3>{{ amount }} {{ currencyCodeFrom }} equals</h3>
        <h1>{{ convertedValue }} {{ currencyCodeTo }}</h1>
      </div>
    </div>

    <button type="button" class="button" @click="handle1Day">
      1 Day
    </button>   
    <button type="button" class="button" @click="handle7Day">
      7 Days
    </button>   
    <button type="button" class="button" @click="handle30Day">
      30 Days
    </button>   
    <button type="button" class="button" @click="handle90Day">
      90 Days
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getDateBeforeDays } from "@/utils";

export default {
  name: "InputGroup",
  data() {
    return {
      yeterday: getDateBeforeDays(1),
      lastYear: getDateBeforeDays(360),
    };
  },
  created() {
    this.getCurrenciesOptions();
  },
  methods: {
    ...mapActions(["getCurrenciesOptions", "getCurrencyRates", "convert" ]),

    handleGetCurrencyRates() {
      const { currencyCodeFrom, currencyCodeTo, startDate} = this;

      this.getCurrencyRates({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        startDate,
      });
        console.log("daaaaaaaaaaaaaaaaaaaaaate", startDate)
      
      this.$emit("inputData", this.chartData);
    },
    handleConvertAmount() {
      const { currencyCodeFrom, currencyCodeTo, amount} = this;
      this.convert({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        amount: amount,
      });
      
      this.handleGetCurrencyRates();
    },
    handle1Day() {
      const { currencyCodeFrom, currencyCodeTo} = this;

  var today = new Date()
var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
      console.log("daaaaaaaaaaaaaaaaaaaaaate", date)

      this.getCurrencyRates({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        date,
      });
      
      console.log("emitemitemitemit", this.chartData)
      this.$emit("inputData", this.chartData);
    },
    handle7Day() {
      const { currencyCodeFrom, currencyCodeTo} = this;
  var today = new Date()
const date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-7);
      console.log("daaaaaaaaaaaaaaaaaaaaaate", date)
      this.getCurrencyRates({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        date,
      });
      
      console.log("emitemitemitemit", this.chartData)
      this.$emit("inputData", this.chartData);
    },
    handle30Day() {
      const { currencyCodeFrom, currencyCodeTo} = this;
        var today = new Date()
const date=today.getFullYear()+'-'+(today.getMonth())+'-'+(today.getDate());
      console.log("daaaaaaaaaaaaaaaaaaaaaate", date)
      this.getCurrencyRates({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        date,
      });
      
      console.log("emitemitemitemit", this.chartData)
      this.$emit("inputData", this.chartData);
    },
    handle90Day() {
      const { currencyCodeFrom, currencyCodeTo} = this;
        var today = new Date()
const date=today.getFullYear()+'-'+(today.getMonth()-3)+'-'+(today.getDate());
      console.log("daaaaaaaaaaaaaaaaaaaaaate", date)
      this.getCurrencyRates({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        date,
      });
      
      console.log("emitemitemitemit", this.chartData)
      this.$emit("inputData", this.chartData);
    },
  },

  computed: {
    ...mapState(["currenciesOptions"]),

    currencyCodeTo: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "to" });
      },
      get() {
        return this.$store.state.currencyCode.to;
      },
    },
    currencyCodeFrom: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "from" });
      },
      get() {
        return this.$store.state.currencyCode.from;
      },
    },
    startDate: {
      set(newValue) {
        this.$store.commit("setStartDate", newValue);
      },
      get() {
        return this.$store.state.startDate;
      },
    },
    amount: {
      set(newValue) {
        this.$store.commit("setAmount", newValue);
      },
      get() {
        return this.$store.state.amount;
      },
    },
    convertedValue: {
      set(newValue) {
        this.$store.commit("setConvertedValue", newValue);
      },
      get() {
        return this.$store.state.convertedValue;
      },
    },
    chartData: {
      set(newValue) {
        this.$store.commit("setChartData", newValue);
      },
      get() {
        return this.$store.state.chartData;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
  padding: 0 1rem;
  color: #2c3e50;

  > .input {
    width: 20%;
    margin: 1rem;
    margin-top: 0.5rem;
    height: 3rem;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    border: #000000 solid 2px;
    &.input-currency {
      max-width: 500px;
    }
    &.input-amount {
      max-width: 200px;
      text-align: center;
    }
  }

  > .button {
    width: 20%;
    max-width: 200px;
    margin: 1rem;
    height: 3rem;
    padding: 0 0.5rem;
    font-weight: bold;
    color: #ffff;
    background-color: #090761;
    border: #000000 solid 2px;
    transition: filter ease 200ms;
    &:hover {
      filter: brightness(110%);
    }
  }
}
</style>
