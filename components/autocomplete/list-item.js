import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text} from 'react-native';

export default class AutocompleteListItem extends React.PureComponent {
  static propTypes = {
    onPressItem: PropTypes.func.isRequired,
    itemData: PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  }
  render() {
    const backgroundColor = this.props.selected ? 'lightgray' : 'white';
    return (
      <TouchableOpacity style={{padding:5}} onPress={() => this.props.onPressItem(this.props.itemData)}>
        <View>
          <Text style={{backgroundColor: backgroundColor}}>{this.props.itemData.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
