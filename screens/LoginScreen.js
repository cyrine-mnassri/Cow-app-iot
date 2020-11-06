import React from "react";
import {View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    LayoutAnimation,Button
} from "react-native";
// import * as firebase from 'firebase';
import {f, auth, database, storage} from "../config/config.js"
export default class LoginScreen extends React.Component {
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
    goToForgotPassword = () => this.props.navigation.navigate('forgot')
    loginn = async() => {
        var email = this.state.email;
        var password = this.state.password;
        var that = this;
        if(email != '' && password!=''){
            if(email === 'admin@gmail.com' && password ==='adminadmin'){
                try {
                    let user = await auth.signInWithEmailAndPassword(email,password);
            this.props.navigation.navigate("Admin");
          
                  
                }catch(error){
                    console.log(error);
                    alert(error);
                }
    
            }
   
            try {
            let user = await auth.signInWithEmailAndPassword(email,password);

        }catch(error){
            console.log(error);
            alert(error);
        }
        }else {
            alert('email or password is empty');

        }
    };
    // handleLogin = () => {
    //     const { email, password } = this.state;
    //
    //     firebase
    //         .auth()
    //         .signInWithEmailAndPassword(email, password)
    //         .catch(error => this.setState({ errorMessage: error.message }));
    // };
    render() {
        LayoutAnimation.easeInEaseOut();
        return (

            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
           

                <View style={styles.errorMessageee}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>


                <View style={styles.form}>
                    <View>
                    <Text style={styles.headerTitle}>Welcome to I-Cattle</Text>

                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input}
                                   editable={true}
                                   keyboardType={'email-address'}
                                   autoCapitalize="none" onChangeText={(text) => this.setState({ email:text})}
                                   value={this.state.email}></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ password:text })} value={this.state.password}
                        ></TextInput>
                    </View>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("forgot")}>
                    <Text style={{ color: "#414959", fontSize: 13, marginTop: 50,marginLeft: 200,fontWeight: "500", color: "#00ff00" }}>
                    Forgot Password?
                    </Text>
                    </TouchableOpacity>
                </View>
                

                
            



                <TouchableOpacity style={styles.button} onPress={()=> this.loginn()}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Login</Text>
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
        marginBottom:50
    },
    errorMessageee: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase",
       
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#00ff00",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    }


});


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
//
// export default class LoginScreen extends React.Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text>register Screen</Text>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center"
//     }
// });