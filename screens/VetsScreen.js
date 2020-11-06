import React from "react";
import {View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native";
import {f, auth, database, storage} from "../config/config.js"

class VetsScreen extends React.Component {


  

    render() {
        return (
            <Text style={{fontSize:20, fontWeight:'bold'}}>Vets</Text>

        );    
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});
export default VetsScreen;