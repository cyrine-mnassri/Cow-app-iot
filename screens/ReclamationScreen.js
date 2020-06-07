
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
import { TouchableOpacity,Alert , Linking, Platform,TouchableHighlight} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import {f, auth, database, storage} from "../config/config.js"
const {width, height} = Dimensions.get('window');
import call from 'react-native-phone-call';
export default class ReclamationScreen extends Component {
  
  constructor() {
    super();
    this.state = {
      query: null,
      dataSource: [],
      usersnames:[],
      loaded: false,
      isChange : false,
      phoneNumber:""

    };
  }

  


  componentDidMount(){
    
    
    database.ref('reclamations').on('value', (snapshot) =>{
      var data = []
      snapshot.forEach((child)=>{
       
        database.ref('users').child(child.key).child("name").on('value', snapshot => {
             data.push({
             namee:snapshot.val(),
             key: child.key,
             num:child.val().num,
             rec:child.val().rec,
         })
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
      //clicking out side of alert will not cancel
    );
  }

  del = () =>{
    database.ref('reclamations').remove();
   
    
} ;
  separator = () => {
    return (
      <View style={{height: 10, width: '100%', backgroundColor: '#e5e5e5'}} />
    );
  };
  call=(phone)=>{
    //const { phoneNumber } = this.state

    Linking.openURL(`tel:${phone}`)
    this.setState({phoneNumber:phone})
  }


  render() {
    console.disableYellowBox = true;
    return (
         
      <View style={styles.container}>
               <View style={styles.header}>
                   <Text style={styles.reclamation}> Complaints </Text>
                </View>
           
   
       <View style={{height: 10, width: '100%', backgroundColor: '#e5e5e5'}} />

        <FlatList
           data={this.state.dataSource}
          ItemSeparatorComponent={() => this.separator()}
          renderItem={({item, index}) => {
            return (
            <View style={styles.listItem}>
              
              <View style={{alignItems:"center",flex:1}}>
                  <Text style={styles.name}>{item.namee}</Text>
                  <Text>{item.rec}</Text>
               
             </View>

               <TouchableOpacity  onPress={()=> this.call(item.num)} style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                   <Text style={styles.call} >Call</Text>
               </TouchableOpacity>
           </View>
           
            );
          }}
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
  }  ,
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
  
name:{
  fontSize:17,
  fontWeight:'bold',
 
 
  marginBottom:7
},

reclamation:{
  fontSize:20,
   fontWeight:'bold',
 
},
  
 call:{
color:"green",
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
},

listItem:{
  margin:10,
  padding:10,
  backgroundColor:"#FFF",
  width:"90%",
  flex:1,
  alignSelf:"center",
  flexDirection:"row",
  borderRadius:5
},
  
});