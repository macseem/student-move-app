import React from 'react';
import {ImageBackground} from 'react-native';

export default class BackgroundWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state={loading:true};
  }
  render(){
    let comp = this.state.loading? null : this.props.children;
    return (
      <ImageBackground {...this.props}
        onLoadStart={(e) => this.setState({loading: true})}
        onLoadEnd={() => this.setState({loading:false})}
      >
        {comp}
      </ImageBackground>
    );
  }
}
