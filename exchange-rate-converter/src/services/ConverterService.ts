import http from "@/http-common";

/* eslint-disable */
class ConverterService {
  app_id = "280d98d2f141490991c233d2a4e74166";
  getAllCurrencies(): Promise<any> {
    return http.get("https://openexchangerates.org/api/currencies.json");
  }

  convert(amount: any, from:string, to:string): Promise<any>{
    return http.post("https://openexchangerates.org/api/convert/"+amount+"/"+from+"/ "+to+"?app_id="+this.app_id+"")
  }
}

export default new ConverterService();
