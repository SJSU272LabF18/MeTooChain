import React, { Fragment } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import * as USERCONSTANTS from "../Helpers/helper";
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

class DenyConsent extends React.Component {
  render() {
    const { navigation } = this.props;

    const itemId = navigation.getParam("DenyCon", "NO-ID");
    const itemObj = JSON.parse(itemId);
    return (
      <View style={styles.body}>
        <View style={styles.reqContainer}>
          <Text style={styles.reqText}>
            Consent has been denied for {itemObj.sendername} by{" "}
            {itemObj.preference}
          </Text>
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Back"
            onPress={() => {
              this.props.navigation.navigate({ routeName: "Requests" });
            }}
          />
        </View>
      </View>
    );
  }
}

export default DenyConsent;
