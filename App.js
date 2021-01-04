// App.js
import React from 'react';
import {StyleSheet, Text, Button,View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons,Entypo,MaterialIcons ,AntDesign,Fontisto,MaterialCommunityIcons} from "@expo/vector-icons";
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
import ScanScreen from "./screens/ScanScreen";
import DetailsScreen from "./screens/DetailsScreen";

import {decode, encode} from 'base-64'
import { FontAwesome5 } from '@expo/vector-icons'; 
import ScanScreen1 from './screens/ScanScreen1';
import AddCattleToShopScreen from './screens/AddCattleToShopScreen';
import CommentsScreen from './screens/CommentsScreen';
import UserProfil from './screens/UserProfil';
import shops from './screens/shops';
import UpdateScreen from './screens/UpdateScreen';
import DoctorDetailsScreen from './screens/DoctorDetailsScreen';
import ChatScreen from './screens/ChatScreen';
import MyCowsAddedToShop from './screens/MyCowsAddedToShop';
import RegisterOptionScreen from './screens/RegisterOptionScreen';
import MychatsScreen from './screens/MychatsScreen';

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
                        tabBarLabel:'cows',  

                        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="cow" size={20} color={tintColor}/>
                    }
                },
                Vets: {
                    screen: VetsScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Fontisto name="doctor" size={20} color={tintColor}/>
                    }
                },
                
                shops: {
                    screen: shops,
                    navigationOptions: {
                        tabBarLabel:'Market',  

                        tabBarIcon: ({tintColor}) => <AntDesign name="shoppingcart"  size={20} color={tintColor}/>
                    }
                },
                Traking: {
                    screen: TrakingScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Entypo name="location"  size={20} color={tintColor}/>
                    }
                },
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={20} color={tintColor}/>
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
                    showLabel: true
                }
            }
        ),
        postModal: {
            screen: AnimalScreen
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
    onboardingScreen:OnboardingScreen,
    RegisterOption:RegisterOptionScreen
    

    },
    {
        initialRouteName:"onboardingScreen"
    }
);


const ed =  createStackNavigator({
    UpdateCattle:EditScreen,

 
 });
 const mychats =  createStackNavigator({
    Mychats:MychatsScreen,

 
 });

 const addToshop =  createStackNavigator({
    addshop:AddCattleToShopScreen,
   
 
 });


 const MyCowsAdded =  createStackNavigator({
    MyCowsShop:MyCowsAddedToShop,
   
 
 });





 const up =  createStackNavigator({
    UpdatePost :UpdateScreen
  
  
  });
 
const report =  createStackNavigator({
   healthReport :HealthReport
 
 
 });

 const ok = createStackNavigator({
    Comments: CommentsScreen,


    });
    const Dcdetails = createStackNavigator({
        DoctorDetails: DoctorDetailsScreen,
    
    
        });
  
 
 const Scan =  createStackNavigator({
    scan : ScanScreen,
    AddAnimalScreen:AddAnimalScreen

    
   
  });
  const Scan1 =  createStackNavigator({
    scan1 : ScanScreen1
    
    
   
  });

  const dt =  createStackNavigator({
    Details : DetailsScreen
    
    
   
  });
  const ch =  createStackNavigator({
    Chat : ChatScreen
    
    
   
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

const UsProfil =  createStackNavigator({
    userprofil:UserProfil
 
 
 });



export default createAppContainer(
    createSwitchNavigator(
        {

            loading: loadingscreens,
            // loading: HomeScreen,
            App: AppContainer,
            Auth: AuthStack,
            Admin: Admin,
            rep:report,
            scan:Scan,
            scan1:Scan1,
        //    sp:sp,
            Usp:UsProfil,
            ok:ok,
            addToshop:addToshop,
          //  AddAnimal:AddAnimal
            ed:ed,dt:dt,
up:up,Dcdetails:Dcdetails,ch:ch,
MyCowsAdded:MyCowsAdded,mychats:mychats
            
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
