import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
export default class Error extends React.Component {
  static propTypes = {
    value: PropTypes.string
  };
  static defaultProps = {
    value: ""
  };
  render() {
    if (this.props.value.length > 0){
      return (
        <View style={styles.view}>
          <Text style={styles.text}>{this.props.value}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  view:{
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    color: "red"
  }
})
