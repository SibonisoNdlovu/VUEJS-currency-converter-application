<template>
  <div class="list row">
    <div id="app">
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6">
            <label>From</label>
            <select  class="form-control">
                <option :value="currency.id" v-for="(currency) in currencies" :key="currency.id">{{currency.id}}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label>To</label>
            <select  class="form-control">
                <option :value="currency.id" v-for="(currency) in currencies" :key="currency.id">{{currency.id}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 offset-md-3">
            <input type="text" placeholder="Amount" class="form-control my-5" />
            <div class="text-center">
              <div class="button btn-large btn-primary ">Convert</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h1 class="text-center mt-5 display-2">56.3</h1>
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
import Currency from "@/types/Currency";

export default defineComponent({
  name: "ConvertCurrencies",
  data() {
    return {
      from: "",
      to: "",
      currencies: [] as {id:string,value:any}[],
      value: "",
      convertedValue: ""
    };
  },
  methods: {
    convert() {
        ConverterService.convert(this.value,this.from,this.to)
            .then((response: ResponseData) => {
                this.convertedValue = response.data
                console.log(response.data);
            })
            .catch((e: Error)=> {
                console.log(e);
            });
    },

    getCurrencies() {
      ConverterService.getAllCurrencies()
        .then((response: ResponseData) => {
          this.currencies = response.data;
          const result : string[] = [];
          let currencyList = [];
            for (var f in response.data) {
                currencyList.push({
                    id: f,
                    value: response.data[f]
                })
            }
            
          this.currencies = currencyList;
          console.log(currencyList);
          return currencyList;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getCurrencies();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
