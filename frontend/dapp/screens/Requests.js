import React,{Fragment} from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';

const styles=StyleSheet.create(
  {
    btn:{ 
      width: "90%",
      margin: 10,
      backgroundColor: "red" 
    },
   reqContainer: {
    width: "90%",
    margin: 1,
    backgroundColor:"blue"
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
      }
    ]
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        {this.state.list.map((ent)=>{
          return(<View style={styles.reqContainer}>
            <Text>{ent.name}</Text>
            <Text>{ent.message}</Text>
          </View>)
        })}
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