import React,{Fragment} from 'react';
import { View, Text, Button,StyleSheet,ScrollView } from 'react-native';

const styles=StyleSheet.create(
  {
    body:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#eb3b5a'
    },
    btn:{ 
      width: "90%",
      margin: 10,
      backgroundColor: "red" 
    },
   reqContainer: {
    width: "100%",
    borderWidth:0.4,
    padding:5,
    borderColor:"grey",
    backgroundColor:"white"
    },
    scrollView:{
      width:"90%",
     height:"50%"
    }
  }
);

class Requests extends React.Component {
  state={
    list:[
      {
        name:"John Doe",
        message:"Requesting consent for a fling"
      },
      {
        name:"John Cho",
        message:"Requesting consent for a casual date"
      },
      {
        name:"John Abraham",
        message:"Requesting consent for a flirting"
      },
      {
        name:"John Doe",
        message:"Requesting consent for a fling"
      },
      {
        name:"John Cho",
        message:"Requesting consent for a casual date"
      },
      {
        name:"John Abraham",
        message:"Requesting consent for a flirting"
      },
      {
        name:"John Doe",
        message:"Requesting consent for a fling"
      },
      {
        name:"John Cho",
        message:"Requesting consent for a casual date"
      },
      {
        name:"John Abraham",
        message:"Requesting consent for a flirting"
      }
    ]
  }
  render() {
    return (
      <View style={styles.body}>
        <Text>Details Screen</Text>
        <ScrollView style={styles.scrollView}>
        {this.state.list.map((ent)=>{
          return(<View style={styles.reqContainer}>
            <Text>{ent.name}</Text>
            <Text>{ent.message}</Text>
          </View>)
        })}
        </ScrollView>
        <View  style={styles.btn}>
          <Button
         color='#384499'
          title="Request Consent"
          onPress={() => {
            this.props.navigation.navigate({routeName: ''});
          }}
        />
        </View>
        <View  style={styles.btn}>
          <Button
         color='#384499'
          title="File Breach"
          onPress={() => {
            this.props.navigation.navigate({routeName: ''});
          }}
        />
        </View>
      </View>
    );
  }  
}

export default Requests;