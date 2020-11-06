import React from "react";
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import UserPermissions from "../utilies/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";
import {f, auth, database, storage} from "../config/config.js"


export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username:"",
            email: "",
            password: "",
            moveScreen: false,
            errorMessage: null,
            avatar: null
        };
    }

 

    creeateUserObj = (userObj, email,username,name)=> {
        var uObj = {
            name: name,
            username: username,
            avatar: 'http://www.gravatar.com/avatar',
            email: email
        };
        database.ref('users').child(userObj.uid).set(uObj);

    };


    handleSignUp = async() => {
        var email = this.state.email;
        var username = this.state.username;
        var name = this.state.name;
        var password = this.state.password;
        if (email != '' && password != '') {


            try {
                let user = await auth.createUserWithEmailAndPassword(email, password)
                    .then((userObj) => this.creeateUserObj(userObj.user, email,username,name))
                    .catch((error) => alert(error));

            } catch (error) {
                console.log(error);
                alert(error);
            }
        } else {
            alert('email or password is empty');

        }
        // Fire.shared.createUser(this.state.user);
    };

    handlePickAvatar = async() => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({...this.state.avatar, avatar: result.uri});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                

                <View style={{ position: "absolute", top: 24, alignItems: "center", width: "100%" }}>

                   
                </View>
                <Text style={styles.greeting}>{`Let's join our community`}</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ name:text })} value={this.state.name}
                            value={this.state.name}
                        ></TextInput>
                    </View>


                        <View>
                            <Text style={styles.inputTitle}>Username</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({ username:text })} value={this.state.username}
                                value={this.state.username}
                            ></TextInput>
                        </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ email:text })} value={this.state.email}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ password:text })} value={this.state.password}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        Already have an account? <Text style={{ fontWeight: "500", color:"#00ff00" }}>Login now</Text>
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
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessageee: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    form: {
        marginTop: 90,
        marginBottom: 38,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
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
    },

    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    },

    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }


});


