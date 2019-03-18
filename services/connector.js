export default class APIConnector {
  static headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  constructor(apiURL) {
    this.apiURL = apiURL;
  }
  findAddress(text, sessiontoken, onOk, onFail) {
    let encodedText = encodeURIComponent(text);
    let url =
      this.apiURL +
      "/places?input=" +
      encodedText +
      "&type=address&sessiontoken=" +
      sessiontoken;
    return fetch(url, {
      headers: this.headers
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (
          typeof responseJSON.data === "object" &&
          Array.isArray(responseJSON.data)
        ) {
          onOk(responseJSON.data);
        }
      })
      .catch(error => {
        onFail(error);
      });
  }
  _doRequest(action, onLoading, method, body) {
    onLoading();
    return fetch(this.apiURL + action, {
      method: method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined
    }).then(response => response.json());
  }
  getPrices(request, onLoading) {
    return this._doRequest("/shipping/prices", onLoading, "POST", request);
  }
  shippingOrder(request, onLoading) {
    return this._doRequest("/shipping/order", onLoading, "POST", request);
  }
  getOrders(offset, limit, onLoading) {
    return this._doRequest(
      "/orders?offset=" + offset + "&limit=" + limit,
      onLoading,
      "GET"
    );
  }
}
