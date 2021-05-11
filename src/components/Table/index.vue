<template>
<div>
    <table id="data">
    <thead>
      <tr>
        <th>Date</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="data in tableData"
        :key="data.date"
        :value="data.price">
        <td @click="sort('date')">{{ data.date }}</td>
        <td @click="sort('price')">{{ data.price }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>

import { mapState } from "vuex";
  export default {
    methods:{
        sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
        },
    },
    computed:{
        ...mapState(["tableData"]),

    //     sortedData:function() {
    //     return this.tableData.sort((a,b) => {
    //         let modifier = 1;
    //         if(this.currentSortDir === 'desc') modifier = -1;
    //         if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
    //         if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
    //         return 0;
    //     });
    // },
},
}
</script>

<style scoped lang="scss">
#data {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#data td, #data th {
  border: 1px solid #ddd;
  padding: 8px;
}

#data tr:nth-child(even){background-color: #f2f2f2;}

#data tr:hover {background-color: #ddd;}

#data th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
