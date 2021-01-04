
  import React from 'react'
  import {View,Text,Image,TouchableOpacity,StyleSheet, ImageBackground} from 'react-native'
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
  import Stars from 'react-native-stars';
  import { ScrollView } from 'react-native-gesture-handler';
  import Swiper from 'react-native-swiper';
  import { AntDesign } from '@expo/vector-icons'; 
  
  
  
  export default class HealthReport extends React.Component {
  
      constructor(props) {
          super(props);
          this.state = {
             
          };
      }
  
  
  
      static navigationOptions = ({ navigation }) => {
          return {
            headerShown:false,
            headerRight: (
              <TouchableOpacity onPress={navigation.getParam('logout')}>
                         <AntDesign name="close" size={25} color="#73788B"  />
  
              </TouchableOpacity>
            )
          };
        };
  
      _logout = () => {
          this.props.navigation.navigate('Animal');
        }
      
  
  
      componentDidMount = ()=> {
          this.props.navigation.setParams({ logout: this._logout });
  
          const { navigation } = this.props;  
  
          const   idphoto = navigation.getParam('id');
          const   reference = navigation.getParam('reference');

  
  
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
<Text>{idphoto}</Text>
<Text>{reference}</Text>

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
  
  
  