<template>
<div>
    <table id="data">
    <thead>
      <tr>
        <th @click="sortByDate()">Date</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="data in tableData"
        :key="data.date"
        :value="data.price">
        <td>{{ data.date }}</td>
        <td>{{ data.price }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { mapState } from "vuex";
  export default {
    methods:{
        sortByDate:function() {
            var newList = [];
            if(this.currentSortDir ==='asc') {            
              this.tableData.sort((a, b) => 
                    a.date.localeCompare(b.date))
                    .map((item) => newList.push(item));
              this.currentSortDir = 'desc';
            } else {
              this.tableData.sort((a, b) => 
                    b.date.localeCompare(a.date))
                    .map((item) => newList.push(item));
              this.currentSortDir = 'asc';
            }
        },
    },
    computed:{
       //table data is populated from store
        ...mapState(["tableData"]),
    },
    mounted() {
      this.currentSortDir = 'asc';
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
