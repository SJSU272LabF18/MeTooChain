import React, { Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Alert,
  Image
} from "react-native";
import * as USERCONSTANTS from "../Helpers/helper";
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
    // backgroundColor: "#eb3b5a"
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
  imgContainer: {
    height: "15%",
    width: "25%",
    borderWidth: 0.4,
    padding: 5,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "white",
    marginBottom: 30,
    padding: 15
  },
  reqText: {
    fontSize: 17
  },
  imgContainer: {
    height: "15%",
    width: "25%",
    borderWidth: 0.4,
    padding: 5,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "white",
    marginBottom: 30,
    padding: 15
  }
});

class UserProfile extends React.Component {
  state = {
    value: 0,
    photo: {}
  };
  // state = {
  //   list: [
  //     {
  //       name: "John Doe",
  //       message: "fling",
  //       hobbies: "netflix and chill"
  //     },
  //     {
  //       name: "John Cho",
  //       message: "casual date"
  //     },
  //     {
  //       name: "John Abraham",
  //       message: "flirting"
  //     }
  //   ],

  // };
  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("profileInfo", "NO-ID");
    const itemObj = itemId;
    //  Alert.alert(itemObj.name);
    const url = USERCONSTANTS.ROOTURL + "getProfileImg";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: itemObj.name // this.state.username//"sojan"
      })
    })
      .then(response => response.json())
      .then(responseData => {
        //Alert.alert(responseData.user);
        // photos.push(responseData.data);
        this.setState({
          photo: responseData.img
        });
        // var finalList = [];
        // this.state.list.forEach(profilephoto => {
        //   //property
        //   this.state.ProfilePhotos.forEach(photo => {
        //     if (photo.user === profilephoto.name) {
        //       profilephoto.photo = photo.img;
        //       finalProperties.push(profilephoto);
        //     }
        //   });
        // });
        // this.setState({
        //   list: finalList
        // });
      });
  }

  generateConsentContract = async itemObj => {
    const userName = await AsyncStorage.getItem("username");
    const obj = {
      receivername: itemObj.name,
      sendername: userName,
      preference: radio_props[this.state.value].label,
      level: this.state.value + 1
    };
    const url = USERCONSTANTS.ROOTURL + "requestconsent";
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
        Alert.alert("Your consent selection has been sent");
        this.props.navigation.navigate("Browse");
        // Alert.alert(JSON.stringify(responseData));
        // this.props.navigation.navigate("ContractConfirmation", {
        //   contractConfirm: JSON.stringify(itemObj)
        // });
      });
  };
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("profileInfo", "NO-ID");
    const itemObj = itemId;

    return (
      <View style={styles.body}>
        <View style={styles.imgContainer}>
          <Image
            style={{ width: 66, height: 58 }}
            source={{ uri: "data:image/png;base64," + this.state.photo }}
          />
        </View>
        <View style={styles.reqContainer}>
          <Text style={styles.reqText}>
            {itemObj.name} {"\n"}
            {itemObj.description} {"\n"}
            {itemObj.age} {"\n"}
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
            title="Request Consent"
            onPress={() => {
              this.generateConsentContract(itemObj);
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="File Breach"
            onPress={() => {
              this.props.navigation.navigate("BreachConfirmation", {
                breachConfirm: itemObj
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default UserProfile;
