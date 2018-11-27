import React from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';

const styles=StyleSheet.create({
  body:{
    backgroundColor:'#eb3b5a',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn:{ 
    width: "90%",
    margin: 10,
    backgroundColor: "red" 
  }
});

class NotificationScreen extends React.Component {
    static navigationOptions = {
      header: null,
      };
  render() {
    return (
      <View style={styles.body}>
        <Text>Notification Screen!</Text>
        <View style={styles.btn}>
         <Button
         style={styles.btn}
         color='#384499'
          title="Get Notified!"
          onPress={() => {
            this.props.navigation.navigate({routeName: 'Dapp'});
          }}
        />
        </View>
      </View>
    );
  }  
}

export default NotificationScreen;