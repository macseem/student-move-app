import React from "react";
import { ScrollView, View, TextInput, Text, Image } from "react-native";
import { Button, Rate } from "../comp-bundle";

export default class ShippingPrices extends React.Component {
  render() {
    let orderReq = this.props.navigation.getParam("orderReq");
    let key = 1;
    const rates = orderReq.details.shipping.rates.map(rate => (
      <Rate
        backgroundColor={key % 2 == 0 ? "lightgray" : "white"}
        key={key++}
        data={rate}
        onPress={() => {
          orderReq.details.shipping.chozenRate = rate;
          this.props.navigation.navigate("ContactUs", { orderReq: orderReq });
        }}
      />
    ));

    return <ScrollView>{rates}</ScrollView>;
  }
}
