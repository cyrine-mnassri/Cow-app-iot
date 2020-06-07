// App.js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons,Entypo,MaterialIcons ,AntDesign} from "@expo/vector-icons";
import { createDrawerNavigator } from "react-navigation-drawer";
import loadingscreens from "./screens/loadingscreens";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeAdminScreen from "./screens/HomeAdminScreen";
import DeleteUserScreen from "./screens/DeleteUserScreen";
import ProfileAdminScreen from "./screens/ProfileAdminScreen";
import HomeScreen from "./screens/HomeScreen";
import ShoppingScreen from "./screens/ShoppingScreen";
import Commentss from "./screens/Comments";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserProfil from "./screens/UserProfil";
import * as firebase from 'firebase';
import {decode, encode} from 'base-64'
import ReclamationScreen from './screens/ReclamationScreen';

if (!global.btoa) {
    global.btoa = encode
}

if (!global.atob) {
    global.atob = decode
}
// héthya firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC9FemRYyjg09dAZ2K6Qf0q_IoKDlLkcUw",
//     authDomain: "projetlabesni.firebaseapp.com",
//     databaseURL: "https://projetlabesni.firebaseio.com",
//     projectId: "projetlabesni",
//     storageBucket: "projetlabesni.appspot.com",
//     messagingSenderId: "680868658843",
//     appId: "1:680868658843:web:2b911e8ad58ed55fea103e",
//     measurementId: "G-248T43CJVX"
// };
// firebase.initializeApp(firebaseConfig);


const AppContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: HomeScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}/>
                    }
                },
                Message: {
                    screen: Commentss,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatboxes" size={24} color={tintColor}/>
                    }
                },
                Post: {
                    screen: PostScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => (
                            <Ionicons
                                name="ios-add-circle"
                                size={48}
                                color="#E9446A"
                                style={{
                                    shadowColor: "#E9446A",
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowRadius: 10,
                                    shadowOpacity: 0.3
                                }}
                            />
                        )
                    }
                },
                Notification: {
                    screen: NotificationScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-notifications" size={24} color={tintColor}/>
                    }
                },
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor}/>
                    }
                }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({navigation, defaultHandler}) => {
                        if (navigation.state.key === "Post") {
                            navigation.navigate("postModal");
                        } else {
                            defaultHandler();
                        }
                    }
                },
                tabBarOptions: {
                    activeTintColor: "#161F3D",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                }
            }
        ),
        postModal: {
            screen: PostScreen
        }
    },
    {
        mode: "modal",
        headerMode: "none",

    }
);

const AuthStack = createStackNavigator({
    Register: RegisterScreen,    
    Login: LoginScreen
    },
    {
        initialRouteName:"Login"
    }
);

const UsProfil =  createStackNavigator({
   userprofil:UserProfil


});



 


const Admin = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                HomeAdmin: {
                    screen: HomeAdminScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}/>
                    }
                },
              
                DeleteUser: {
                    screen: DeleteUserScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <AntDesign name="deleteuser" size={24} color={tintColor}/>
                      
                    }
                },
                
              
                Reclamation: {
                    screen: ReclamationScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <AntDesign name="solution1" size={24} color={tintColor}/>
                    }
                },
                Shopping: {
                    screen: ShoppingScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <MaterialIcons name="shopping-cart" size={24} color={tintColor}/>
                      
                    }
                },
                ProfileAdmin: {
                    screen: ProfileAdminScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-log-out" size={24} color={tintColor} />
                    }
                }
            },
            {
                defaultNavigationOptions: {
                 
                },
                tabBarOptions: {
                    activeTintColor: "#161F3D",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                }
            }
        ),
        postModal: {
            screen: HomeAdminScreen
        }
    },
    {
        mode: "modal",
        headerMode: "none",

    }
);












export default createAppContainer(
    createSwitchNavigator(
        {

            loading: loadingscreens,
            comments:Commentss,
            // loading: HomeScreen,
            App: AppContainer,
            Auth: AuthStack,
            Usp:UsProfil,
            Admin: Admin,
            
        },
        {
            initialRouteName: "loading"
        }
    )
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
