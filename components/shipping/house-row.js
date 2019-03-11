import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import ShippingHouse from './house';

export default function HouseRow(props) {
  houses = [];
  for (let i=1; i<=3; i++) {
    houses.push(<ShippingHouse
      active={props.activeHouse == i}
      title={i+" Bedroom"}
      key={i}
      onPress={() => {props.onPress(i)}}
    />)
  }
  return (
    <View style={{flex:1, flexDirection: "row", justifyContent:"space-around"}}>
      {houses}
    </View>
  );
}

HouseRow.propTypes = {
  activeHouse: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
}
