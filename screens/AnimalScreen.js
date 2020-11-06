import React from "react";
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity,TextInput} from "react-native";

import {Ionicons} from "@expo/vector-icons";
import {f, auth, database, storage} from "../config/config.js"
import PhotoList from '../components/photoList.js'

import moment from "moment";
import {YellowBox} from 'react-native';
import _ from 'lodash';
import withUnmounted from '@ishawnwang/withunmounted'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};



export default class AnimalScreen extends React.Component {
   

constructor() {
    super();
    this.state = {
      query: null,
      dataSource: [],
      dataBackup: [],
    };
  }

  componentDidMount(){
    database.ref('users').on('value', (snapshot) =>{
      var data = []
      snapshot.forEach((child)=>{
       data.push({
        key: child.key,
        animaltype:child.val().animaltype,
        animalreference:child.val().animalreference,
     

        
      })
    })
   this.setState({
       dataBackup:data,
       dataSource: data
    
    })
  })
 }


    render() {

        return (

            <View style={styles.container}>
                 <View style={styles.header}>
           
         
 
         </View>
         <View style={{ flexDirection: "row", marginTop: 70 }}>
      
                        <Text style={styles.headerTitle}>Schedule</Text>
                        </View>
                        <TouchableOpacity  onPress={()=> this.props.navigation.navigate("healthReport")} style={{height:50,width:50, justifyContent:"center",alignItems:"center",marginStart:20}}>
                   <Ionicons   name="ios-add-circle" size={35} color="#00ff00" style={{marginLeft:10}} />
               </TouchableOpacity>

                   
                <PhotoList isUser={false} navigation={this.props.navigation}/>

              

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
        paddingTop: 64,
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
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
        ,marginStart:20
    },
    la: {
        marginHorizontal: 16
    },
    labseniItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
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
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },input: {
        height: 45,
        width: '90%',
        backgroundColor: '#eaeaea',
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
        
      }
});

