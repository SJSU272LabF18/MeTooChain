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
  },
  TextLbl: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15
  },
  imgContainer: {
    height: "5%",
    width: "60%",
    borderWidth: 0.4,
    padding: 5,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "white",
    marginBottom: 30,
    padding: 15
  }
});

class SignUpScreen extends React.Component {
  state={
    username:"",
    password:"",
    signupuser:"",
    nid:"",
    contact:""
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
        <Text style={styles.TextLbl}>
          Sign Up Details
        </Text>
        <View style={styles.TextParent}>
          <TextInput 
          placeholder="Enter username"
           onChangeText={(text) => this.setState({...this.state,signupuser:text})}
          style={styles.textBox} value={this.state.signupuser} />
        </View>
        <View style={styles.TextParent}>
          <TextInput 
           placeholder="Enter National Identification number"
           onChangeText={(text) => this.setState({...this.state,nid:text})}
          style={styles.textBox} value={this.state.nid} />
        </View>
        <View style={styles.TextParent}>
          <TextInput 
          placeholder="Enter your contact number"
           onChangeText={(text) => this.setState({...this.state,contact:text})}
          style={styles.textBox} value={this.state.contact} />
        </View>
        <View style={styles.btn}>
          <Button color="#384499" title="Submit" 
          onPress={()=>{
            Alert.alert("Sign up successful")
            this.props.navigation.navigate("LoginDetails")
          }} />
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
