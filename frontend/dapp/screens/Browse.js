import React, { Fragment } from "react";
import { View, Text, Button, StyleSheet, ScrollView,TouchableHighlight } from "react-native";

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

class Browse extends React.Component {
  state = {
    list: [
      {
        name: "John Doe",
        age: "28"
      },
      {
        name: "John Cho",
        age: "23"
      },
      {
        name: "John Abraham",
        age: "35"
      }
    ]
  };

  // usrSelect = usr => {
  //   this.props.navigation.navigate("Browse", {
  //     userInfo: usr
  //   });
  // };
  // constructor(props) {
  //   super(props);
  //   this.usrSelect = this.usrSelect.bind(this);
  // }

  render() {
    const { navigation } = this.props;

    const itemId = navigation.getParam("browseInfo", "NO-ID");
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
