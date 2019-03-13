import React from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "../comp-bundle";
export default class ShippingPrices extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
      </View>
    );
  }
}
