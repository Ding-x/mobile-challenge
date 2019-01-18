import React, { Component } from 'react';
import {Text, View, FlatList, Image , StyleSheet, Dimensions} from 'react-native';
const screenW = Dimensions.get('window').width;
const cols = 2; // Column number
const left = 10; // margin left
const top = 10; // margin top
const productWH = (screenW - (cols + 1) * left) / cols;

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            colTitle:"",
            colImage:{}
        };
    }

    //Initialize nav name
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title', ''),
        };
      };


    //Fetch data from offered api
    componentWillMount(){
        const colId = this.props.navigation.getParam('id','');
        const colTitle = this.props.navigation.getParam('title','');
        const colImage = this.props.navigation.getParam('image','');

        this.setState({
            colTitle:colTitle,
            colImage:colImage
        })

        const url= "https://shopicruit.myshopify.com/admin/collects.json?collection_id="+colId+"&page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6"
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
            var prod = "";
            for(let col of response.collects){
                prod+=col.product_id+","
            }
            prod=prod.substring(0,prod.length-1)
            const url= "https://shopicruit.myshopify.com/admin/products.json?ids="+prod+"&page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6"
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
                this.setState({products:response.products})
            })
                   
        })
        .catch(error => {
          alert('Fetch data error: '+ error.message); })
      }




    render() {
        renderMenuItem = ({item, index}) =>{
            var invent = 0;
            item.variants.map(v=>{
                invent+=v.inventory_quantity
            })

            return(
              <View style={styles.item} key={index} >
                <Text style={styles.text} >{item.title}</Text>
                <Text style={styles.text} >Inventory: {invent}</Text>
              </View>
            )
        }
    

        return(
        
        <View >
            <View style={styles.header}>
                <Image style={styles.image} source={{uri:this.state.colImage.src}}></Image>
                <Text style={styles.title}>{this.state.colTitle}</Text>
            </View>


            <FlatList
            
                data={this.state.products}
                renderItem={renderMenuItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={cols}
                horizontal={false}
                />
        </View>

        );
    }
}


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        marginTop: 10,
        marginBottom: 15,
    },
    item:{
        backgroundColor:"white",
        width: productWH,
        height: productWH * 0.6,
        marginLeft: left,
        marginTop: top,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#d6d7da',
    },
    text:{
        fontSize:14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        height:100,
        width:100
    },
    title:{
        fontSize:22,
        marginTop: 45,
        marginLeft: 30,
    }

})


export default Product;