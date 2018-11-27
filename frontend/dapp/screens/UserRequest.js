import React, { Fragment } from "react";
import { View, Text, Button, StyleSheet, ScrollView,AsyncStorage,Alert } from "react-native";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eb3b5a"
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

class UserRequest extends React.Component {
  generateConsentContract=async (itemObj)=>{
    const userName =await AsyncStorage.getItem('username');
    const obj={
      user:userName,
      sendername:itemObj.sendername,
      preference:itemObj.preference
    };
  
    fetch("http://10.236.254.230:5000/confirmContract", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }) .then(response => response.json())
    .then(responseData => {
     // Alert.alert(JSON.stringify(responseData));
      this.props.navigation.navigate("ContractConfirmation",{
        contractConfirm:JSON.stringify(itemObj)
      });
    })
    
  }
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
             this.generateConsentContract(itemObj);
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Modify Consent"
            onPress={() => {
              this.props.navigation.navigate("ModifyConsent",{
                userInformation:JSON.stringify(itemObj)
              });
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Deny Consent"
            onPress={() => {
              this.props.navigation.navigate("DenyConsent" ,{
                DenyCon:JSON.stringify(itemObj)
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default UserRequest;
