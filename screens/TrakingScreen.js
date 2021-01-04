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
      
      dataSource: [],
      loaded: false,
      phoneNumber:""

     
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
        this.props.navigation.navigate('Vets');
      }
    
     user =f.auth().currentUser;
     // console.log("User:" + this.user.uid);

    componentDidMount = ()=> {
        this.props.navigation.setParams({ logout: this._logout });
        database.ref("chat/" + `*-${this.user.uid}`).on('value', (snapshot) =>{
          var data = []
          snapshot.forEach((child)=>{
           
                 data.push({
                  key: child.key,

                 


                  })
                  
                
        })
       this.setState({
           dataSource: data
        
        })
      })
             


    };
    generateChatId() {
      if (this.user.uid > uid) return `${this.user.uid}-${uid}`;
      else return `${uid}-${this.user.uid}`;
    }
  

    render() {
        return (
            <View style={styles.container}>
  
      <FlatList
                       data={this.state.dataSource}
                        keyExtractor={(item,index) =>index.toString()}
                        style={{flex:1, backgroundColor:'#fff'}}
                        renderItem={({item, index}) => (
                        <View key={index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between', borderBottomWidth:1, borderColor:'grey'}}>
                       <View style={{height: 10, width: '100%', backgroundColor: '#e5e5e5'}} />
                        <View style={{padding:5,width: '100%',flexDirection:'row', justifyContent: 'space-between'}}>
                        <Text>{item.key}   </Text>

                       
                           

                          
                             </View>
                          </View>
                       
                  
                       
                        )}
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