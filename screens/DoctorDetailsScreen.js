import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, Alert,TouchableOpacity,StatusBar,TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';


export default class DoctorDetailsScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {
      
      dataSource: [],
      loaded: false,
      phoneNumber:""

     
    };
  }

    static navigationOptions = ({ navigation }) => {
        return {
          headerShown:false,
          headerRight: (
            <TouchableOpacity onPress={navigation.getParam('logout')}>
               <AntDesign name="close" size={25} color="#73788B"  />
            </TouchableOpacity>
          )
        };
      };

    _logout = () => {
        this.props.navigation.navigate('Vets');
      }
    


    componentDidMount = ()=> {
      
    

    };

  

    render() {
        return (
            <View style={styles.container}>
             <View style={styles.header}>
                    <Text style={styles.headerTitle}>Doctor Details</Text>
                    <TouchableOpacity  style={styles.headerTitle} onPress={()=>this.props.navigation.navigate('Vets')}>
                    <AntDesign name="close" size={25} color="#73788B"  />

                    </TouchableOpacity>
                    </View>
     






            </View>
        );
    }
}

const styles = StyleSheet.create({



  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
},
header: {
    paddingTop:40,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection:"row",
    justifyContent:"space-between",
    
},
headerTitle: {
    marginRight:20,
    marginLeft:20,
    fontSize: 15,
    fontWeight: "700"
},
});