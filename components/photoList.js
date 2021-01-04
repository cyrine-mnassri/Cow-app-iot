import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList,KeyboardAvoidingView,TextInput} from "react-native";
import {f, auth, database, storage} from "../config/config.js";
import { Feather } from '@expo/vector-icons';
import {FlatListSlider} from 'react-native-flatlist-slider';
import { AntDesign } from '@expo/vector-icons'; 

const images = [
    {
     image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    },
   {
     image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
   },
   ]

class PhotoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true,
            idididuser : f.auth().currentUser.uid,
            loggedin: false,
            comments_list: [],
            ok:''
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
          
          headerRight: (
            <TouchableHighlight onPress={navigation.getParam('logout')}>
                       <AntDesign name="close" size={25} color="#73788B"  />

            </TouchableHighlight>
          )
        };
      };
    
    _logout = () => {
        this.props.navigation.navigate('Animal');
      }
    componentDidMount = () => {
        this.props.navigation.setParams({ logout: this._logout });

        const {isUser, userId}= this.props;
        if (isUser == true) {
            this.loadFeed(userId);
        } else {
            this.loadFeed('')
        }

    };

    shop=(id)=>{
        //function to make two option alert
         alert(` ${id} `);
      
       this.props.navigation.replace('comments', {photoId: id})
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
                img: photoObjt.img,

                prix: photoObjt.prix,
                tel : data.tel,
                caption: photoObjt.caption,
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

        var loadRef = database.ref('shopsphotos');
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
          let ttest = database.ref('shopsphotos').child(id);
          ttest.remove();
          let ttest10=database.ref('users').child(id1).child('photos').child(id);
          ttest10.remove();
          alert('Bien Supprimer');
    
   
   } ;


      s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

    };


    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
    };

  
    postComment = (user_name) => {
        var comment = this.state.comment;
       // const { navigation } = this.props;  

       // const user_name = navigation.getParam('photoId','');
        if (comment != '') {
           
            var imageId = this.state.user_name;
            var userId = f.auth().currentUser.uid;
            var commentId = this.uniqueId();
            var dateTime = Date.now();
            var timestamp = Math.floor(dateTime / 1000);

            this.setState({
                comment : ''


            });

            var commentObj = {
                posted : timestamp,
                author: userId,
                comment : comment

            };
            //database.ref('/comments/'+commentId).set(commentObj);
            database.ref('/comments/'+user_name+'/'+commentId).set(commentObj);

          //  this.reloadCommentList();
          alert('ok')


        } 
    };



   achterproduit = (i1,i2,prix,text,url,tel) => {
   var moulaproduit = i1;
   var telmoulaproduit = tel;
   var iliyechri = f.auth().currentUser.uid;

   var prix = prix ;
   var textproduit = text;

   var image = url;
   var idduniquess = this.uniqueId();
     var uObj = {
                 moulaproduit: moulaproduit,
                 telmoulaproduit : telmoulaproduit,
                 iliyechri: iliyechri,
               
                 prix,prix,
                 textproduit:textproduit,
                 image:image};
                 database.ref('/achat/'+idduniquess).set(uObj); 
                 alert("achat bien enregister le prix est : "+prix+" DT + 8 DT Livrasion ");

   };


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
                        onRefresh={this.loadNew}
                        data={this.state.photo_feed}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.la}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item,index }) => (
                        <View style={styles.labseniItem}>
                              <Image
                                    source={
                                       item.authorAvatar
                                     ? { uri: item.authorAvatar }
                                  : require("../assets/tempAvatar.jpg")
                                                             }
                                    style={styles.avatar}
                                />
                        <View style={{ flex: 1 ,width:'100%'}}>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                         <View>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('userprofil',{userId: item.authorId })}   >
                         <Text style={styles.name}>{item.authorUsername}</Text>
                         </TouchableOpacity>
                          <Text style={styles.timestamp}>{item.posted}</Text>
                          </View>
                 
                           </View>
                             <Text style={styles.post1}>{item.prix} DT</Text>
                           <Text style={styles.post}>{item.caption}</Text>
                           <Image source={{uri:item.url}} style={styles.postImage} resizeMode="cover"/>
                         
                           <FlatListSlider

   data={[
    { image:item.url },
    { image:item.img },
]}
    
  />
  


                            {this.state.idididuser != item.authorId &&

                         <TouchableOpacity onPress={()=> this.achterproduit(item.authorId,item.id,item.prix,item.caption,item.url,item.tel)}
                                              style={{alignSelf:'center', width:170,marginHorizontal:'auto', backgroundColor:'#00ff00', borderRadius:5, paddingVertical:8, paddingHorizontal:10}}>
                                <Text style={{textAlign:'center', color:'white'}}>Acheter</Text>
                            </TouchableOpacity>
                             }
                           <View style={{ flexDirection: "row" ,marginTop:20}}>
                            <TouchableOpacity  onPress={()=> this.shop(item.id)}  >

                             <Ionicons name="ios-chatboxes" size={35} color="#73788B"/>


                           </TouchableOpacity>
                             {this.state.idididuser == item.authorId &&
                              <TouchableOpacity onPress={()=> this.del(item.authorId,item.id)}  >
                           <Ionicons name="ios-trash" size={35} color="#73788B" style={{marginLeft:40}} />
                            </TouchableOpacity>
                            }
                             </View>
                         
                             <View style={{ flexDirection: "row" ,marginTop:10,}}>

                             <TextInput
                           // editable={false}
                            placeholder={' Enter comment'}
                            onChangeText={(text) => this.setState({comment: text})}

                            style={{marginVertical:10,height:30, padding:5, borderColor:'grey', borderTopLeftRadius:5,borderBottomLeftRadius:5, backgroundColor:'#EFEFEF',width:'85%'}}
                        />
                        <TouchableOpacity onPress={() =>this.postComment(item.id)}
                                                    style={{marginVertical:10,height:30, padding:5, borderColor:'grey', backgroundColor:'#EFEFEF',borderTopRightRadius:5,borderBottomRightRadius:5,}}

                        >
                           <Feather name="send" size={20} color="#73788B" />
                        </TouchableOpacity>
                       </View>






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
        flexDirection: "row",
        marginVertical: 8
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
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },
    post1 : {
      fontSize: 20,
        color: "#FF0000",
     
   
        
	},
});

export default PhotoList;