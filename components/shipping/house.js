import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';

export default class ShippingHouse extends React.Component {
  render(){
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.houseCommon, this.props.active? styles.houseActive : styles.house]}>
          <View style={styles.imageView}>
            <Image
              source={{
                uri: this.props.active ?
                  "https://hei.innovate360.co.uk/dist/img/house_white.png" :
                  "https://hei.innovate360.co.uk/dist/img/house.png"
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.textView}>
            <Text style={this.props.active?styles.textActive:styles.text}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
ShippingHouse.propTypes = {
  active: PropTypes.bool.isRequired
};
ShippingHouse.defaultProps = {
  active: false
};

const styles=StyleSheet.create({
  houseCommon:{ borderWidth: 1, borderColor: "darkgray", borderRadius:5 },
  house: { backgroundColor: "white" },
  houseActive: {backgroundColor: "lightblue"} ,
  imageView: {},
  image:{ width: 100, height: 100 },
  textView:{},
  text:{textAlign:"center", color:"black"},
  textActive:{textAlign:"center", color:"white"}
});
