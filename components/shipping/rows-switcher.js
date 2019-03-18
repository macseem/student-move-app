import React from "react";
import { View } from "react-native";
import Button from "../button";
import PropTypes from "prop-types";

export default class RowsSwitcher extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePress(tab) {}
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Button
          active={this.props.activeTab == "house"}
          title="Full House Move"
          onPress={() => {
            this.props.onPress("house");
          }}
        />
        <Button
          active={this.props.activeTab == "items"}
          title="Boxes & Items Move"
          onPress={() => {
            this.props.onPress("items");
          }}
        />
      </View>
    );
  }
}
RowsSwitcher.propTypes = {
  activeTab: PropTypes.oneOf(["house", "items"]).isRequired,
  onPress: PropTypes.func.isRequired
};
