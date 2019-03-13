import React from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "../comp-bundle";
export default class ContactUs extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View>
          <Text>Seems that we don't have enough information. We'll contact you soon</Text>
          <Text>Please Leave your contact information below</Text>
        </View>
        <View>
          <Text>First Name</Text>
          <TextInput onChangeText={text => this.setState({firstName:text})} />
        </View>
        <View>
          <Text>Last Name</Text>
          <TextInput onChangeText={text => this.setState({lastName:text})} />
        </View>
        <View>
          <Text>Phone</Text>
          <TextInput onChangeText={text => this.setState({phone:text})} />
        </View>
        <View>
          <Text>E-mail</Text>
          <TextInput onChangeText={text => this.setState({email:text})} />
        </View>
        <Button title="Submit" />
        <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
      </View>
    );
  }
}
