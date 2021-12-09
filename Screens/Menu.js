import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Text
} from "react-native";
import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import SmallButton from "../Components/SmallButton";

import { Colors, Images } from "../Constants/Index";
import UserInfo from "../Components/UserInfo";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import ProfilePicture from "../Components/ProfilePicture";

const { width, height } = Dimensions.get("window");
var pjson = require('../package.json');

const Profile = ({ navigation }) => {
  const GetConSection = () => {
    const [Data, setData] = useState(null);
    useEffect(() => {
      let isActive = true;
      const check = async () => {
        if (Data === null) {
          const Token = await EncryptedStorage.getItem("Token");
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${Token}`,
            },
          };
          await fetch(
            `${Config.API_URL}/accepted-connections/list`,
            requestOptions
          )
            .then(async (response) => response.json())
            .then((res) => {
              if (!isActive) return;
              if (res.status && res.status.toLowerCase() === "success") {
                setData(res.data[0]);
              }
            });
        }
      };
      check();
      return () => (isActive = false);
    });
    return Data === null ? (
      <ActivityIndicator size="large" color={Colors.BLACK} />
    ) : (
      <>
        <Label primary headingtype="h5" bold style={styles.ConLab}>
          Your Connections
        </Label>
        <View style={styles.ConImgView}>
          {Data.length >= 1 &&
            Data.slice(0, Data.length >= 5 ? 5 : Data.length).map((i, idx) => (
              <ProfilePicture
                key={idx}
                id={i.id}
                picture={i.profile_image}
                name={i.first_name.slice(0, 1) + i.last_name.slice(0, 1)}
                style={styles.ConImg}
              />
            ))}
        </View>
        <LongButton
          black
          text="View all connections"
          style={styles.ViewAll}
          onPress={() => navigation.navigate("Connections")}
        />
      </>
    );
  };
  const GetButton = (props) => {
    return (
      <LongButton
        text={props.txt}
        style={[styles.Margin, props.style]}
        textstyle={styles.Button}
        childbefore
        black
        {...props}
      >
        <Image source={props.img} style={styles.Image} tintColor={"#0043F0"} />
        {props.children}
      </LongButton>
    );
  };
  const HandleLogout = async () => {
    await EncryptedStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Splash" }],
    });
  };
  return (
    <ScrollView>
      <SafeArea>
        <Background height={0.165} />
        <Header />
        <UserInfo style={styles.header} OwnUser />
        <View style={styles.Body}>
          <LongButton
            text="Edit Profile"
            style={styles.ProfileBtn}
            shadowless
            onPress={() => navigation.navigate("EditProfile")}
          />

          <View style={styles.ButtonsView}>
            <GetButton
              txt="My Orders"
              img={Images.Orders}
              onPress={() => navigation.navigate("Orders")}
            />
            {/* <GetButton
              txt="Requests"
              img={Images.Request}
              onPress={() => navigation.navigate("RequestList")}
            />
            <GetButton
              txt="Receive Coins"
              img={Images.Withdraw}
              onPress={() => navigation.navigate("WithdrawCoins")}
            /> */}
            <GetButton
              txt="View Tickets"
              img={Images.Ticket}
              onPress={() => navigation.navigate("TicketList")}
            />
            {/* <GetButton
              txt="Submit a ticket"
              img={Images.Ticket}
              style={styles.Ticket}
              onPress={() => navigation.navigate("SubmitTicketScreen")}
            /> */}
            <GetButton
              txt="Add Connection"
              img={Images.Connection}
              onPress={() =>
                navigation.navigate("Connections", { OpenAddCon: true })
              }
            />
            <GetButton
              txt="Settings"
              img={Images.Settings}
              onPress={() =>
                navigation.navigate("EditProfile", {
                  ReceivedType: 2,
                })
              }
            />
            <GetButton
              txt="Contact"
              img={Images.Contact}
              onPress={() => navigation.navigate("ContactUs")}
            />
            <GetButton
              txt="Credit Coins"
              img={Images.Send}
              onPress={() => navigation.navigate("CreditCoins")}
            />
          </View>
        </View>

        <View style={styles.SmallBorder} />
        <GetConSection />
        <View style={styles.SmallBorder} />
        <LongButton
          text="Logout"
          onPress={HandleLogout}
          style={styles.Margin}
        />
        <View style={styles.Margin2} />
        <Text style={styles.version}>{pjson.version}</Text>
      </SafeArea>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  version: {
    fontSize: 6,
    color: '#d5dbe4', 
    marginTop: 10,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    marginTop: height * 0.02,
    marginLeft: width * 0.034,
  },
  ProfilePictureContainer: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: Colors.IMAGE_BORDER,
  },
  ProfilePicture: {
    width: width * 0.16,
    height: height * 0.08,
    resizeMode: "contain",
  },
  ProfileInfo: {
    marginLeft: width * 0.015,
    justifyContent: "center",
  },

  Body: {
    marginTop: height * 0.03,
  },
  ProfileBtn: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY_LABEL,
    backgroundColor: Colors.INVISIBLE,
  },
  ButtonsView: {
    marginTop: height * 0.001,
  },
  Margin: {
    marginTop: height * 0.01,
  },
  Button: {
    marginLeft: width * 0.21,
    alignSelf: "flex-start",
    fontFamily: "Axiforma-Medium",
  },
  Image: {
    position: "absolute",
    marginLeft: width * 0.06,
    width: width * 0.1,
    height: height * 0.05,
    resizeMode: "contain",
  },
  ORButton: {
    marginTop: height * 0.01,
  },
  Ticket: {
    marginTop: height * 0.01,
  },
  SmallBorder: {
    width: width * 0.1,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  ConLab: {
    marginTop: height * 0.01,
  },
  ConImgView: {
    marginTop: height * 0.01,
    alignSelf: "center",
    flexDirection: "row",
  },
  ConImg: {
    width: width * 0.18,
    height: width * 0.18,
    resizeMode: "contain",
    borderRadius: 50,
    marginLeft: width * 0.005,
  },
  ViewAll: {
    marginTop: height * 0.02,
  },
  Margin2: {
    marginTop: height * 0.02,
  },
});

export default Profile;
