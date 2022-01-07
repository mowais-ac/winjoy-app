import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'yellow',flex:1}}>
        <Text style={{color:'black'}}> AllCreatorsPage </Text>
      </View>
    );
  }
}
