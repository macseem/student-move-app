import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
export default class Cell extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.cell, this.props.style]}
        onPress={this.props.onPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  cell: {
    width: 110,
    height: 150,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "darkgray",
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
