import React, { Fragment } from "react";
import {Alert, View, Text, Button, StyleSheet, ScrollView,TouchableHighlight } from "react-native";

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
  reqCicked=(usr)=>{
    this.props.navigation.navigate('userRequest',{
      userInfo:usr
    });
  }
  constructor(props){
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
              <TouchableHighlight onPress={() => this.reqCicked(JSON.stringify(ent))} underlayColor="white">
              <View style={styles.reqContainer}>
                <Text>{ent.name}</Text>
                <Text>Requesting consent for {ent.message}</Text>
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
