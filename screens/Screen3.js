import React from "react";
import {TextInput, ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, Image,ScrollView,Button} from "react-native";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";
import {f, auth, database, storage} from "../config/config.js";
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 
import { Picker } from 'react-native'

import {Ionicons,Entypo,MaterialIcons ,AntDesign,FontAwesome} from "@expo/vector-icons";

export default class Screen3 extends React.Component {

    constructor(propos) {
        super(propos);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId(),
            imageSelected: false,
            uploading: false,
            nom: '',
           prenom: '',
           phone:'',
           email:'',
           adresse:'',
           specialite:'',
            progress: 0,
            visibility: false,
            DateDisplay:"",uri:''
              

        }

    }

    handleConfirm=(date)=>{
        this.setState({DateDisplay:date.toUTCString()});
      
      }
      onPressCancel=()=>{
        this.setState({visibility:false});
      
      }
      onPressButton=()=>{
        this.setState({visibility:true});
      
      }
      

      static navigationOptions = {  
        title: 'scan',  
        headerStyle: {  
            backgroundColor: '#f4511e',  
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    }; 


    _checkPermissions = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({camera: status});

        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({cameraRoll: statusRoll});


    };

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

    };


    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
    };

    findNewImage = async()=> {

        this._checkPermissions();

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            quality: 1
        });
        console.log(result);

        if (!result.cancelled) {
            console.log('upload image');
            // this.uploadImage(result.uri);
            this.setState({
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: result.uri
            })

        } else {
            console.log('cancel');
            this.setState({
                imageSelected: false
            })

        }

    };

    uploadPublish = () => {
        if (this.state.uploading == false) {
            if (this.state.caption != '') {
                this.uploadImage(this.state.uri);

            } else {
                alert('brabi da5el text');
            }
        } else {
            console.log('ignore button')
        }

    };

    uploadImage = async(uri)=> {
        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageId = this.state.imageId;

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];
        this.setState({
            currentFileType: ext,
            uploading: true
        });

        const response = await fetch(uri);
        const blob = await response.blob();

        var FilePath = imageId + '.' + that.state.currentFileType;

        var uploadTask = storage.ref('user/' + userid + '/img').child(FilePath).put(blob);
        uploadTask.on('state_changed', function (snapshot) {
            var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            console.log('Upload Is ' + progress + '% complete');
            that.setState({
                progress: progress,

            });
        }, function (error) {
            console.log('error with upload - ' + error);
        }, function () {
            that.setState({progress: 100});
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log(downloadURL);
                that.procesUpload(downloadURL);
            });

        });


     


    };

    procesUpload = (imageUrl) => {
        var imageId = this.state.imageId;

        var nom = this.state.nom;
        var prenom = this.state.prenom;
        var adresse = this.state.adresse;  
        var phone = this.state.phone; 
        var email = this.state.email;
        var specialite = this.state.specialite;
       



        var dateTime = Date.now();
        var timestamp = Math.floor(dateTime / 1000);


        var photoObj = {
         nom : nom,
         prenom :prenom,
         adresse: adresse,
         specialite :specialite, 
         phone :phone,
         email :email,
         posted: timestamp,
          url: imageUrl


        } ;

        //database.ref('/vets/').set(photoObj);
        database.ref('/vets/'+ imageId).set(photoObj);

        this.setState({
            uploading: false,
            imageSelected : false,
            nom : '',
            prenom :'',
            adresse: '',
            specialite :'', 
            phone :'',
            email :'',
            uri:''



        });


    };


    render() {
        const { navigation } = this.props;  
        const user_name = navigation.getParam('value','');  
        return (
            <View style={styles.container}>
                    <View style={{flex:1}}>

                    <View style={styles.header}>
                   
                            <Text style={styles.headerTitle}>I-Cattle</Text>
</View>


                        <View  style={{backgroundColor:"#F3F3F3"}}>

                        <ScrollView>
                        { this.state.uploading == true ? (
                                <View style={{marginTop:10}}>
                                    <Text>{this.state.progress} %</Text>
                                    {this.state.progress != 100 ? (
                                        <ActivityIndicator size="small" color="blue"></ActivityIndicator>
                                    ) : (
                                        <Text>Processing</Text>
                                    )}
                                </View>

                            ) : (
                                <View></View>
                            )}
 

                        



<TextInput
                                editable={true}
                                autoFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="nom"
                                style={{ marginVertical:10, height:30, padding: 5,borderRadius:3,backgroundColor:'white', color:'black'}}
                                
                                onChangeText={text => this.setState({ nom:text })}
                                value={this.state.text}
                            />
                  
                  <TextInput
                                editable={true}
                                autoFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="prennom"
                                style={{ marginVertical:10, height:30, padding: 5,borderRadius:3,backgroundColor:'white', color:'black'}}
                                
                                onChangeText={text => this.setState({ prenom:text })}
                                value={this.state.text}
                            />
                  



                  <TextInput
                                editable={true}
                                autoFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="phone"
                                style={{ marginVertical:10, height:30, padding: 5,borderRadius:3,backgroundColor:'white', color:'black'}}
                                
                                onChangeText={text => this.setState({ phone:text })}
                                value={this.state.text}
                            />
                  



                  <TextInput
                                editable={true}
                                autoFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="email"
                                style={{ marginVertical:10, height:30, padding: 5,borderRadius:3,backgroundColor:'white', color:'black'}}
                                
                                onChangeText={text => this.setState({ email:text })}
                                value={this.state.text}
                            />

<TextInput
                                editable={true}
                                autoFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="adresse"
                                style={{ marginVertical:10, height:30, padding: 5,borderRadius:3,backgroundColor:'white', color:'black'}}
                                
                                onChangeText={text => this.setState({ adresse:text })}
                                value={this.state.text}
                            />
                  
                  


                  <TextInput
                                editable={true}
                                autoFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="specialite"
                                style={{ marginVertical:10, height:30, padding: 5,borderRadius:3,backgroundColor:'white', color:'black'}}
                                
                                onChangeText={text => this.setState({ specialite:text })}
                                value={this.state.text}
                            />
                  














            <View style={{flex: 1,alignContent:'center',backgroundColor:'#DCDCDC',height:40,   alignItems:'center',
                   borderWidth:0.2,borderColor:'#000000',width:'100%' }}>



<TouchableOpacity onPress={()=> this.findNewImage()}  >
                            <Ionicons name="md-camera" size={40} color="#FFFFFF"></Ionicons>
                        </TouchableOpacity>

                        </View>






                        <TouchableOpacity onPress={()=> this.uploadPublish()}
                                              style={{alignSelf:'center',marginHorizontal:'auto', backgroundColor:"#00ff00", borderRadius:5, paddingVertical:10, paddingHorizontal:20,marginTop:10,width:'100%'}}>
                              

                                <Text style={{textAlign:'center', color:'white'}}>Save</Text>
                            </TouchableOpacity>
        <Image source={{uri : this.state.uri}}
                                   style={{marginTop:10,resizeMode:'cover', width:'100%',height:275}}/>
                    


                            

                           

                           
</ScrollView>

                        </View>

                    </View>

            


                   
                  
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:4,
    },
  
    header: {
        paddingTop:5,
        paddingBottom: 5,
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