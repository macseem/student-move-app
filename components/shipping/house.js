import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Cell from "./cell";
export default class ShippingHouse extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
  };
  static defaultProps = {
    active: false
  };
  static source = [
    { uri: "https://hei.innovate360.co.uk/dist/img/house_white.png" },
    { uri: "https://hei.innovate360.co.uk/dist/img/house.png" }
  ];

  render() {
    const houseStyle = this.props.active ? styles.houseActive : styles.house;
    const imageSource = ShippingHouse.source[this.props.active ? 0 : 1];
    const textStyle = this.props.active ? styles.textActive : styles.text;
    return (
      <Cell style={houseStyle} onPress={this.props.onPress}>
        <Image source={imageSource} style={styles.image} />
        <Text style={textStyle}>{this.props.title}</Text>
      </Cell>
    );
  }
}

const styles = StyleSheet.create({
  house: { backgroundColor: "white" },
  houseActive: { backgroundColor: "lightblue" },
  image: { width: 100, height: 100 },
  text: { textAlign: "center", color: "black" },
  textActive: { textAlign: "center", color: "white" }
});
