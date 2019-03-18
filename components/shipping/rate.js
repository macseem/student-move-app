import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { View, Image, Text } from "react-native";

export default class Rate extends React.Component {
  static supImgs = {
    BaggageHub: require("../../assets/suppliers/baggage_hub.jpeg"),
    ShippingForce: require("../../assets/suppliers/shippingforce.png"),
    Default: require("../../assets/suppliers/default_supplier.png")
  };
  static propTypes = {
    backgroundColor: PropTypes.string,
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  };
  static defaultProps = {
    backgroundColor: "white"
  };
  constructor(props) {
    super(props);
    let icon = "Default",
      supplier;
    if (props.data.supplier && props.data.supplier.name) {
      if (Rate.supImgs.hasOwnProperty(props.data.supplier.name)) {
        icon = props.data.supplier.name;
      }
      supplier = (
        <Text>
          <Text style={{ fontWeight: "bold" }}>Supplier: </Text>
          {props.data.supplier.name}
        </Text>
      );
    }
    this.state = {
      icon: icon,
      supplier: supplier
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.backgroundColor }}>
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          <Image
            source={Rate.supImgs[this.state.icon]}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          />
          <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
            {this.state.supplier}
            <Text>
              <Text style={{ fontWeight: "bold" }}>Service: </Text>
              {this.props.data.product.title}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Price: </Text>
              {this.props.data.breakdown.inc_margin.toFixed(2)}{" "}
              {this.props.data.currency_symbol}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Tax: </Text>
              {this.props.data.breakdown.inc_tax.toFixed(2)}{" "}
              {this.props.data.currency_symbol}
            </Text>
          </View>
        </View>
        <Text style={{ paddingTop: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
          {this.props.data.product.description}
        </Text>
        <Button active={true} title="Order" onPress={this.props.onPress} />
      </View>
    );
  }
}
