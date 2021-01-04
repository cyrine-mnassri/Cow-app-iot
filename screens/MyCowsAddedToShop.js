import React ,{Component}from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList,KeyboardAvoidingView,TouchableHighlight,TextInput,Alert,Button,Pressable} from "react-native";
import {f, auth, database, storage} from "../config/config.js";
import { Feather } from '@expo/vector-icons';
import {FlatListSlider} from 'react-native-flatlist-slider';
import { AntDesign ,FontAwesome,EvilIcons} from '@expo/vector-icons'; 
import RBSheet from "react-native-raw-bottom-sheet";

import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  import {LogBox} from 'react-native';
  LogBox.ignoreAllLogs();
const images = [
    {
     image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
   {
     image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
   },
   ]

   export default class MyCowsAddedToShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          



        }
    }
   
    static navigationOptions = ({ navigation }) => {
        return {

            headerShown:false,
     
        };
      };
    
   
        


       
      

    goToComment=(id)=>{
        //function to make two option alert
       //  alert(` ${id} `);
      
       this.props.navigation.navigate('Comments', {photoId: id})
    };

    goToDetails=(id)=>{
        //function to make two option alert
       //  alert(` ${id} `);
      
       this.props.navigation.navigate('Details', {photoId: id})
    };


    checkTime = (s) => {
        if (s == 1) {
            return 'ago';
        } else {
            return 's ago';
        }

    };

    


  
     
 


    countComment=(id)=>{

        database.ref('comments').child(id).on('value', snapShot => {
            console.log(snapShot.numChildren());
            console.log(snapShot.val());
          //  alert(snapShot.numChildren());
  
          }) ;


      }






    

    render() {
        // LayoutAnimation.easeInEaseOut();

        return (

            <View style={styles.container}>
                  <View style={styles.header}>
                    <Text style={styles.headerTitle}>MY Cattles added To Shop </Text>
                    <TouchableOpacity  style={styles.headerTitle} onPress={()=>this.props.navigation.navigate('shops')}>
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
    button: {
      borderRadius: 8,
      padding: 6,
      height: 40,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,marginRight:10
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
    la: {
        marginHorizontal: 16
    },
    labseniItem: {
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 170,
        borderRadius: 20,
        marginVertical: 16
    },
    post1 : {
      fontSize: 20,
        color: "#FF0000",
     marginTop:20
   
    },
    post2 : {
        fontSize: 14,
          color: "#008000",
       marginTop:20,
 
          
      },
      post3 : {
        fontSize: 14,
          color: "#008000",
       marginTop:20,
    //   textDecorationLine: 'underline',
 
          
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#008000',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButton1: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
      },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
});

