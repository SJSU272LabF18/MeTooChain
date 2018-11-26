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
    height: "50%"
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
    fetch("http://10.240.46.121:5000/requests", {
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
    return (
      <View style={styles.body}>
        <Text>Details Screen</Text>
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
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Request Consent"
            onPress={() => {
              this.props.navigation.navigate({ routeName: "" });
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
