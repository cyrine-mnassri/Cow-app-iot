import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList,KeyboardAvoidingView,TextInput} from "react-native";
import {f, auth, database, storage} from "../config/config.js";

class ShopList extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
        loggedin: false,
        comments_list: [],
        refresh: false,


    }


}
static navigationOptions = {  
    headerShown: null
,
    headerStyle: {  
        backgroundColor: '#f4511e',  
    },  
    //headerTintColor: '#0ff',  
    headerTitleStyle: {  
        fontWeight: 'bold',  
    },  
}; 

checkParams = () => {
    //var params = this.props.navigation.state.params;
    //const { navigation } = this.props;  



};

addCommentToList = (comments_list, data, comment) => {
    var that = this;
    var commentObj = data[comment];
    database.ref('users').child(commentObj.author).once('value').then(function (snapshot) {

        const exists = ((snapshot).val() != null);
        if (exists) data = snapshot.val();
        comments_list.push({
            id: comment,
            comment: commentObj.comment,
            posted: that.timeConverter(commentObj.posted),
            author: data.username,
            authorId: commentObj.author
        });

        that.setState({
            refresh: false,
            loading: false
        });


    }).catch(error => console.log(error));


};

fetchComments = (photoId)=> {

    var that = this;
    const { navigation } = this.props;  

    const user_name = navigation.getParam('photoId','');
    photoId=user_name;
    database.ref('comments').child(photoId).orderByChild('posted').once('value').then(function (snapshot) {
        const exists = (snapshot.val() != null);
        if (exists) {
            data = snapshot.val();
            var comments_list = that.state.comments_list;
            for (var comment in data) {
                that.addCommentToList(comments_list, data, comment);
            }

        } else {
            that.setState({
                comments_list: []
            });
        }

    }).catch(error => console.log(error));


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

componentDidMount = ()=> {

  var that = this;
    const { navigation } = this.props;  

    const user_name = navigation.getParam('photoId','');
    //photoId=user_name;
    database.ref('comments').child(user_name).orderByChild('posted').once('value').then(function (snapshot) {
        const exists = (snapshot.val() != null);
        if (exists) {
            data = snapshot.val();
            var comments_list = that.state.comments_list;
            for (var comment in data) {
                that.addCommentToList(comments_list, data, comment);
            }

        } else {
            that.setState({
                comments_list: []
            });
        }

    }).catch(error => console.log(error));




};
postComment = () => {
    var comment = this.state.comment;
    const { navigation } = this.props;  

    const user_name = navigation.getParam('photoId','');
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

        this.reloadCommentList();
    } else {

        alert('please enter a comment 9bal il posting')
    }


};

reloadCommentList = () =>{
    const { navigation } = this.props;  

    const user_name = navigation.getParam('photoId','');
    this.setState({
        comments_list : []
    });
    this.fetchComments(user_name);

}

render() {

    const { navigation } = this.props;  

    const user_name = navigation.getParam('photoId','');
    return (
        <View style={styles.container}>
         
         <TouchableOpacity   onPress={() => this.props.navigation.navigate('Animal')} style={{marginRight:10,marginStart:5}}>
                            <Ionicons name="ios-close" size={30} color="#000000" ></Ionicons>
                        </TouchableOpacity>
            <FlatList
                   
 data={this.state.comments_list}
                    keyExtractor={(item,index) =>index.toString()}
                    style={{flex:1, backgroundColor:'#eee'}}
                    renderItem={({item, index}) =>{
                     return (



                    <View key={index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between', borderBottomWidth:1, borderColor:'grey'}}>

                    <View style={{padding:5,width: '100%',flexDirection:'row', justifyContent: 'space-between'}}>
                           <Text>{item.posted}</Text>
                           <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('Profile',{userId: item.authorId })}   >
                           <Text>{item.author}</Text>

                            </TouchableOpacity>
                         </View>
                         <View style={{padding:5}}>
                         <Text>{item.comment}</Text>
                        </View>
                    </View>

);

                     }

                      }
                />




        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
   backgroundColor: "#EBECF4"

}
});
export default ShopList;