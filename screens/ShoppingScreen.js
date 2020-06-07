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
import { TouchableOpacity,Alert,TouchableHighlight } from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from "@expo/vector-icons";
import {f, auth, database, storage} from "../config/config.js"
const {width, height} = Dimensions.get('window');

export default class ShoppingScreen extends Component {
  inval = "";
  constructor() {
    super();
    this.state = {
      
      dataSource: [],
      loaded: false,
     
    };
  }


                   componentDidMount(){
                    database.ref('achat').on('value', (snapshot) =>{
                      var data = []
                      snapshot.forEach((child)=>{
                        var    moula=child.val().moulaproduit;
                        var    yechri=child.val().iliyechri;
                        database.ref('users').child(moula).child("name").on('value', snapshot => {
                          database.ref('users').child(yechri).child("name").on('value', snapshot1 => {    
                             data.push({
                              prix:child.val().prix,
                              image:child.val().image,
                              moulaproduit:snapshot.val(),
                              iliyechri:snapshot1.val(),
                              telmoulaproduit:child.val().telmoulaproduit,
                              })
                              
                             });
                            });
                    })
                   this.setState({
                       dataSource: data
                    
                    })
                  })
             
  }




 _twoOptionAlertHandler=()=>{
                    //function to make two option alert
                    Alert.alert(
                      //title
                      'Confirm',
                      //body
                      'You want to delete all the list?',
                      [
                        {text: 'Yes', onPress:()=> this.del()},
                        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
                      ],
                      { cancelable: false }
         );
   }


 del = () =>{
   database.ref('achat').remove();
   }







  separator = () => {
    return (
      <View style={{height: 10, width: '100%', backgroundColor: '#e5e5e5'}} />
    );
  };

  render() {
    console.disableYellowBox = true;
    return (
        
      <View style={styles.container}>
     <View style={styles.header}>
          <Text style={styles.shopping}> Shoppings </Text>
      </View>
        <FlatList
                       data={this.state.dataSource}
                       refreshing={this.state.refresh}
                        data={this.state.dataSource}
                        keyExtractor={(item,index) =>index.toString()}
                        style={{flex:1, backgroundColor:'#eee'}}
                        renderItem={({item, index}) => (
                        <View key={index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between', borderBottomWidth:1, borderColor:'grey'}}>
                       <View style={{height: 10, width: '100%', backgroundColor: '#e5e5e5'}} />
                        <View style={{padding:5,width: '100%',flexDirection:'row', justifyContent: 'space-between'}}>
                             
                        <Image
                           source={
                           item.image
                            ? { uri: item.image }
                            : require("../assets/tempAvatar.jpg")
                             }
                             style={{width:80, height:80,borderRadius:5,marginLeft:10,margin:10}} 
                                />
                                <View style={{padding:20,paddingRight:80,width: '80%',flexDirection:'row', justifyContent: 'space-between'}}>
                              <Text>This article was purchased by the customer {item.iliyechri} from the seller {item.moulaproduit} at this price {item.prix} Dt.</Text>
                              <View style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                              <MaterialIcons name="done" size={35} color="green" style={{marginLeft:15}} />
                              </View>
                             </View>
                          </View>
                            
                     </View>
                       
                        )}
                    />
          <View>
              <TouchableHighlight style={styles.addButton}
              underlayColor='#E9446A' onPress={()=>{this._twoOptionAlertHandler()}}>
              <Ionicons name="ios-trash" size={35} color="white"  />

              </TouchableHighlight>
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
  height: 60,
  width: '100%',
  backgroundColor: '#fefefe',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
 
  borderBottomLeftRadius:5,
  borderBottomRightRadius:5,
  shadowColor: "#000",

},
headerTitle: {
    fontSize: 20,
    fontWeight: "500"
},
shopping:{
  fontSize:20,
   fontWeight:'bold',
 
},
 
addButton: {
  backgroundColor: '#E9446A',
  borderColor: '#E9446A',
  borderWidth: 1,
  height: 80,
  width: 80,
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 20,
  right:20,
  shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 0
  }
}
 
 
  

  
  
});