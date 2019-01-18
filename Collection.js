import React, { Component } from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';


class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }

    //Fetch data from offered api
    componentWillMount(){
        const url= "https://shopicruit.myshopify.com/admin/custom_collections.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6"
        fetch(url, {
          method: 'GET',
    
        })
        .then(response => {
          if (response.ok) {
    
              return response;
          }
          else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
          },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            this.setState( { data:response.custom_collections } )
        })
        .catch(error => {
          alert('Fetch data error: '+ error.message); })
      }

    //Initialize nav name
    static navigationOptions = {
        title: 'Collections'
    };

    render(){
        const { navigate } = this.props.navigation;
        
        renderMenuItem = ({item, index}) =>{
            return(
                <TouchableOpacity onPress={() => navigate('Product', { id: item.id, title:item.title, image: item.image})} >
                   <View style={styles.item} key={index} >
                        <Text style={styles.text} >{item.title}</Text>
                   </View>
                </TouchableOpacity>
            )
        }
    
        return (
            <FlatList
            data={this.state.data}
            renderItem={renderMenuItem}
            keyExtractor={(item, index) => index.toString()} 
            />
        );
    }
}
  
const styles = StyleSheet.create( {
    item:{
        flex:1,
        backgroundColor:"white",
        height:100,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#d6d7da',

    },
    text:{
        fontSize: 20,
    }
})


export default Collection;