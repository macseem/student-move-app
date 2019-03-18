import React from "react";
import Button from "../button";
import { StyleSheet, View, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Cell from "./cell";
function ButtonContainer(props) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        style={{ ...styles.button, borderRightWidth: 1 }}
        onPress={props.onPressMinus}
        title="-"
      />
      <Button style={styles.button} onPress={props.onPressPlus} title="+" />
    </View>
  );
}
export default class ShippingItem extends React.Component {
  render() {
    return (
      <Cell>
        <Text style={styles.text}>{this.props.title}</Text>
        <Image style={styles.image} source={this.props.imgSource} />
        <Text style={styles.amount}>{this.props.amount}</Text>
        <ButtonContainer
          onPressMinus={this.props.onPressMinus}
          onPressPlus={this.props.onPressPlus}
        />
      </Cell>
    );
  }
}
ShippingItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  imgSource: PropTypes.object.isRequired,
  onPressMinus: PropTypes.func.isRequired,
  onPressPlus: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  textView: {},
  title: { marginTop: 5, textAlign: "center" },
  image: { width: 50, height: 50, marginBottom: 5 },

  amount: { textAlign: "center" },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "darkgray"
  },
  button: {
    margin: 0,
    height: "100%",
    width: "50%",
    overflow: "hidden",
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
