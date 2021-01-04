import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, Alert,TouchableOpacity,StatusBar,TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';






export default class UpdateScreen extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
           
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
    


    componentDidMount = ()=> {
        this.props.navigation.setParams({ logout: this._logout });

        const { navigation } = this.props;  

        const   user_name = navigation.getParam('photoId','');
             


    };

  

    render() {
        return (
            <View style={styles.container}>
      <Text> hi</Text>
    
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

    
    greeting: {
        marginTop: -32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    headerTitle: {
        fontWeight: 'Bold',
        fontSize: 20,
        fontWeight: "500",
        marginBottom:20,
      marginTop:10,
        marginHorizontal: 30

    },
    button: {
        
        marginHorizontal: 30,
        backgroundColor: "#00ff00",
        height: 52,
        alignItems: "center",
        justifyContent: "center",borderRadius:8
    },
    input: {
        marginHorizontal: 30,
        backgroundColor: "#00ff00",
        borderRadius: 8,
        height: 52,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center"
      },

    text: {
        marginHorizontal: 30,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginBottom:30
    }
});