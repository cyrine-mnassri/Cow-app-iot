import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "firebase";
import {f, auth, database, storage} from "../config/config.js"
export default class loadingscreens extends React.Component {


    constructor(props){
        super(props);
        // this.login();
    }

    componentDidMount() {
        f.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }
    render() {
        return (
            <View style={styles.container}>
    <Text> loading</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

