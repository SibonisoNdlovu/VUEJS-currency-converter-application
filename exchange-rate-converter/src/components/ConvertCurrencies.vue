<template>
  <div class="list row">
    <div id="app">
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6">
            <label>From</label>
            <select name="from_id" @change="from($event)" class="form-control">
              <option value="" selected disabled>Choose</option>
              <option
                :value="currency.id"
                v-for="currency in currencies"
                :key="currency.id"
              >
                {{ currency.id }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label>To</label>
            <select name="from_id" @change="to($event)" class="form-control">
              <option value="" selected disabled>Choose</option>
              <option
                :value="currency.id"
                v-for="currency in currencies"
                :key="currency.id"
              >
                {{ currency.id }}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 offset-md-3">
            <input
              type="text"
              v-model="amount"
              placeholder="Amount"
              class="form-control my-5"
            />
            <div class="text-center">
              <form @submit.prevent="convert">
                <button type="submit">Convert</button>
              </form>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 offset-md-3">
            <label for="convertedValue">{{ convertedValue }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="chart-container">
              <div style="height: 200px; width: 200px">
                <!-- <vue3-chart-js
                  :id="doughnutChart.id"
                  :type="doughnutChart.type"
                  :data="doughnutChart.data"
                  @before-render="beforeRenderLogic"
                ></vue3-chart-js> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConverterService from "@/services/ConverterService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "ConvertCurrencies",
  data() {
    return {
      fromValue: "",
      toValue: "",
      currencies: [] as { id: string; value: any }[],
      amount: "",
      convertedValue: "",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    convert() {
      ConverterService.convert(this.amount, this.fromValue, this.toValue)
        .then((response: ResponseData) => {
          this.convertedValue = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    getCurrencies() {
      ConverterService.getAllCurrencies()
        .then((response: ResponseData) => {
          for (var f in response.data) {
            this.currencies.push({
              id: f,
              value: response.data[f],
            });
          }
          return this.currencies;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    from(event: any) {
      this.fromValue = event.target.value;
      console.log(event.target.value);
    },

    to(event: any) {
      this.toValue = event.target.value;
      console.log(event.target.value);
    },

    getTimeSeries() {
      ConverterService.getTimeSeries(
        this.startDate,
        this.endDate,
        this.fromValue,
        this.toValue
      )
        .then((response: ResponseData) => {
          return response;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getCurrencies();
  },
});
</script>

<style>
.title {
  font-size: 2rem;
  margin: 1rem 0;
}
.chart-container {
  position: relative;
  margin: 0 auto;
  padding: 0 1rem;
  padding-bottom: 1rem;
  height: auto;
  width: 100%;
  min-height: 400px;
}
</style>
