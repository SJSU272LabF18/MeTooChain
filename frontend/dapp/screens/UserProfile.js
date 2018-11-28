import React, { Fragment } from "react";
import * as USERCONSTANTS from "../Helpers/helper";
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
    list: [
      {
        name: "John Doe",
        message: "fling",
        hobbies: "netflix and chill"
      },
      {
        name: "John Cho",
        message: "casual date"
      },
      {
        name: "John Abraham",
        message: "flirting"
      }
    ],
    photo: {}
  };
  componentDidMount() {
    //  Alert.alert("hi");
    const url = USERCONSTANTS.ROOTURL + "getProfileImg";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "sojan" // this.state.username//"sojan"
      })
    })
      .then(response => response.json())
      .then(responseData => {
        Alert.alert(responseData.user);
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
      user: userName,
      sendername: itemObj.sendername,
      preference: itemObj.preference
    };

    fetch("http://10.0.0.102:5000/confirmContract", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(responseData => {
        // Alert.alert(JSON.stringify(responseData));
        this.props.navigation.navigate("ContractConfirmation", {
          contractConfirm: JSON.stringify(itemObj)
        });
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
            // source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
            // source={{
            //   uri:
            //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="
            // }}
            source={{ uri: "data:image/png;base64," + this.state.photo }}
          />
        </View>
        <View style={styles.reqContainer}>
          <Text style={styles.reqText}>
            {itemObj.sendername} is requesting consent for a Description:{" "}
            {itemObj.preference} . Please Select your preference below!
          </Text>
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="Request Consent"
            // onPress={() => {
            //  this.generateConsentContract(itemObj);
            // }}
            onPress={() => {
              this.props.navigation.navigate("RequestConfirmation", {
                requestconfirm: JSON.stringify(itemObj)
              });
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#384499"
            title="File Breach"
            onPress={() => {
              this.props.navigation.navigate("BreachConfirmation", {
                breachConfirm: JSON.stringify(itemObj)
              });
            }}
          />
        </View>
        {/* <View style={styles.btn}>
          <Button
            color="#384499"
            title="Deny Consent"
            onPress={() => {
              this.props.navigation.navigate("DenyConsent" ,{
                DenyCon:JSON.stringify(itemObj)
              });
            }}
          />
        </View> */}
      </View>
    );
  }
}

export default UserProfile;
