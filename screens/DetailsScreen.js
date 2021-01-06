import React from 'react'
import {View,Text,Image,TouchableOpacity,StyleSheet, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Stars from 'react-native-stars';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { AntDesign } from '@expo/vector-icons'; 
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();


export default class DetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }



    static navigationOptions = ({ navigation }) => {
        return {
          
          headerRight: (
            <TouchableOpacity onPress={navigation.getParam('logout')}>
                       <AntDesign name="close" size={25} color="#73788B"  />

            </TouchableOpacity>
          )
        };
      };

    _logout = () => {
        this.props.navigation.navigate('Vets');
      }
    
    componentDidMount = ()=> {
        this.props.navigation.setParams({ logout: this._logout });

        const { navigation } = this.props;  

        const   user_name = navigation.getParam('photoId','');
             


    };

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.header}>
                   <Text style={styles.headerTitle}> Cow to Shop details</Text>
                   <TouchableOpacity  style={styles.headerTitle} onPress={()=>this.props.navigation.navigate('Vets')}>
                   <AntDesign name="close" size={25} color="#73788B"  />

                   </TouchableOpacity>
                   </View>
    
<Swiper
       style={styles.wrapper}
            dotStyle={{
                backgroundColor:"#008000",
                borderColor:"#000",
                borderWidth:1,
                width:10,
                height:10,
                borderRadius:10,
            }}
            activeDotColor="#FFF"
            activeDotStyle={{
                borderColor:"#000",
                borderWidth:1,
                width:10,
                height:10,
                borderRadius:10,
            }}

            paginationStyle={{ position: "absolute", top: 210, bottom: undefined }}
           >
               <View style={styles.slide}>
                   <Image
                     source={require('../assets/tempImage3.png')}
                     style={{height:200,width:"100%",
                     }}
                    />

               </View>
               <View style={styles.slide}>
                   <Image
                     source={require('../assets/tempImage3.png')}
                     style={{height:200,width:"100%"}}
                    />

               </View>
               <View style={styles.slide}>
                   <Image
                     source={require('../assets/tempImage3.png')}
                     style={{height:200,width:"100%"}}
                    />

               </View>
            
            </Swiper>
           <View>
         
               </View> 
                
                   </View>);}}


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
    myStarStyle:{
        color:"#000",
        backgroundColor:'transparent',
        textShadowColor:"black",
        textShadowOffset:{width:1,height:1},
        textShadowRadius:2   
     },
     myEmptyStarStyle:{
         color:"white"
     },
     wrapper:{

        marginBottom:10
     },
     slide:{
        borderRadius:15,

         justifyContent:"center",
         alignItems:"center",
         backgroundColor:"#FFF"
     },
});


