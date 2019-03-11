import React from 'react';
import Button from '../button';
import {StyleSheet, View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class ShippingItem extends React.Component {
  render(){
    return (
      <View style={[styles.item, this.props.style]}>
        <View style={styles.textView}><Text style={styles.text}>{this.props.title}</Text></View>
        <View style={styles.imageView}><Image style={styles.image} source={this.props.imgSource} /></View>
        <View style={styles.AmountView}><Text>{this.props.amount}</Text></View>
        <View style={styles.buttonContainer}>
          <Button style={{...styles.button, borderRightWidth:1}} onPress={() => {this.props.onPressMinus()}} title="-"/>
          <Button style={styles.button} onPress={() => {this.props.onPressPlus()}} title="+"/>
        </View>
      </View>
    );
  }
}
ShippingItem.propTypes = {
    style: PropTypes.object,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    imgSource: PropTypes.object.isRequired,
    onPressMinus: PropTypes.func.isRequired,
    onPressPlus: PropTypes.func.isRequired,
}
ShippingItem.defaultProps = {
  style:{}
}

const styles = StyleSheet.create({
  item: {
    flex:1,
    height: 150,
    alignItems: "center",
    margin:10,
    borderWidth: 1,
    borderColor: "darkgray"
  },
  textView:{ marginTop: 5 },
  text: { textAlign: "center" },
  image: {  width: 50, height: 50 },
  imageView: { marginBottom: 5 },
  AmountView: { flex: 1 },
  buttonContainer:{
    flex:1,
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    flex:1,
    margin:0,
    height:"100%",
    overflow: "hidden",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "darkgray",
    alignItems: "center",
    justifyContent: "center"
  }
});
