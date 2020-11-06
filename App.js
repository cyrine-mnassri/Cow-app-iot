// App.js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons,Entypo,MaterialIcons ,AntDesign} from "@expo/vector-icons";
import { createDrawerNavigator } from "react-navigation-drawer";
import loadingscreens from "./screens/loadingscreens";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Forgot from './screens/Forgot';


import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from './screens/Screen4';
import ProfileAdminScreen from "./screens/ProfileAdminScreen";


import AnimalScreen from "./screens/AnimalScreen";
import EditScreen from "./screens/EditScreen";
import HealthReport from "./screens/HealthReport";

import VetsScreen from "./screens/VetsScreen";
import AddAnimalScreen from "./screens/AddAnimalScreen";
import TrakingScreen from "./screens/TrakingScreen";
import ProfileScreen from "./screens/ProfileScreen";

import {decode, encode} from 'base-64'
import { FontAwesome5 } from '@expo/vector-icons'; 
if (!global.btoa) {
    global.btoa = encode
}

if (!global.atob) {
    global.atob = decode
}


const AppContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Animal: {
                    screen: AnimalScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}/>
                    }
                },
                Vets: {
                    screen: VetsScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <FontAwesome5 name="clinic-medical" size={24} color={tintColor}/>
                    }
                },
                
                AddAnimal: {
                    screen: AddAnimalScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => (
                            <Ionicons
                                name="ios-add-circle"
                                size={48}
                                color="#00ff00"
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
                Traking: {
                    screen: TrakingScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Entypo name="location"  size={24} color={tintColor}/>
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
                        if (navigation.state.key === "AddAnimal") {
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
            screen: AddAnimalScreen
        }
    },
    {
        mode: "modal",
        headerMode: "none",

    }
);

const AuthStack = createStackNavigator({
    Register: RegisterScreen,    
    Login: LoginScreen,
    forgot:Forgot,
	onboardingScreen:OnboardingScreen

    },
    {
        initialRouteName:"onboardingScreen"
    }
);


const Edit =  createStackNavigator({
    edit:EditScreen,
 
 
 });
 

const report =  createStackNavigator({
   healthReport :HealthReport
 
 
 });

 


const Admin = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Screen1: {
                    screen: Screen1,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}/>
                    }
                },
              
                Screen2: {
                    screen: Screen2,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <AntDesign name="deleteuser" size={24} color={tintColor}/>
                      
                    }
                },
                
              
                Screen3: {
                    screen: Screen3,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <AntDesign name="solution1" size={24} color={tintColor}/>
                    }
                },
                Screen4: {
                    screen: Screen4,
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
                    activeTintColor: "#E9446A",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                }
            }
        ),
        postModal: {
            screen: ProfileAdminScreen
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
            // loading: HomeScreen,
            App: AppContainer,
            Auth: AuthStack,
            Admin: Admin,
            rep:report,
            edt:Edit
            
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
