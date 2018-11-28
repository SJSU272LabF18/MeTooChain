import React, { Fragment } from "react";
import { View, Text, Button, StyleSheet, ScrollView,AsyncStorage,Alert } from "react-native";
import * as USERCONSTANTS from "../Helpers/helper";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
var radio_props = [
  { label: "First Base - You are ready to go on a Date", value: 0 },
  { label: "Second Base - Open to some casual intimacy", value: 1 },
  { label: "Third Base - Ready to go  distance", value: 2 }
];
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#eb3b5a"
    backgroundColor: "#ededed"
  },
  btn: {
    width: "90%",
    margin: 10,
    backgroundColor: "red"
  },
  reqContainer: {
    width: "100%",
    borderWidth: 0.4,
    padding: 5,
    borderColor: "grey",
    backgroundColor: "white"
  },
  scrollView: {
    width: "90%",
    height: "50%"
  },
  reqContainer: {
    width: "90%",
    borderWidth: 0.4,
    padding: 5,
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "white",
    marginBottom: 30,
    padding: 15
  },
  reqText: {
    fontSize: 17
  }
});

class UserProfile extends React.Component {
    state = {
      value:0
      };
      
  generateConsentContract=async (itemObj)=>{
    const userName =await AsyncStorage.getItem('username');
    const obj={
      receivername:itemObj.name,
      sendername:userName,
      preference:radio_props[this.state.value].label,
      level:this.state.value+1
    };
    const url = USERCONSTANTS.ROOTURL + "requestconsent";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }) .then(response => response.json())
    .then(responseData => {
      //Alert.alert(JSON.stringify(responseData));
      this.props.navigation.navigate("RequestConfirmation",{
        requestconfirm:JSON.stringify(itemObj)
      });
      // this.props.navigation.navigate("ContractConfirmation",{
      //   contractConfirm:JSON.stringify(itemObj)
      // });
    })
    
  }
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("profileInfo", "NO-ID");
    const itemObj = itemId; 
    return (
      <View style={styles.body}>
        <View style={styles.reqContainer}>
          <Text style={styles.reqText}>
          Requesting {itemObj.name} for consent. Please select one of the options below !
          </Text>
        </View>
        <View style={styles.reqContainer}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={value => {
              this.setState({ value: value });
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Request Consent"
            onPress={() => {
              this.generateConsentContract(itemObj);
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="File Breach"
            onPress={() => {
              this.props.navigation.navigate("BreachConfirmation",{
                breachConfirm:obj
              });
            }}
          />
        </View>
      </View>
    );

  }
}

export default UserProfile;