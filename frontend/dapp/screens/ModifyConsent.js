import React, { Fragment } from "react";
import * as USERCONSTANTS from "../Helpers/helper";
import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  ToastAndroid
} from "react-native";
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

class ModifyConsent extends React.Component {
  state = {
    value:0
    };
  generateConsentContract = async itemObj => {
    const url1 = USERCONSTANTS.ROOTURL + "confirmContract";
    const url2 = USERCONSTANTS.ROOTURL + "giveconsent";
    const userName = await AsyncStorage.getItem("username");
    const obj = {
      user: userName,
      sendername: itemObj.sendername,
      preference: itemObj.preference,
      status:itemObj.status
    };
    const obj2 = {
      receivername: userName,
      sendername: itemObj.sendername,
      preference: itemObj.preference,
      status:itemObj.status
    };
    ToastAndroid.show('Generating Contract. Please wait!',ToastAndroid.CENTER, ToastAndroid.LONG);
    fetch(url1, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(responseData => {
        //  Alert.alert("hi");
        fetch(url2, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj2)
        })
          .then(response => response.json())
          .then(responseData => {
            console.log("inside consent route");
            // Alert.alert(JSON.stringify(responseData));
           
            this.props.navigation.navigate(itemObj.navigation, {
              contractConfirm: JSON.stringify(itemObj)
            });
          });
        

        //  // Alert.alert(JSON.stringify(responseData));
        //   this.props.navigation.navigate("ContractConfirmation",{
        //     contractConfirm:JSON.stringify(itemObj)
        //   });
      });
  };
  render() {
    const { navigation } = this.props;

    const itemId = navigation.getParam("userInformation", "NO-ID");
    const itemObj = itemId;
    return (
      <View style={styles.body}>
        <View style={styles.reqContainer}>
          <Text style={styles.reqText}>
            {itemObj.sendername} is requesting consent for a{" "}
            {itemObj.preference} . Please Select your preference below!
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
            title="Send Modified Consent"
            // onPress={() => {
            //   this.props.navigation.navigate({ routeName: "ContractConfirmation" });
            // }}
            onPress={() => {

              itemObj.navigation="ContractConfirmation";
              itemObj.status="Accepted";
              if(itemObj.level>this.state.value+1){
                itemObj.preference=radio_props[this.state.value].label;
              }
              this.generateConsentContract(itemObj);
              // this.props.navigation.navigate("ContractConfirmation", {
              //   contractConfirm: JSON.stringify(itemObj)
              // });
            }}
          />
        </View>
      </View>
    );
  }
}

export default ModifyConsent;
