import React, { Fragment } from "react";
import * as USERCONSTANTS from "../Helpers/helper";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ToastAndroid,
  Alert
} from "react-native";

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
    padding: 15,
    borderColor: "grey",
    backgroundColor: "white",
    marginBottom: 30,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  reqText: {
    fontSize: 17
  }
});

class UserRequest extends React.Component {
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
            if(itemObj.navigation==itemObj.navigation){
              this.props.navigation.navigate("DenyConsent", {
                DenyCon: JSON.stringify(itemObj)
              });
            }else{
            this.props.navigation.navigate(itemObj.navigation, {
              contractConfirm: JSON.stringify(itemObj)
            });
          }
          });
        

        //  // Alert.alert(JSON.stringify(responseData));
        //   this.props.navigation.navigate("ContractConfirmation",{
        //     contractConfirm:JSON.stringify(itemObj)
        //   });
      });
  };
  render() {
    const { navigation } = this.props;

    const itemId = navigation.getParam("userInfo", "NO-ID");
    const itemObj = itemId;
    return (
      <View style={styles.body}>
        <View style={styles.reqContainer}>
          <Text style={styles.reqText}>
            {itemObj.sendername} is requesting consent for a{" "}
            {itemObj.preference} . Please Select your preference below!
          </Text>
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Give Consent"
            onPress={() => {
              itemObj.navigation="ContractConfirmation";
              itemObj.status="Accepted";
              this.generateConsentContract(itemObj);
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Modify Consent"
            onPress={() => {
              this.props.navigation.navigate("ModifyConsent", {
                userInformation: JSON.stringify(itemObj)
              });
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Deny Consent"
            onPress={() => {
              itemObj.preference="Consent Denied";
              itemObj.status="Denied";
              itemObj.navigation="DenyConsent";
              this.generateConsentContract(itemObj);
             
            }}
          />
        </View>
      </View>
    );
  }
}

export default UserRequest;
