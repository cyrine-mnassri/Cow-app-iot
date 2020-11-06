import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native";
import {f, auth, database, storage} from "../config/config.js";

class PhotoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true,
            idididuser : f.auth().currentUser.uid
        }
    }

    componentDidMount = () => {

        const {isUser, userId}= this.props;
        if (isUser == true) {
            this.loadFeed(userId);
        } else {
            this.loadFeed('')
        }

    };

    checkTime = (s) => {
        if (s == 1) {
            return 'ago';
        } else {
            return 's ago';
        }

    };

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a ) / 1000);

        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' year ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 2592000);

        if (interval > 1) {
            return interval + ' month ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 86400);

        if (interval > 1) {
            return interval + ' day ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 3600);

        if (interval > 1) {
            return interval + ' hour ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 60);

        if (interval > 1) {
            return interval + ' minute ' + this.checkTime(interval);
        }

        return Math.floor(seconds) + ' second ' + this.checkTime(seconds);


    };

    addToFlatlist = (photo_feed, data, photo) => {
        var that = this;

        var photoObjt = data[photo];
        database.ref('users').child(photoObjt.author).once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            photo_feed.push({
                id: photo,
                url: photoObjt.url,
                
                animaltype : photoObjt.animaltype,
                animalreference : photoObjt.animalreference,
                animalweight: photoObjt.animalweight ,
                animalbirth : photoObjt.animalbirth, 
                animalbreed : photoObjt.animalbreed,
                animalhealth :photoObjt.animalhealth,
                posted: that.timeConverter(photoObjt.posted),
                authorUsername: data.username,
                authorAvatar: data.avatar,
                authorId: photoObjt.author

            });
            that.setState({
                refresh: false,
                loading: false


            });

        }).catch(error => console.log(error));


    };

    loadFeed = (userId = '') => {
        this.setState({
            refresh: true,
            photo_feed: []
        });
        var that = this;

        var loadRef = database.ref('photos');
        if(userId!=''){
            loadRef = database.ref('users').child(userId).child('photos');
        }
        loadRef.orderByChild('posted').once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            var photo_feed = that.state.photo_feed;
            for (var photo in data) {
                that.addToFlatlist(photo_feed, data, photo);
            }


        }).catch(error => console.log(error));


    };

    loadNew = () => {
        this.loadFeed();
    };

    del = (id1,id) =>{
          let ttest = database.ref('photos').child(id);
          ttest.remove();
          let ttest10=database.ref('users').child(id1).child('photos').child(id);
          ttest10.remove();
          alert('Bien Supprimer');
    
   
   } ;


    render() {
        // LayoutAnimation.easeInEaseOut();

        return (

            <View style={styles.container}>
                {this.state.loading == true ? (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>Loading ..</Text>
                    </View>

                ) : (

                    <FlatList
                        refreshing={this.state.refresh}
                        ItemSeparatorComponent={() => <Text>     </Text>}
                        onRefresh={this.loadNew}
                        data={this.state.photo_feed}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.la}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item,index }) => (
                        <View style={styles.labseniItem}>
                            
                        <View style={{ flex: 1 }}>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                         <View>
                         <Text style={styles.name}>{item.authorUsername}</Text>
                       
                          </View>
                 
                           </View>
                           <Image source={{uri:item.url}} style={styles.postImage} resizeMode="cover"/>
                           <Text style={styles.post1}>{item.animalreference}</Text>
                           <Text style={styles.post2}>{item.animalhealth}</Text>
                           <Text style={styles.timestamp}>{item.posted}</Text>

                           
                      
                             </View>
                              </View>

                    )}

                    />
                )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    header: {
        paddingTop: 64,
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
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    la: {
        marginHorizontal: 16
    },
    labseniItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "column",
        margin: 1, width:150,
        height: 250
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#000000",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#000000"
    }, post1: {
        marginTop: 16,
     
        color: "#000000",
        fontSize: 20,
        fontWeight: "500"
    },   post2: {
        marginTop: 16,
        fontSize: 14,
        color: "#000000",    backgroundColor: "#FFF",
    },
    postImage: {
        width: 145,
        height: 100,
        borderRadius: 5,
        marginRight:15

    }
});

export default PhotoList;