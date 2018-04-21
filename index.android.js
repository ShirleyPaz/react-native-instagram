/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList
} from 'react-native';
import Post from './src/components/Post'



export default class InstaluraMobile extends Component {

  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('http://instalura-api.herokuapp.com/api/public/fotos/rafael')
    //fetch('http://192.168.22.62:8080')
    .then(response => response.json())
    .then(json => 
      this.setState({
      fotos: json
    }))
  }

  render() {

    /* const fotos = [
      { id: 1, usuario: 'dani' },
      { id: 2, usuario: 'naomi' }
    ] */

    return (

      <FlatList
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>

          <Post foto={item}/>

        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
