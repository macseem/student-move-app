import React from "react";
import { StyleSheet, Modal, ActivityIndicator, View} from "react-native";
import PropTypes from "prop-types";

export default class ModalLoading extends React.Component {
  static defaultProps = {
    transparent: true,
    animationType: "slide"
  };
  render() {
    return (
      <Modal {...this.props}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
