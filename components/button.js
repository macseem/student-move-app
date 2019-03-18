import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
export default class Button extends React.Component {
  render() {
    let style = this.props.style;
    style.backgroundColor = this.props.active ? "darkblue" : "white";
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text
          style={[
            { color: this.props.active ? "white" : "black" },
            styles.text
          ]}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool
};
Button.defaultProps = {
  active: false,
  style: {}
};
const styles = StyleSheet.create({
  text: {
    fontSize: 18
  },
  button: {
    overflow: "hidden",
    height: 60,
    margin: 10,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  }
});
