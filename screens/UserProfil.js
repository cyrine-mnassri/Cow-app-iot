
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, Text, StyleSheet, Button, Image, FlatList,TouchableOpacity} from "react-native";
import {f, auth, database, storage} from "../config/config.js"
import PhotoList from '../components/photoList.js'


export default class UserProfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }

    }

 
    checkParams = () => {
        var params = this.props.navigation.state.params;
        if (params) {
            if (params.userId) {
                this.setState({
                    userId: params.userId
                });
                this.fetchUserInfo(params.userId);
            }
        }


    };

    fetchUserInfo = (userId) => {
        // alert(userId);
        var that = this;
        database.ref('users').child(userId).once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();

            that.setState({username: data.username});
            that.setState({name: data.name});
            that.setState({avatar: data.avatar, loaded: true});
        }).catch(error => console.log(error));


    };

    componentDidMount = ()=> {
        this.checkParams();
        var that = this;
        f.auth().onAuthStateChanged(function (user) {

            userId:user.uid;

        })
    };

    render() {
        return (

            <View style={styles.container}>
                <View style={{flexDirection:'row', height: 30,paddingTop:20, backgroundColor:'white', borderColor:'lightgrey' ,borderBottomWidth:0.2,  alignItems: "center",
        justifyContent: "center"}}>
                    <TouchableOpacity

                        onPress={()=> this.props.navigation.navigate("Traking")}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Go Back</Text>
                    </TouchableOpacity>

                </View>
                {this.state.loaded == false ? (
                    <View>
                        <Text>Loading ....</Text>
                    </View>

                ) : (
                    <React.Fragment>
                        <View style={{ marginTop: 64, alignItems: "center" }}>
                            <View style={styles.avatarContainer}>

                                <Image
                                    source={
                                       this.state.avatar
                                     ? { uri: this.state.avatar }
                                  : require("../assets/tempAvatar.jpg")
                                                             }
                                    style={styles.avatar}
                                />
                            </View>
                            <Text style={styles.name}>{this.state.name}</Text>
                            <Text style={styles.name}>{this.state.username}</Text>

                        </View>

                        <Text style={styles.statAmount}></Text>

                        <Text style={styles.statAmount}></Text>
                        
                        <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>

                    </React.Fragment>)}

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        marginTop: 64,
        alignItems: "center"
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    },
    b1: {
        marginTop: 15
    }
});