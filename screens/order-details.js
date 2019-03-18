import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Button } from "../comp-bundle";
import { StackActions, NavigationActions } from "react-navigation";
function Row({ title, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
export default class OrderDetails extends React.Component {
  goToMenu = () => {
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [NavigationActions.navigate({ routeName: "Menu" })]
    });
    this.props.navigation.dispatch(resetAction);
  };
  render() {
    const orderReq = this.props.navigation.getParam("orderReq");
    const button = this.props.navigation.getParam("isMenuButtonNeeded") ? (
      <Button title="Cool" onPress={this.goToMenu} />
    ) : null;
    let details;
    if (orderReq.type === "shipping") {
      dData = orderReq.details.shipping;
      if (dData.chozenRate) {
        details = (
          <View>
            <Text>Product: {dData.chozenRate.product.title}</Text>
            <Text>Description: {dData.chozenRate.product.description}</Text>
          </View>
        );
      } else if (dData.description != "") {
        details = <Text>We will perform this order manually</Text>;
      }
    } else {
      details = <View />;
    }
    const orderTypeRowValue =
      orderReq.type === "shipping" ? "Shipping" : "Book Accommodation";
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <ScrollView>
          <View style={styles.container}>
            <Text>Order №{orderReq.id}</Text>
            <Row title="Order Type:" value={orderTypeRowValue} />
            {details}
            <Text style={styles.title}>Contacts:</Text>
            <Row title="First Name:" value={orderReq.firstName} />
            <Row title="Last Name:" value={orderReq.lastName} />
            <Row title="Phone:" value={orderReq.phone} />
            <Row title="E-mail:" value={orderReq.email} />
          </View>
        </ScrollView>
        {button}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "darkgray"
  },
  title: {
    fontWeight: "bold",
    textAlign: "left",
    width: "50%"
  },
  value: {
    width: "50%",
    textAlign: "right"
  }
});
