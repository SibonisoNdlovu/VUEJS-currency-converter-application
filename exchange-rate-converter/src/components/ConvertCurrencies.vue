<template>
  <div class="list row">
    <div id="app">
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6">
            <label>From</label>
            <select name="from_id" @change="from($event)" class="form-control">    
                <option value="" selected disabled>Choose</option>
                <option :value="currency.id" v-for="(currency) in currencies" :key="currency.id">{{currency.id}}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label>To</label>
            <select name="from_id" @change="to($event)" class="form-control">              
                <option value="" selected disabled>Choose</option>
                <option :value="currency.id" v-for="(currency) in currencies" :key="currency.id">{{currency.id}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 offset-md-3">
            <input type="text" v-model="amount" placeholder="Amount" class="form-control my-5" />
            <div class="text-center">
                   <form @submit.prevent="convert">
                        <button type="submit">
                            Convert
                        </button>
                    </form>
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

export default defineComponent({
  name: "ConvertCurrencies",
  data() {
    return {
      fromValue: "",
      toValue: "",
      currencies: [] as {id:string,value:any}[],
      amount: "",
      convertedValue: ""
    };
  },
  methods: {
    convert() {
        ConverterService.convert(this.amount,this.fromValue,this.toValue)
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
    },

    from(event:any){
        this.fromValue= event.target.value
        console.log(event.target.value)
    },

    to(event:any){
        this.toValue= event.target.value
        console.log(event.target.value)
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
