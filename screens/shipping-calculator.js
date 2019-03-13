import React from "react";
import { View, Text, Modal, ScrollView } from "react-native";
import PropTypes from "prop-types";
import {Button, HouseRow, ItemsRow, RowsSwitcher, AutocompleteInput, Error} from "../comp-bundle";
import uuidv4 from "uuid/v4";
import Config from "../config.json";
import ModalLoading from "../components/modal-loading";

export default class ShippingCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessiontoken: uuidv4(),
      amount: {
        box: 0,
        bike: 0,
        tv: 0
      },
      activeHouse: 0,
      activeRow: "house",
      from: {
        sourceData: [],
        selected: null
      },
      to: {
        sourceData: [],
        selected: null
      },
      isLoading: false,
      error: ""
    };
  }
  handlePlus(type) {
    amount = this.state.amount;
    amount[type]++;
    this.setState({ amount: amount });
  }

  handleMinus(type) {
    amount = this.state.amount;
    amount[type] = Math.max(amount[type] - 1, 0);
    this.setState({ amount: amount });
  }
  handleRoomPress(number) {
    this.setState({ activeHouse: number });
  }
  getPrices() {
    request = {
      from: this.state.from.selected.key,
      to: this.state.to.selected.key
    };
    if (this.state.activeRow === "house") {
      request.house_rooms_amount = this.state.activeHouse;
    } else {
      request.items_amount = this.state.amount;
    }
    (async () => {
      fetch(Config.APIURL + "/shipping/prices", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })
        .then(response => response.json())
        .then(jsonResponse => {
          this.setState({ isLoading: false });
          if(jsonResponse.hasOwnProperty("error")){
            this.setState({error: jsonResponse.error.message})
          } else {
            this.props.navigation.navigate("ShippingPrices", jsonResponse);
          }
        })
        .catch(error => {
          this.setState({ isLoading: false });
          console.error(error);
        });
    })();
    this.setState({ isLoading: true });
  }
  findAddress(text, sourceType) {
    let encodedText = encodeURIComponent(text);
    let url =
      Config.APIURL +
      "/places?input=" +
      encodedText +
      "&type=address&sessiontoken=" +
      this.state.sessiontoken;
    return fetch(url)
      .then(response => response.json())
      .then(responseJSON => {
        if (
          typeof responseJSON.predictions === "object" &&
          Array.isArray(responseJSON.predictions)
        ) {
          let sourceData = responseJSON.predictions.map(place => {
            return {
              key: place.place_id,
              title:
                place.structured_formatting.main_text +
                ", " +
                place.structured_formatting.secondary_text
            };
          });
          this.setState({
            [sourceType]: {
              sourceData: sourceData,
              selected: null
            }
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  selectAddress(selected, sourceType) {
    this.setState({
      [sourceType]: {
        selected: selected,
        sourceData: []
      }
    });
  }
  render() {
    let rows = {
      house: (
        <HouseRow
          onPress={number => {
            this.handleRoomPress(number);
          }}
          activeHouse={this.state.activeHouse}
        />
      ),
      items: (
        <ItemsRow
          amount={this.state.amount}
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
      <ScrollView style={{ flex: 1 }}>
        <ModalLoading visible={this.state.isLoading} />
        <Error value={this.state.error} />
        <View style={{ flex: 2, borderWidth: 1, borderColor: "black" }}>
          <View style={{ flex: 1, margin: 5 }}>
            <AutocompleteInput
              source={text => this.findAddress(text, "from")}
              sourceData={this.state.from.sourceData}
              onSelect={item => this.selectAddress(item, "from")}
              title="From"
            />
          </View>
          <View style={{ flex: 1, margin: 5 }}>
            <AutocompleteInput
              source={text => this.findAddress(text, "to")}
              sourceData={this.state.to.sourceData}
              onSelect={item => this.selectAddress(item, "to")}
              title="To"
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <RowsSwitcher
            activeTab={this.state.activeRow}
            onPress={type => {
              this.setState({ activeRow: type });
            }}
          />
        </View>
        <View
          style={{
            flex: 3
          }}
        >
          {rows[this.state.activeRow]}
        </View>
        <View style={{ flex: 2, borderWidth: 1, borderColor: "black" }}>
          <Button
            title="Get Prices"
            onPress={() => {
              this.getPrices();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

/*
{
  "status": "success",
  "description": null,
  "items": [
    {
      "id": 198,
      "type": "house",
      "description": "1 Bedroom House",
      "icon": "https:\/\/hei.innovate360.co.uk\/dist\/img\/house.png"
    },
    {
      "id": 199,
      "type": "house",
      "description": "2 Bedroom House",
      "icon": "https:\/\/hei.innovate360.co.uk\/dist\/img\/house.png"
    },
    {
      "id": 200,
      "type": "house",
      "description": "3 Bedroom House",
      "icon": "https:\/\/hei.innovate360.co.uk\/dist\/img\/house.png"
    },
    {
      "id": 197,
      "type": "none",
      "description": "Bike",
      "icon": "https:\/\/hei.innovate360.co.uk\/dist\/img\/bike.png"
    },
    {
      "id": 196,
      "type": "none",
      "description": "Large Box",
      "icon": "https:\/\/hei.innovate360.co.uk\/dist\/img\/box.png"
    },
    {
      "id": 37,
      "type": "bedroom ",
      "description": "TV",
      "icon": "https:\/\/hei.innovate360.co.uk\/dist\/img\/tv.png"
    }
  ],
  "units": [
    {
      "from_unit": "cbm",
      "name": "Cbm"
    },
    {
      "from_unit": "cuft",
      "name": "Cuft"
    },
    {
      "from_unit": "ibs",
      "name": "Lbs"
    },
    {
      "from_unit": "kg",
      "name": "Kg"
    },
    {
      "from_unit": "km",
      "name": "Km"
    }
  ]
}
*/
