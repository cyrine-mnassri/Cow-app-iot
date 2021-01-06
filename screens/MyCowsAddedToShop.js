import React ,{Component}from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList,KeyboardAvoidingView,TouchableHighlight,TextInput,Alert,Button,Pressable} from "react-native";
import {f, auth, database, storage} from "../config/config.js";
import { Feather } from '@expo/vector-icons';
import {FlatListSlider} from 'react-native-flatlist-slider';
import { AntDesign ,FontAwesome,EvilIcons} from '@expo/vector-icons'; 
import RBSheet from "react-native-raw-bottom-sheet";
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();




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
   

});

