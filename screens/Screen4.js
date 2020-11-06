import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Image,
  Dimensions,Button
} from 'react-native';
import SearchBar from 'react-native-search-bar';

import { TouchableOpacity,Alert } from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import {f, auth, database, storage} from "../config/config.js"
const {width, height} = Dimensions.get('window');

export default class Screen4 extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }

  

  render() {
    return (
      <Text style={{fontSize:20, fontWeight:'bold'}}>Screen4</Text>

     
    );
  }
}

const styles = StyleSheet.create({
  container: {
 
    flex: 1,
    backgroundColor: "#EBECF4"
  },
 

});