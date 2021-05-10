import api from "./api";

export default {
  async getAllCurrencies() {
    try {
      const response = await api.get("/currencies.json");
      return response.data;
    } catch (error) {
      console.log("Error on getAllCurrencies\n", error);
      return {};
    }
  },
  async getRatesHistory(from:string,to:string,startDate:Date,endDate:String ) {
    try {
      const response = await api.get(
        `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&symbols=${to}&base=${from}&places=3`,
      );
      return response.data.rates;

    } catch (error) {
      console.log("Error on getRates\n", error);
      return null;
    }
  },

  async convert(amount:any, from:string, to:string) {
    try {
      const response = await api.get(`/latest.json?app_id=24f06b4b009348a1902fc558f8516018&base=${from}&symbols=${to}`);
      return response.data;
    } catch (error) {
      console.log("Error on Convert\n", error);
      return {};
    }
  },

  async getTimeSeries(start: any, end: any, from:string, to:string) {
    try {
      const response = await api.get(`/time-series.json?app_id=24f06b4b009348a1902fc558f8516018&start=${start}&end=${end}&base=${from}&symbols=${to}&prettyprint=1`);
      return response.data;
    } catch (error) {
      console.log("Error on Convert\n", error);
      return {};
    }
  },
};
