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
import { AntDesign } from '@expo/vector-icons'; 
import SearchBar from 'react-native-search-bar';

import { TouchableOpacity,Alert } from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import {f, auth, database, storage} from "../config/config.js"
const {width, height} = Dimensions.get('window');

export default class HealthReport extends Component {
  constructor() {
    super();
    this.state = {
      query: null,
      dataSource: [],
      dataBackup: [],
    };
  }

  


  componentDidMount(){

    const userid=f.auth().currentUser.uid
    database.ref('users').child(userid).child('photos').on('value', (snapshot) =>{
      var data = []
      snapshot.forEach((child)=>{
       data.push({
        key: child.key,
        animalhealth:child.val().animalhealth,
        animalreference:child.val().animalreference,
        url:child.val().url,
       
        
      })
    })
   this.setState({
       dataBackup:data,
       dataSource: data
    
    })
  })
 }
 del = (id1) =>{
    let ttest = database.ref('photos');
    var key_to_delete = id1;
   var query = ttest.orderByChild("author").equalTo(key_to_delete);
    query.on('child_added', function(snapshot)
    {
      snapshot.ref.remove();
   });
    
    
} ;




















_twoOptionAlertHandler=(id)=>{
    //function to make two option alert
    Alert.alert(
      //title
      'Confirm',
      //body
      'Are you sure you want to delete this animal ?',
      [
        {text: 'Yes', onPress:()=> this.del(id)},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }

  filterItem = event => {
    var query = event.nativeEvent.text;
    this.setState({
      query: query,
    });
    if (query == '') {
      this.setState({
        dataSource: this.state.dataBackup,
      });
    } else {
      var data = this.state.dataBackup;
      query = query.toLowerCase();
      data = data.filter(l => l.name.toLowerCase().match(query));

      this.setState({
        dataSource: data,
      });
    }
  };

  separator = () => {
    return (
      <View style={{height: 10, width: '100%', backgroundColor: '#e5e5e5'}} />
    );
  };

  render() {
    console.disableYellowBox = true;
    return (
        
      <View style={styles.container}>


                <View style={{flexDirection:'row', height: 50,paddingTop:20, backgroundColor:'white', borderColor:'lightgrey' ,borderBottomWidth:0.2,  alignItems: "center",
        justifyContent: "center"}}>
                    <TouchableOpacity

                        onPress={()=> this.props.navigation.navigate("Animal")}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Go Back</Text>
                    </TouchableOpacity>

              
</View>
           

        <View style={{height: 10, width: '100%', backgroundColor: '#e5e5e5'}} />
       
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={() => this.separator()}
          renderItem={({item, index}) => {
            return (
            <View style={styles.listItem}>
                 <Image
                           source={
                           item.url
                            ? { uri: item.url }
                            : require("../assets/tempAvatar.jpg")
                             }
                             style={{width:80, height:80,borderRadius:5,marginLeft:10,margin:20}} 
                                />
              <View style={{alignItems:"center",flex:1}}>
                      <Text style={styles.name}>{item.animalreference}</Text>
                      <Text style={styles.name}>{item.animalhealth}</Text>
                   
                    
             </View>

               <TouchableOpacity  onPress={()=> this._twoOptionAlertHandler(item.key)} style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                   <Ionicons name="ios-trash" size={35} color="#73788B" style={{marginLeft:10}} />
               </TouchableOpacity>
               <TouchableOpacity  onPress={()=> this.props.navigation.navigate("edit")} style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                   <AntDesign name="edit" size={35} color="#73788B" style={{marginLeft:10}} />
               </TouchableOpacity>
           </View>
             

            );
          }}
        />
       







       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
 
    flex: 1,
    backgroundColor: "#EBECF4"
  },
 
headerTitle: {
    fontSize: 20,
    fontWeight: "500"
},
header: {
  height: 150,
  width: '100%',
  backgroundColor: '#fefefe',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
 
  borderBottomLeftRadius:20,
  borderBottomRightRadius:20,
  shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 10,
},
shadowOpacity: 0.51,
shadowRadius: 13.16,

elevation: 20,
},
find:{
  fontSize:20,
   fontWeight:'bold',
   
   marginBottom:15
},
name:{
  fontSize:17,
  fontWeight:'bold',
 
 
  marginBottom:7
},
input: {
  height: 45,
  width: '90%',
  backgroundColor: '#eaeaea',
  borderRadius: 20,
  padding: 5,
  paddingLeft: 10,
  
},
 

  
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"90%",
  
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },
  author: {
    fontSize: 16,
  },
});