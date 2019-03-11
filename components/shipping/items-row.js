import React from 'react';
import ShippingItem from './item';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export default function ItemsRow(props) {
  return (
    <View style={{flex:1, flexDirection: "row"}}>
        <ShippingItem
          imgSource={{uri:"https://hei.innovate360.co.uk/dist/img/box.png"}}
          title="Large Box"
          amount={props.amount.box}
          onPressMinus={()=>{props.handleMinus("box")}}
          onPressPlus={()=>{props.handlePlus("box")}}
        />
        <ShippingItem
          imgSource={{uri:"https://hei.innovate360.co.uk/dist/img/bike.png"}}
          title="Bike"
          amount={props.amount.bike}
          onPressMinus={()=>{props.handleMinus("bike")}}
          onPressPlus={()=>{props.handlePlus("bike")}}
        />

        <ShippingItem
          imgSource={{uri:"https://hei.innovate360.co.uk/dist/img/tv.png"}}
          title="TV"
          amount={props.amount.tv}
          onPressMinus={()=>{props.handleMinus("tv")}}
          onPressPlus={()=>{props.handlePlus("tv")}}
        />
    </View>
  );
}
ItemsRow.propTypes = {
  amount: PropTypes.shape({
    box: PropTypes.number.isRequired,
    bike: PropTypes.number.isRequired,
    tv: PropTypes.number.isRequired,
  }),
  handleMinus: PropTypes.func.isRequired,
  handlePlus: PropTypes.func.isRequired,
}
