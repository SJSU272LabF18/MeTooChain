import React, { Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  AsyncStorage,
  ScrollView
} from "react-native";
import * as USERCONSTANTS from "../Helpers/helper";
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
  textBox: {
    height: 80,
    borderColor: "gray",
    backgroundColor: "white",
    //  borderWidth: 0.4,
    //  borderRadius:15,
    textAlign: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3
  },
  reqText: {
    fontSize: 17
  }
});

class BreachConfirmation extends React.Component {
  state = {
    breach_desc: "sojan"
  };

  logBreach = async itemObj => {
    const url = USERCONSTANTS.ROOTURL + "filebreach";
    const userName = await AsyncStorage.getItem("username");
    const obj = {
      user: userName,
      sendername: itemObj.name,
      message: this.state.breach_desc
    };
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(responseData => {
        Alert.alert("Breach filed successfully");
        this.props.navigation.navigate({ routeName: "Browse" });
      })
      .done();
  };

  render() {
    const { navigation } = this.props;

    const itemId = navigation.getParam("breachConfirm", "NO-ID");
    const itemObj = JSON.parse(itemId);
    return (
      <View style={styles.body}>
        <Text style={styles.TextLbl}>Describe details of breach</Text>
        <View style={styles.reqContainer}>
          <TextInput
            style={styles.textBox}
            onChangeText={text =>
              this.setState({ ...this.state, breach_desc: text })
            }
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Submit"
            onPress={() => this.logBreach(itemObj)}
            // onPress={() => {
            //   Alert.alert("Breach filed successfully")

            //   // this.props.navigation.navigate({ routeName: "Browse" });
            // }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Back"
            onPress={() => {
              this.props.navigation.navigate({ routeName: "Browse" });
            }}
          />
        </View>
      </View>
    );
  }
}

export default BreachConfirmation;
