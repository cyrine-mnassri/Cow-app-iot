
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
  import { API_KEY } from '../utilies/WeatherApiKey';
import { weatherConditions } from '../utilies/WeatherConditions.js';
import Weather from '../components/Weather';

  LogBox.ignoreAllLogs();
  
  
  export default class HealthReport extends React.Component {
  
      constructor(props) {
          super(props);
          this.state = {
            loaded: false,
            isLoading: true,
            temperature: 0,
            humidity: 0,
            weatherCondition: null,

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
  
        navigator.geolocation.getCurrentPosition(
          position => {
            this.fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          error => {
            this.setState({
              error: 'Error Getting Weather Conditions'
            });
          }
        );
  



  
  
      };
   
      fetchWeather(lat = 25, lon = 25) {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(json => {
            this.setState({
              temperature: json.main.temp,
              humidity:json.main.humidity,
              weatherCondition: json.weather[0].main,
              isLoading: false
            });
          });
      }

      render(){
        const { isLoading } = this.state;

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
                    <View style={styles.header1}>
				{isLoading ? (
					<Text>Fetching The Weather</Text>
				) : (
          
					<Weather
						weather={this.state.weatherCondition}
            temperature={this.state.temperature}
            humidity={this.state.humidity}
            visibility={this.state.pressure }
					/>
				)}
		
</View>   
<View>

{ 
             +(this.state.latestTemperature)>40?  // if has image

               <View style={{ marginTop:100,marginLeft:30,height:200,backgroundColor:"red",width:250,justifyContent:"center",alignItems:"center",borderRadius:8}}>
                   <FontAwesome5  style={{marginBottom:10}} name="temperature-low" size={30} color={'#FFFFFF'} />
                   <Text style={{color:"#FFFFFF",fontWeight:"bold",fontSize:20,marginBottom:20 }}>{this.state.latestTemperature}°C</Text>

                    <Text style={{color:"#FFFFFF",marginBottom:20,marginLeft:30}}>The temperature of your cow is very high contact a doctor</Text>


               </View>
               :
               +(this.state.latestTemperature)>37?  
               <View style={{ marginTop:100,marginLeft:30,height:200,backgroundColor:"green",width:250,justifyContent:"center",alignItems:"center",borderRadius:8}}>
               <FontAwesome5  style={{marginBottom:10}} name="temperature-low" size={30} color={'#FFFFFF'} />
               <Text style={{color:"#FFFFFF",fontWeight:"bold",fontSize:20,marginBottom:20 }}>{this.state.latestTemperature}°C</Text>

                <Text style={{color:"#FFFFFF",marginBottom:20,marginLeft:30}}>Your cow's temperature is ideal, don't worry </Text>


           </View>
           :
           +(this.state.latestTemperature)>20?  
           <View style={{ marginTop:100,marginLeft:30,height:200,backgroundColor:"blue",width:250,justifyContent:"center",alignItems:"center",borderRadius:8}}>
           <FontAwesome5  style={{marginBottom:10}} name="temperature-low" size={30} color={'#FFFFFF'} />
           <Text style={{color:"#FFFFFF",fontWeight:"bold",fontSize:20,marginBottom:20 }}>{this.state.latestTemperature}°C</Text>
            <Text style={{color:"#FFFFFF",marginBottom:20,marginLeft:30}}>your cattle is cold </Text>


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
  header1: {
    paddingTop:30,
    paddingBottom: 30,
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
  
  
  