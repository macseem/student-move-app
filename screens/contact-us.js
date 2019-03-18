import React from "react";
import { StyleSheet, ScrollView, View, TextInput, Text } from "react-native";
import { Button, ModalLoading } from "../comp-bundle";
import PropTypes from "prop-types";
import APIConnector from "../services/connector";

function Row(props) {
  return (
    <View style={styles.row}>
      <Text>{props.children}</Text>
      <TextInput
        style={styles.textInput}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
}
export default class ContactUs extends React.Component {
  static propTypes = {
    APIConnector: PropTypes.instanceOf(APIConnector).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      isLoading: false
    };
  }
  handleSubmit = () => {
    orderRequest = this.props.navigation.getParam("orderReq");
    orderRequest.firstName = this.state.firstName;
    orderRequest.lastName = this.state.lastName;
    orderRequest.phone = this.state.phone;
    orderRequest.email = this.state.email;

    this.props.APIConnector.shippingOrder(orderRequest, () =>
      this.setState({ isLoading: true })
    )
      .then(jsonResponse => {
        this.setState({ isLoading: false });
        orderRequest.id = jsonResponse.data;
        this.props.navigation.navigate("OrderDetails", {
          orderReq: orderRequest,
          isMenuButtonNeeded: true
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  };
  static rowsTitle = {
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    email: "E-mail"
  };
  render() {
    const onError =
      this.props.navigation.getParam("orderReq").status != "ok" ? (
        <Text>
          <Text style={{ fontWeight: "bold" }}>Note: </Text>Seems that we don't
          have enough information to perform this order automatically.
        </Text>
      ) : null;
    let rows = [];
    for (let r of ["firstName", "lastName", "phone", "email"]) {
      rows.push(
        <Row
          key={r}
          value={this.state[r]}
          onChangeText={t => this.setState({ [r]: t })}
        >
          {ContactUs.rowsTitle[r]}
        </Row>
      );
    }
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <ModalLoading visible={this.state.isLoading} />
        <ScrollView>
          <View style={styles.container}>
            {onError}
            <View style={styles.row}>
              <Text>Please Leave your contact information below.</Text>
              <Text>We'll contact you soon</Text>
            </View>
            {rows}
          </View>
        </ScrollView>
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "darkgray"
  },
  row: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  }
});
