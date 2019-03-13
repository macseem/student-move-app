import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Menu from './screens/menu';
import AccommodationSearch from './screens/accommodation-search';
import ShippingCalculator from './screens/shipping-calculator';
import ShippingPrices from './screens/shipping-prices';
import OrdersList from './screens/orders-list';
import ContactUs from './screens/contact-us';

const MainNavigator = createStackNavigator({
  Menu: {screen: Menu},
  AccommodationSearch: {screen: AccommodationSearch},
  ShippingCalculator: {screen: ShippingCalculator},
  ShippingPrices: {screen: ShippingPrices},
  OrdersList: {screen: OrdersList},
  ContactUs: {screen: ContactUs}

});

const App = createAppContainer(MainNavigator);


export default App;
