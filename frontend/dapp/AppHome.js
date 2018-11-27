import React,{Component,Fragment} from "react";
import AppNavigator from "./AppNavigator";
import { View, Text, Button,StyleSheet } from 'react-native';

const styles= StyleSheet.create({
    containerStyle: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 16,
      
      },
    header:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 30,
        backgroundColor:'#00adff',
        textAlign: 'center',
        paddingTop:20,
    },
    subHeader:{
        backgroundColor:'#00adff',
        textAlign: 'center',
        fontStyle:'italic',
        color:'white',
        paddingBottom:20
    }
});

class AppHome extends Component{
   constructor(props){
       super(props)
   }
    render(){
        return(
            <Fragment>
            <View style={styles.containerStyle}>
            <Text style={styles.header}>TRUST#ME</Text>
            <Text style={styles.subHeader}>The Swipe of Trust</Text>
        </View>
         <AppNavigator/>
         </Fragment>
        );
    }
}

export default AppHome;