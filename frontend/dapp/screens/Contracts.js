import React, { Fragment } from "react";
import * as USERCONSTANTS from "../Helpers/helper";
import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  Linking
} from "react-native";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    paddingTop:"12%",
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
     height: "45%",
     marginBottom:30,
     borderRadius:100
  },
  scrollView: {
    width: "90%"
    // height: "30%"
  },
  TextLbl: {
    fontWeight: "bold",
    fontSize: 20
  }
});

class Contracts extends React.Component {
  state = {
   sent:[],
   received:[]
  };

  componentDidMount=async()=> {
    const url = USERCONSTANTS.ROOTURL + "getContractByReceiver";
    const url2 = USERCONSTANTS.ROOTURL + "getContractBySender";
    const userName = await AsyncStorage.getItem("username");
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        receiver: userName
      })
    })
      .then(response => response.json())
      .then(responseData => {
       // Alert.alert(JSON.stringify(responseData));
        // console.log("response is", responseData.value[0].requests);
         this.setState({ received: responseData});
      });

      fetch(url2, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: userName
        })
      })
        .then(response => response.json())
        .then(responseData => {
         // Alert.alert(JSON.stringify(responseData));
          // console.log("response is", responseData.value[0].requests);
           this.setState({ sent: responseData });
        })
  }
  reqCicked = usr => {
    this.props.navigation.navigate("userRequest", {
      userInfo: usr
    });
  };
  constructor(props) {
    super(props);
    this.reqCicked = this.reqCicked.bind(this);
  }
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("userInfo", "NO-ID");
    const itemObj = itemId;
    return (
      <View style={styles.body}>
        {/* <Text>Pending Requests</Text> */}
        <Text style={styles.TextLbl}>Sent Contracts</Text>
        <ScrollView style={styles.scrollView}>
          {this.state.sent.map(ent => {
            return (
              <TouchableHighlight
                key={ent._id}
                onPress={()=>{
                  Linking.openURL(ent.ipfsAddress).catch(err => console.error('An error occurred', err));
                }}
                underlayColor="white"
              >
                <View style={styles.reqContainer}>
                  <Text>{ent.receiverName}</Text>
                  <Text>Contract URL : {ent.ipfsAddress}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
        <Text style={styles.TextLbl}>Received Contracts</Text>
        <ScrollView style={styles.scrollView}>
          {this.state.received.map(ent => {
            return (
              <TouchableHighlight
                key={ent._id}
                onPress={()=>{
                  Linking.openURL(ent.ipfsAddress).catch(err => console.error('An error occurred', err));
                }}
                underlayColor="white"
              >
                <View style={styles.reqContainer}>
                  <Text>{ent.senderName}</Text>
                  <Text>Contract URL : {ent.ipfsAddress}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
        {/* <Text style={styles.TextLbl}>Explore Profiles</Text>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Browse"
            // onPress={() => {
            //   this.props.navigation.navigate({ routeName: "Browse" });
            // }}
            onPress={() => {
              this.props.navigation.navigate("Browse", {
                browseinfo: ""
              });
            }}
          />
        </View> */}
        {/* <View style={styles.btn}>
          <Button
            color="#384499"
            title="File Breach"
            onPress={() => {
              this.props.navigation.navigate({ routeName: "" });
            }}
          />
        </View> */}
      </View>
    );
  }
}

export default Contracts;
