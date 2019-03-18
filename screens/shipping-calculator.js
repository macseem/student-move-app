import React from "react";
import { View, Text, Modal, ScrollView } from "react-native";
import PropTypes from "prop-types";
import APIConnector from "../services/connector";
import {
  Button,
  HouseRow,
  ItemsRow,
  RowsSwitcher,
  AutocompleteInput,
  Error,
  ModalLoading
} from "../comp-bundle";
import ShippingOrderReq from "../models/shipping-order";
import uuidv4 from "uuid/v4";

export default class ShippingCalculator extends React.Component {
  static propTypes = {
    APIConnector: PropTypes.instanceOf(APIConnector).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      request: {
        from: "",
        to: "",
        items_amount: {
          box: 0,
          bike: 0,
          tv: 0
        },
        house_rooms_amount: 0
      },
      sessiontoken: uuidv4(),
      activeRow: "house",
      sourceDataCollection: {
        from: [],
        to: []
      },
      isLoading: false,
      error: ""
    };
  }
  getPricesRequest() {
    request = {
      from: this.state.request.from,
      to: this.state.request.to
    };
    if (this.state.activeRow === "house") {
      request.house_rooms_amount = this.state.request.house_rooms_amount;
    } else {
      request.items_amount = this.state.request.items_amount;
    }
    return request;
  }
  handlePlus(type) {
    request = this.state.request;
    request.items_amount[type]++;
    this.setState({ request: request });
  }

  handleMinus(type) {
    request = this.state.request;
    request.items_amount[type] = Math.max(request.items_amount[type] - 1, 0);
    this.setState({ request: request });
  }
  handleRoomPress(number) {
    request = this.state.request;
    request.house_rooms_amount = number;
    this.setState({ request: request });
  }
  mapGetPricesResponseToOrderReq(jsonResponse) {
    orderReq = new ShippingOrderReq();
    orderReq.type = "shipping";
    orderReq.details.shipping.description = jsonResponse.data.description;
    orderReq.details.shipping.rates = jsonResponse.data.rates;
    orderReq.details.shipping.pricesRequest = this.getPricesRequest();
    return orderReq;
  }
  handleGetPricesResponse(jsonResponse) {
    this.setState({ isLoading: false });
    if (jsonResponse.hasOwnProperty("error")) {
      this.setState({ error: jsonResponse.error.message });
      return;
    }
    orderReq = this.mapGetPricesResponseToOrderReq(jsonResponse);
    if (
      !Array.isArray(orderReq.details.shipping.rates) ||
      orderReq.details.shipping.rates.length == 0
    ) {
      orderReq.status = "no_rates";
      this.props.navigation.navigate("ContactUs", {
        orderReq: orderReq
      });
      return null;
    }
    this.props.navigation.navigate("ShippingPrices", {
      orderReq: orderReq
    });
  }
  whenAddressFound(predictions, sourceType) {
    let sourceData = predictions.map(place => {
      return {
        key: place.place_id,
        title:
          place.structured_formatting.main_text +
          ", " +
          place.structured_formatting.secondary_text
      };
    });
    sourceDataCollection = this.state.sourceDataCollection;
    sourceDataCollection[sourceType] = sourceData;
    request = this.state.request;
    request[sourceType] = null;
    this.setState({
      sourceDatacollection: sourceDataCollection,
      request: request
    });
  }
  wnehAddressNotFound(error) {
    console.error(error);
  }
  selectAddress(selected, sourceType) {
    request = this.state.request;
    request[sourceType] = selected.key;
    sdc = this.state.sourceDataCollection;
    sdc[sourceType] = [];
    this.setState({
      request: request,
      sourceDataCollection: sdc
    });
  }
  handleGetPricesPress = () =>
    this.props.APIConnector.getPrices(this.getPricesRequest(), () =>
      this.setState({ isLoading: true })
    )
      .then(jsonResponse => this.handleGetPricesResponse(jsonResponse))
      .catch(error => {
        this.setState({ isLoading: false });
        console.error(error);
      });

  render() {
    let rows = {
      house: (
        <HouseRow
          onPress={number => {
            this.handleRoomPress(number);
          }}
          activeHouse={this.state.request.house_rooms_amount}
        />
      ),
      items: (
        <ItemsRow
          amount={this.state.request.items_amount}
          handleMinus={type => {
            this.handleMinus(type);
          }}
          handlePlus={type => {
            this.handlePlus(type);
          }}
        />
      )
    };
    return (
      <View style={{ height: "100%" }}>
        <ScrollView style={{ flex: 1 }}>
          <ModalLoading visible={this.state.isLoading} />
          <Error value={this.state.error} />

          <View style={{ flex: 1, margin: 5 }}>
            <AutocompleteInput
              source={text =>
                this.props.APIConnector.findAddress(
                  text,
                  this.state.sessiontoken,
                  predictions => this.whenAddressFound(predictions, "from"),
                  error => this.wnehAddressNotFound(error)
                )
              }
              sourceData={this.state.sourceDataCollection.from}
              onSelect={item => this.selectAddress(item, "from")}
              title="From"
            />
          </View>
          <View style={{ flex: 1, margin: 5 }}>
            <AutocompleteInput
              source={text =>
                this.props.APIConnector.findAddress(
                  text,
                  this.state.sessiontoken,
                  predictions => this.whenAddressFound(predictions, "to"),
                  error => this.wnehAddressNotFound(error)
                )
              }
              sourceData={this.state.sourceDataCollection.to}
              onSelect={item => this.selectAddress(item, "to")}
              title="To"
            />
          </View>

          <View style={{ flex: 1 }}>
            <RowsSwitcher
              activeTab={this.state.activeRow}
              onPress={type => {
                this.setState({ activeRow: type });
              }}
            />
          </View>

          {rows[this.state.activeRow]}
        </ScrollView>

        <Button title="Get Prices" onPress={this.handleGetPricesPress} />
      </View>
    );
  }
}
