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
    paddingTop:75
    // justifyContent: "center"
  },
  header: {
    color: "black",
    paddingBottom: 25,
    width: "100%",
    borderWidth: 0.4,
    padding: 15,
    borderColor: "grey",
    backgroundColor: "white"
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
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3
  },
  btn: {
    textAlign: "center",
    width: "90%",
    marginTop: 50,
    borderRadius: 5
  },
  TextParent: {
    textAlign: "center",
    width: "90%",
    margin: 10,
    borderRadius: 5
  }
});

class OverLay extends React.Component {
  render() {
    return (
      <View style={[styles.header, styles.body]}>
        <Text style={styles.header}>
         First Base: includes Flirting , Engaging in adult humour , Exchanging explicit pictures{"\n \n"}
         Second Base : includes kissing , Virtual Sex, hugging, go on a date{"\n \n"}
         Third Base : Sex , Other Sexual preferences
        </Text>
       
        {/* <View style={styles.btn}>
          <Button color="#384499" title="Back" onPress={this.userSignup} />
        </View> */}
      </View>
    );
  }
}

export default OverLay;
