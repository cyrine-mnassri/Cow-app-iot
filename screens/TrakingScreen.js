import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, Alert,TouchableOpacity,StatusBar,TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import {FlatList} from 'react-native-gesture-handler';
import {f, auth, database, storage} from "../config/config.js"


export default class TrakingScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {

     
    };
  }


 
   
    render() {
        return (
            <View style={styles.container}>
<Text>

  traking
</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,

    }},

    
    

});