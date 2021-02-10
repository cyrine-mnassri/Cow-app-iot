
  import React from 'react'
  import {View,Text,Image,TouchableOpacity,StyleSheet, ImageBackground} from 'react-native'
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
  import Stars from 'react-native-stars';
  import { ScrollView } from 'react-native-gesture-handler';
  import Swiper from 'react-native-swiper';
  import { AntDesign } from '@expo/vector-icons'; 
  import {LogBox} from 'react-native';
  import {f, auth, database, storage} from "../config/config.js"
  import { Ionicons,FontAwesome5 } from "@expo/vector-icons";

  LogBox.ignoreAllLogs();
  
  
  export default class HealthReport extends React.Component {
  
      constructor(props) {
          super(props);
          this.state = {
            loaded: false

          };
      }
  
  
  
      static navigationOptions = ({ navigation }) => {
          return {
            headerShown:false,
           
          };
        };
     
      
      componentDidMount = ()=> {
  
          const { navigation } = this.props;  
  
          const   idphoto = navigation.getParam('id');
          const   reference = navigation.getParam('reference');
          var that = this;

  
          database.ref('sensors').child(reference).once('value').then(function (snapshot) {
       
            that.setState({
              latestTemperature: snapshot.val().latestTemperature,

            })
        });
   






  
  
      };
  
      render(){

        const { navigation } = this.props;  
        const   idphoto = navigation.getParam('id');
        const   reference = navigation.getParam('reference');
          return(
              <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Health report</Text>
                    <TouchableOpacity  style={styles.headerTitle} onPress={()=>this.props.navigation.navigate('Animal')}>
                    <AntDesign name="close" size={25} color="#73788B"  />
                    </TouchableOpacity>
                    </View>       
<View>

{ 
              (this.state.latestTemperature)?  // if has image

               <View style={{ marginTop:100,marginLeft:30,height:200,backgroundColor:"#000",width:250,justifyContent:"center",alignItems:"center",borderRadius:8}}>
                   <FontAwesome5  style={{marginBottom:20}} name="temperature-low" size={30} color={'#FFFFFF'} />
                    <Text style={{color:"#FFFFFF",marginBottom:20}}>Your cattle temperature is very good</Text>

               <Text style={{color:"#FFFFFF"}}>{this.state.latestTemperature}°C</Text>

               </View>
               :
               <View >

               </View>
             }
{ 
              37<+(this.state.latestTemperature)>39?  // if has image
               <View style={{height:30,backgroundColor:"#00ff00",width:70,justifyContent:"center",alignItems:"center",borderRadius:14}}>
                              <Text style={{color:"#FFFFFF"}}>Your cattle temperature is very good</Text>

               <Text style={{color:"#FFFFFF"}}>{this.state.latestTemperature}</Text>




               </View>
               :
               <View >

               </View>
             }

{ 
              +(this.state.latestTemperature)>42?  // if has image
               <View style={{height:30,backgroundColor:"#FF4500",width:70,justifyContent:"center",alignItems:"center",borderRadius:14}}>
               <Text style={{color:"#FFFFFF"}}>{this.state.latestTemperature}</Text>
               </View>
               :
               <View >

               </View>
             }




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



  });
  
  
  