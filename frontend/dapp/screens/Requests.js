import React, { Fragment } from "react";
import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";

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
    // height: "30%"
  },
  TextLbl: {
    fontWeight: "bold",
    fontSize: 20,
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

  componentDidMount() {
    fetch("http://10.0.0.102:5000/requests", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
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
          <ScrollView style={styles.scrollView}>
            {this.state.list.map(ent => {
              return (
                <TouchableHighlight
                  onPress={() => this.reqCicked(ent)}
                  underlayColor="white"
                >
                  <View style={styles.reqContainer}>
                    <Text>{ent.sendername}</Text>
                    <Text>Requesting consent for {ent.preference}</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <Text style={styles.TextLbl}>Explore</Text>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Browse"
            // onPress={() => {
            //   this.props.navigation.navigate({ routeName: "Browse" });
            // }}
            onPress={() => {
              this.props.navigation.navigate("Browse",{
                browseinfo: ""
              });
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="File Breach"
            onPress={() => {
              this.props.navigation.navigate({ routeName: "" });
            }}
          />
        </View>
      </View>
    );
  }
}

export default Requests;
