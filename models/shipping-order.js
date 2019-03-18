export default class ShippingOrderReq {
  constructor() {
    this.id = undefined;
    this.status = "ok";
    this.type = undefined;
    this.created = undefined;
    this.details = {
      shipping: {
        pricesRequest: undefined,
        rates: undefined,
        description: undefined,
        chozenRate: undefined
      },
      accommodation: {}
    };
    this.firstName = undefined;
    this.lastName = undefined;
    this.phone = undefined;
    this.email = undefined;
  }
}
