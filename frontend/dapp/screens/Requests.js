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
  AsyncStorage
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
    width: "90%",
    marginLeft:"5%",
    borderRadius:1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  TextLbl: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom  :15
  }
});

class Requests extends React.Component {
  state = {
    list: [
      {
        name: "John Doe",
        message: "fling"
      },
      {
        name: "John Cho",
        message: "casual date"
      },
      {
        name: "John Abraham",
        message: "flirting"
      }
    ]
  };

  componentDidMount=async()=> {
    const url = USERCONSTANTS.ROOTURL + "requests";
    const userName = await AsyncStorage.getItem("username");
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        username:userName
      })
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("response is", responseData.value[0].requests);
        this.setState({ list: responseData.value[0].requests });
      })
      .done();
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
        <Text style={styles.TextLbl}>Pending Requests</Text>
        <View style={styles.scrollViewParent}>
          <ScrollView style={styles.scrollView}>
            {this.state.list.map((ent,i) => {
              if(ent.status=="Pending"){
              return (
                <TouchableHighlight
                key={i}
                  onPress={() => this.reqCicked(ent)}
                  underlayColor="white"
                >
                  <View style={styles.reqContainer}>
                    <Text>{ent.sendername}</Text>
                    <Text>Requesting consent for {ent.preference}</Text>
                  </View>
                </TouchableHighlight>
              );
            }
            })}
          </ScrollView>
          </View>
          <Text style={styles.TextLbl}>Explore</Text>
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
        </View>
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

export default Requests;
