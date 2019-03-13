
export default class APIConnector {
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
    return fetch(url)
      .then(response => response.json())
      .then(responseJSON => {
        if (
          typeof responseJSON.predictions === "object" &&
          Array.isArray(responseJSON.predictions)
        ) {
          onOk(responseJSON.predictions);
        }
      })
      .catch(error => {
        onFail(error);
      });
  }
}
