import * as React from 'react';
import { Text, View, StyleSheet, Button ,TextInput,TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Ionicons,Entypo,MaterialIcons ,AntDesign,FontAwesome} from "@expo/vector-icons";

import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRoute } from '@react-navigation/native';
export default class ScanScreen1 extends React.Component {
  static navigationOptions = {
    headerShown: false
};

  constructor(props) {
    super(props);
  
  this.state = {
    hasCameraPermission: null,
    scanned: false,
    queryText: '',   query: ''
   
  }}
 
  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    
    const { navigate } = this.props.navigation;  

    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={
          styles.container
        }>
               <View style={styles.header}>
                    <TouchableOpacity   onPress={() => this.props.navigation.navigate('AddAnimal')} style={{marginRight:10,marginStart:5}}>
                            <Ionicons name="ios-close" size={30} color="#000000" ></Ionicons>
                        </TouchableOpacity>
                            <Text style={styles.headerTitle}>Add Animal</Text>
</View>
  
  

 <TextInput 
        onChangeText={this.handleBarCodeScanned} 
        value={this.state.queryText}

      />

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{height:"100%",width:"100%"}}
        />

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }
handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({ queryText: "COW"+data })
    this.props.navigation.navigate('edit', {  
      value: data
     
  })  

  };
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin:4
  },

  header: {
      paddingTop: 30,
      paddingBottom: 10,
      backgroundColor: "#FFF",
      borderBottomWidth: 1,
      borderBottomColor: "#EBECF4",
      shadowColor: "#454D65",
      shadowOffset: {height: 5},
      shadowRadius: 15,
      shadowOpacity: 0.2,
      zIndex: 10, flexDirection: 'row'
  },headerTitle: {
      fontSize: 20,
      fontWeight: "700"
  },
});