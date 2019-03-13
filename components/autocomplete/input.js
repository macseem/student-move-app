import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, StyleSheet, TextInput, Text} from 'react-native';
import AutocompleteListItem from './list-item';

export default class AutotompleteInput extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    source: PropTypes.func.isRequired,
    sourceData: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    onSelect: PropTypes.func.isRequired,
    timeoutBeforeSearch: PropTypes.number
  }
  static defaultProps = {
    timeoutBeforeSearch: 400
  }
  constructor(props){
    super(props);
    this.state={
      inputValue: "",
      timerId: 0
    }
  }
  handleChangeText(text){
    this.setState({inputValue:text})
    if(text.length>2){
      this.state.timerId && clearTimeout(this.state.timerId)
      this.setState({timerId: setTimeout(() => this.props.source(text), this.props.timeoutBeforeSearch)})
    }
  }

  _onPressItem = (item) => {
    this.setState({inputValue:item.title});
    this.props.onSelect(item);
  };
  _renderItem = item => (<AutocompleteListItem key={item.key}
    itemData={item}
    onPressItem={(item) => this._onPressItem(item)}
  />);
  render(){
    let items = [];
    for (let itemData of this.props.sourceData) {
      items.push(this._renderItem(itemData));
    }
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    return (
        <View style={{flex:1}}>
          <Text style={styles.label}>{this.props.title}</Text>
          <TextInput
            onChangeText={text => this.handleChangeText(text)}
            style={styles.textInput}
            value={this.state.inputValue}
          />
          <ScrollView>
            {items}
          </ScrollView>
        </View>

    );
    //</TouchableWithoutFeedback>
  }
}
const styles = StyleSheet.create({
  label: {
    marginTop: 5,
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "darkgray"
  }
});
