import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Menu from './screens/Menu';
import AccommodationSearch from './screens/AccommodationSearch';
import ShippingCalculator from './screens/ShippingCalculator';
import OrdersList from './screens/OrdersList';

const MainNavigator = createStackNavigator({
  Menu: {screen: Menu},
  AccommodationSearch: {screen: AccommodationSearch},
  ShippingCalculator: {screen: ShippingCalculator},
  OrdersList: {screen: OrdersList}
});

const App = createAppContainer(MainNavigator);

export default App;
