import React, { Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";
import * as USERCONSTANTS from "../Helpers/helper";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  }
});

class Browse extends React.Component {
  state = {
    list: [
      {
        name: "Stacy",
        age: "28"
      },
      {
        name: "Amanda",
        age: "23"
      },
      {
        name: "Catherine",
        age: "22"
      },
      {
        name: "Taylor",
        age: "23"
      },
      {
        name: "John",
        age: "23"
      }
    ]
  };
  // componentDidMount() {
  //   const url = USERCONSTANTS.ROOTURL + "getProfileImg";
  //   var photos = [];
  //   // for (let i = 0; i < this.state.list.length; i++) {
  //   const data = { id: this.state.list[i].name };
  //   console.log("inside", this.state.list[i].name);
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       photos.push(responseData.data);
  //       this.setState({
  //         ProfilePhotos: photos
  //       });
  //       var finalList = [];
  //       this.state.list.forEach(profilephoto => {
  //         //property
  //         this.state.ProfilePhotos.forEach(photo => {
  //           if (photo.user === profilephoto.name) {
  //             profilephoto.photo = photo.img;
  //             finalProperties.push(profilephoto);
  //           }
  //         });
  //       });
  //       this.setState({
  //         list: finalList
  //       });
  //     })
  //     .done();
  //   // await axios
  //   //   .post("http://localhost:3001/getProfileImg", data)
  //   //   .then(async response => {
  //   //     console.log(JSON.stringify(response.data));
  //   //     photos.push(response.data);
  //   //     this.setState({
  //   //       ProfilePhotos: photos
  //   //     });
  //   //     console.log("response imagee", JSON.stringify(photos));
  //   //     console.log("photos.length", JSON.stringify(photos.length));
  //   //     console.log(
  //   //       "PropertyPhotos",
  //   //       JSON.stringify(this.state.ProfilePhotos)
  //   //     );
  //   //   });
  //   // }
  //   var finalList = [];
  //   this.state.list.forEach(profilephoto => {
  //     //property
  //     this.state.ProfilePhotos.forEach(photo => {
  //       if (photo.user === profilephoto.name) {
  //         profilephoto.photo = photo.img;
  //         finalProperties.push(profilephoto);
  //       }
  //     });
  //   });
  //   this.setState({
  //     list: finalList
  //   });
  // }

  reqCicked = abc => {
    this.props.navigation.navigate("UserProfile", {
      profileInfo: abc
    });
  };
  constructor(props) {
    super(props);
    this.reqCicked = this.reqCicked.bind(this);
  }

  render() {
    const { navigation } = this.props;

    const itemId = navigation.getParam("profileInfo", "NO-ID");
    const itemObj = itemId;
    return (
      <View style={styles.body}>
        <Text style={styles.TextLbl}>User list</Text>
        <ScrollView style={styles.scrollView}>
          {this.state.list.map(ent => {
            return (
              <TouchableHighlight
                key={ent.name}
                onPress={() => this.reqCicked(ent)}
                underlayColor="white"
              >
                <View style={styles.reqContainer}>
                  <Text>{ent.name}</Text>
                  <Text>Age: {ent.age}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>

      // <View style={styles.body}>
      //   <View style={styles.reqContainer}>
      //     <Text style={styles.reqText}>
      //       {itemObj.sendername} is requesting consent for a{" "}
      //       {itemObj.preference} . Please Select your preference below!
      //     </Text>
      //   </View>
      //   <View style={styles.btn}>
      //     <Button
      //       color="#384499"
      //       title="Give Consent"
      //       onPress={() => {
      //         this.props.navigation.navigate("ContractConfirmation",{
      //           contractConfirm:JSON.stringify(itemObj)
      //         });
      //       }}
      //     />
      //   </View>

      // </View>
    );
  }
}

export default Browse;
