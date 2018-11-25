import React,{Component,Fragment} from "react";
import AppNavigator from "./AppNavigator";
import { View, Text, Button,StyleSheet } from 'react-native';

const styles= StyleSheet.create({
    containerStyle: {
        borderBottomWidth: 2,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
      
      },
    header:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 30,
        backgroundColor:'#384499',
        textAlign: 'center',
        paddingTop:20,
        shadowOpacity: 0.75,
        shadowRadius: 15,
        shadowColor: 'grey',
        shadowOffset: { height: 50, width: 50 },
    },
    subHeader:{
        backgroundColor:'#384499',
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