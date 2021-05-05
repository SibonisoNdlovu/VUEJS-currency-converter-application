<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="ZAR"
          v-model="from"
        />
        <input
          type="text"
          class="form-control"
          placeholder="USD"
          v-model="to"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Amount"
          v-model="value"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="convert"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <!-- <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial.id">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link
          :to="'/tutorials/' + currentTutorial.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
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
      currencies: [] as Currency[],
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
          console.log(response.data);
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
