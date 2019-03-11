import React from 'react';
import {View, ActivityIndicator} from 'react-native';
export default class ShippingPrices extends React.Component {
  render(){
    return (<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <ActivityIndicator size="large" color="blue"/>
    </View>);
  }
}
