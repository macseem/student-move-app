import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
export default class Button extends React.Component{
  render(){
    let style = this.props.style;
    style.backgroundColor = this.props.active? "darkblue" : "white";
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <View>
          <Text style={{color: this.props.active?"white":"black"}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool
}
Button.defaultProps = {
  active: false,
  style:{
    overflow: "hidden",
    height: 50,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius:5,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  }
}
