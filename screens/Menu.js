import React from 'react';
import {StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity} from 'react-native';

function Button(props){
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class Menu extends React.Component {
  static navigationOptions = {
      title: 'Welcome',
    };

  render(){
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require("../assets/menu-background.jpg")} style={{height:"100%"}}>
        <View style={styles.menu}>
          <View style={{flex:1}}/>
          <View style={{flex:2}}>
            <Button title="Search Accommodation" onPress={() => {navigate("AccommodationSearch")}}/>
            <Button title="Order Shipping" onPress={() => {navigate("ShippingCalculator")}}/>
            <Button title="View Orders" onPress={() => {navigate("OrdersList")}}/>
          </View>
          <View style={{flex:1}}/>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  menu:{
    flex:1,
    alignItems: "center",
  },
  button: {
    overflow: "hidden",
    backgroundColor: "white",
    height: 50,
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius:5,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  }
});
