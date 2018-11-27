import React, { Fragment } from "react";
import * as USERCONSTANTS from "../Helpers/helper";
import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView
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

class ModifyConsent extends React.Component {
  render() {
    const { navigation } = this.props;

    const itemId = navigation.getParam("userInformation", "NO-ID");
    const itemObj = JSON.parse(itemId);
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
              this.props.navigation.navigate("ContractConfirmation", {
                contractConfirm: JSON.stringify(itemObj)
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default ModifyConsent;
