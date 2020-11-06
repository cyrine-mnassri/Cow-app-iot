import React from 'react';
import { StyleSheet, View, Text, TextInput,  Alert,TouchableOpacity,StatusBar } from 'react-native';

import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class Forgot extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            moveScreen: false,
            errorMessage: null
        };
    }
    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content"></StatusBar>

                <Text style={styles.headerTitle}>Fill your email and we will sent you a link to change your password </Text>

                <TextInput style={styles.text}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />


                

                
                <TouchableOpacity style={styles.button} onPress={()=> this.onResetPasswordPress}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Get your new password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center",marginTop: 12 }}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: "#414959", fontSize: 13}}>
                        Don't have an account  ? <Text style={{ fontWeight: "500", color: "#00ff00" }}>Register now</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1


    },
    greeting: {
        marginTop: -32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom:50,
      marginTop:60,
        marginHorizontal: 30
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#00ff00",
        borderRadius: 4,
        height: 52,
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