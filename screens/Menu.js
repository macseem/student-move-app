import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from "../components/button"
import BackgroundWrapper from "../components/background-wrapper";

export default class Menu extends React.Component {
  static navigationOptions = {
      title: 'Welcome',
    };
  constructor(props){
    super(props);
    this.state = {
      loading:true
    }
  }
  render(){
    const {navigate} = this.props.navigation;
    return (
      <BackgroundWrapper
         source={require("../assets/menu-background.png")}
         style={{height:"100%", resize:"cover"}}
         >
        <View style={styles.menu}>
          <View style={{flex:1}}/>
          <View style={{flex:2}}>
            <Button title="Search Accommodation" onPress={() => {navigate("AccommodationSearch")}}/>
            <Button title="Order Shipping" onPress={() => {navigate("ShippingCalculator")}}/>
            <Button title="View Orders" onPress={() => {navigate("OrdersList")}}/>
          </View>
          <View style={{flex:1}}/>
        </View>
      </BackgroundWrapper>
    );
  }
}

const styles = StyleSheet.create({
  menu:{
    flex:1,
    alignItems: "center",
  }
});
