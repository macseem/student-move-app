import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Menu from "./screens/menu";
import AccommodationSearch from "./screens/accommodation-search";
import ShippingCalculator from "./screens/shipping-calculator";
import ShippingPrices from "./screens/shipping-prices";
import OrdersList from "./screens/orders-list";
import OrderDetails from "./screens/order-details";
import ContactUs from "./screens/contact-us";
import APIConnector from "./services/connector";
import Config from "./config.json";

const connector = new APIConnector(Config.APIURL);
const MainNavigator = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({ title: `Menu` })
  },
  AccommodationSearch: {
    screen: props => <AccommodationSearch {...props} />,
    navigationOptions: ({ navigation }) => ({ title: `Accommodation Search` })
  },
  ShippingCalculator: {
    screen: props => <ShippingCalculator {...props} APIConnector={connector} />,
    navigationOptions: ({ navigation }) => ({ title: `Shipping Calculation` })
  },
  ShippingPrices: { screen: ShippingPrices },
  OrdersList: {
    screen: props => <OrdersList {...props} APIConnector={connector} />,
    navigationOptions: ({ navigation }) => ({ title: `OrdersList` })
  },
  ContactUs: {
    screen: props => <ContactUs {...props} APIConnector={connector} />,
    navigationOptions: ({ navigation }) => ({ title: `Contact Form` })
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: ({ navigation }) => ({ title: `Order Details` })
  }
});

export default createAppContainer(MainNavigator);
