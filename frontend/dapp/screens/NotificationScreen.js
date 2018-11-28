import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableHighlight,
  ScrollView
} from "react-native";
import * as USERCONSTANTS from "../Helpers/helper";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    paddingTop: "2%",
    //justifyContent: "center",
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
    padding: 15,
    borderColor: "grey",
    backgroundColor: "white"
  },
  scrollViewParent: {
    width: "100%",
    height: "35%",
    marginBottom: 10,
    borderRadius: 100
  },
  scrollView: {
    width: "90%",
    marginLeft: "5%",
    borderRadius: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  TextLbl: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15
  },
  textHeader: {
    fontSize: 15
  }
});

class NotificationScreen extends React.Component {
  state = {
    sentRequests: [],
    breaches: []
  };
  static navigationOptions = {
    header: null
  };
  componentDidMount = async () => {
    await this.apiCall();
  };
  apiCall = async () => {
    // Alert.alert("Working");
    const userName = await AsyncStorage.getItem("username");
    const url = USERCONSTANTS.ROOTURL + "getnotifications";
    const url2 = USERCONSTANTS.ROOTURL + "getbreach";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName
      })
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ sentRequests: responseData.value });
        // Alert.alert(JSON.stringify(responseData));
      });

    fetch(url2, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName
      })
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ breaches: responseData.value });
        // Alert.alert(JSON.stringify(responseData));
      });
  };
  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.textHeader}>My Requests' Status</Text>
        <View style={styles.scrollViewParent}>
          <ScrollView style={styles.scrollView}>
            {this.state.sentRequests.map((ent, i) => {
              if (ent.sentrequests.status != "Pending") {
                return (
                  <TouchableHighlight key={i} underlayColor="white">
                    <View style={styles.reqContainer}>
                      <Text>
                        Sent consent to : {ent.sentrequests.receivername}
                      </Text>
                      <Text>
                        Requested consent for {ent.sentrequests.preference}
                      </Text>
                      <Text>Their response: {ent.sentrequests.status}</Text>
                    </View>
                  </TouchableHighlight>
                );
              }
            })}
          </ScrollView>
        </View>

        <Text style={styles.textHeader}>Breaches</Text>
        <View style={styles.scrollViewParent}>
          <ScrollView style={styles.scrollView}>
            {this.state.breaches.map((ent, i) => {
              return (
                <TouchableHighlight key={i} underlayColor="white">
                  <View style={styles.reqContainer}>
                    <Text>Breach Filed by : {ent.receivedBreach.name}</Text>
                    <Text>Message : {ent.receivedBreach.message}</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.btn}>
          <Button
            style={styles.btn}
            color="#384499"
            title="Refresh"
            onPress={() => {
              this.apiCall();
            }}
          />
        </View>
      </View>
    );
  }
}

export default NotificationScreen;
