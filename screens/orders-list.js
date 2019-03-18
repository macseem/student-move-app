import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";
import PropTypes from "prop-types";
import APIConnector from "../services/connector";
import { Button, ModalLoading, Pagination } from "../comp-bundle";

function Order(props) {
  const orderType = props.data.type === "shipping" ? "S" : "A";
  const created = new Date(props.data.created * 1000);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={orderStyles.row}>
        <View style={orderStyles.cell}>
          <Text>{props.data.id}</Text>
        </View>
        <View style={orderStyles.cell}>
          <Text>{orderType}</Text>
        </View>
        <View style={orderStyles.cell}>
          <Text>{props.data.email}</Text>
        </View>
        <View style={orderStyles.cell}>
          <Text>
            {created.getDate()} {created.getMonth()} {created.getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const orderStyles = StyleSheet.create({
  row: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "darkgray",
    borderBottomWidth: 1
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default class OrdersList extends React.Component {
  static propTypes = {
    APIConnector: PropTypes.instanceOf(APIConnector).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      offset: -2,
      limit: 2,
      count: 0,
      orders: [],
      isLoading: true
    };
    this.getOrders(0);
  }
  onPressOrder = order =>
    this.props.navigation.navigate("OrderDetails", {
      orderReq: order,
      isMenuButtonNeeded: true
    });
  getOrders(offset) {
    let countBuf;
    this.props.APIConnector.getOrders(offset, this.state.limit, () => {})
      .then(jsonOrders => {
        countBuf = jsonOrders.data.count;
        return jsonOrders;
      })
      .then(jsonOrders =>
        jsonOrders.data.orders.map(order => (
          <Order
            key={order.id}
            data={order}
            onPress={() => this.onPressOrder(order)}
          />
        ))
      )
      .then(orders =>
        this.setState({
          offset: offset,
          count: countBuf,
          orders: orders,
          isLoading: false
        })
      )
      .catch(error => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <ModalLoading visible={this.state.isLoading} />
        <ScrollView>
          <View style={orderStyles.row}>
            <View style={orderStyles.cell}>
              <Text>Id</Text>
            </View>
            <View style={orderStyles.cell}>
              <Text>Type</Text>
            </View>
            <View style={orderStyles.cell}>
              <Text>E-mail</Text>
            </View>
            <View style={orderStyles.cell}>
              <Text>Created At</Text>
            </View>
          </View>
          {this.state.orders}
        </ScrollView>
        <Pagination
          count={this.state.count}
          offset={this.state.offset}
          limit={this.state.limit}
          onPress={offset => this.getOrders(offset)}
        />
      </View>
    );
  }
}
