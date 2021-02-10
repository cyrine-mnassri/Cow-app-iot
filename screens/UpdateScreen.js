import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, Alert,TouchableOpacity,StatusBar,TouchableHighlight,Switch } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {f, auth, database, storage} from "../config/config.js"

import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class UpdateScreen extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          switchValue: false,

        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
          
          headerRight: (
            <TouchableOpacity onPress={navigation.getParam('logout')}>
                       <AntDesign name="close" size={25} color="#73788B"  />

            </TouchableOpacity>
          )
        };
      };

    _logout = () => {
        this.props.navigation.navigate('shops');
      }
    
      toggleSwitch = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value });
        //state changes according to switch
        //which will result in re-render the text
      };


    componentDidMount = ()=> {
        this.props.navigation.setParams({ logout: this._logout });

        const { navigation } = this.props;  

        const   user_name = navigation.getParam('photoId','');



      
  
          database.ref('shopsphotos').child(user_name).on('value', (snapshot) =>{
      
         this.setState({ 
          
          prix :snapshot.val().prix,
          switchValue: snapshot.val().switchValue,
       
  
          })
        })
   
  
  




  
    };

  

    render() {
      const { navigation } = this.props;  

      const   user_name = navigation.getParam('photoId','');
        return (
            <View style={styles.container}>
   <Switch
                      onValueChange={this.toggleSwitch}
                     value={this.state.switchValue}
                        />    
           
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

   
    headerTitle: {
        fontWeight: 'Bold',
        fontSize: 20,
        fontWeight: "500",
        marginBottom:20,
      marginTop:10,
        marginHorizontal: 30

    },

});