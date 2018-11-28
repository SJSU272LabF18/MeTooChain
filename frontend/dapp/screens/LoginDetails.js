import React from "react";
// import axios from "axios";
import * as USERCONSTANTS from "../Helpers/helper";
import {
  View,
  Text,
  Button,
  TextInput,
  ToastAndroid,
  StyleSheet,
  AsyncStorage,
  Alert
} from "react-native";

const styles = StyleSheet.create({
  bigblue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30
  },
  body: {
    backgroundColor: "#ededed",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    color: "black",
    paddingBottom: 25
  },
  textBox: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
  //  borderWidth: 0.4,
    //  borderRadius:15,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  btn: {
    textAlign: "center",
    width: "90%",
    marginTop:50,
    borderRadius: 5
  },
  TextParent: {
    textAlign: "center",
    width: "90%",
    margin: 10,
    borderRadius: 5
  }
});

class LoginDetails extends React.Component {
  state={
    username:"sojan",
    password:"password"
  }
  userSignup = () => {
    const url = USERCONSTANTS.ROOTURL + "login";
    // Alert.alert(url);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseData => {
        // this._onValueChange(STORAGE_KEY, responseData.id_token),
        // AlertAndroid.alert(
        //   "Signup Success!",
        //   "Click the button to get a Chuck Norris quote!"
        // );
       if(responseData.message!="Succesfull login"){
        Alert.alert(responseData.message);
       }
        console.log(this.props);
        try {
          AsyncStorage.setItem("username", this.state.username).then(
            this.props.navigation.navigate({ routeName: "TabNavigator" })
          );
        } catch (e) {
          Alert.alert(e);
        }
      })
      .done();
  };

  render() {
    return (
      <View style={[styles.header, styles.body]}>
        <Text style={styles.header}>
          Please Enter Your Username and Passwordd
        </Text>
        <View style={styles.TextParent}>
          <TextInput 
           onChangeText={(text) => this.setState({...this.state,username:text})}
          style={styles.textBox} value={this.state.username} />
        </View>
        <View style={styles.TextParent}>
          <TextInput 
          password={true}
          secureTextEntry={true}
           onChangeText={(text) => this.setState({...this.state,password:text})}
          style={styles.textBox} value={this.state.password} />
        </View>
        <View style={styles.btn}>
          <Button color="#384499" title="Login" onPress={this.userSignup} />
        </View>
      </View>
    );
  }
}

export default LoginDetails;
