import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Label from "../Components/Label";
import LongButton from "../Components/LongButton";
import Header from "../Components/Header";

import { Colors } from "../Constants/Index";
import Section from "../Components/Section";
import UserInfo from "../Components/UserInfo";
import EncryptedStorage from "react-native-encrypted-storage";

const { width, height } = Dimensions.get("window");

const Profile = ({ navigation }) => {
  const [Data, setData] = useState(null);

  useEffect(() => {
    const check = async () => {
      var User = await EncryptedStorage.getItem("User");
      if (JSON.stringify(Data) !== User) {
        setData(JSON.parse(User));
      }
    };
    check();
  });

  const GetField = (props) => {
    const { name, val, style } = props;
    return (
      <View style={[styles.ItemView, style]}>
        <Label notAlign bold darkmuted text={name} />
        <Label
          notAlign
          bold
          dark
          text={val || "N/A"}
          style={styles.ItemLabel}
          {...props}
        />
      </View>
    );
  };

  return (
    <SafeArea>
      <Background height={0.2} />
      <Header value={3} />
      <View style={styles.MainTop}>
        <UserInfo style={styles.header} OwnUser popup status />
      </View>
      <Label primary bold headingtype="h4">
        Personal Details
      </Label>
      {Data === null ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <>
          <Section style={styles.Personal}>
            <View style={{ marginTop: height * 0.005 }}>
              <GetField name="First name" val={Data.first_name} />
              <GetField name="Last name" val={Data.last_name} />
              <GetField name="Username" val={Data.user_name} />
              <GetField name="Email" val={Data.email} />
              <GetField name="Country" val={Data.country} />
              <GetField name="City" val={Data.city} />
              <GetField name="Address" val={Data.address} />
              <GetField name="Phone" val={Data.phone_no} />
              <LongButton
                light
                shadowless
                text="Edit"
                style={styles.EditBtn}
                onPress={() =>
                  navigation.navigate("MenuStack", { screen: "EditProfile" })
                }
              />
            </View>
          </Section>
          {/* <Label primary bold headingtype="h4" style={styles.Margin}>
            Career Details
          </Label>
          <Section style={styles.Career}>
            <GetField name="Designation" val={Data.designation} />
            <GetField name="Company" val={Data.company_name} />
            <GetField name="Office address" val={Data.office_address} />
            <GetField name="Office phone" val={Data.office_no} />
          </Section> */}
        </>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.165,
  },
  header: {
    flexDirection: "row",
    marginTop: height * 0.03,
    marginLeft: width * 0.034,
  },
  ItemView: {
    marginTop: height * 0.012,
    marginLeft: width * 0.05,
  },
  ItemLabel: {
    position: "absolute",
    textAlign: "right",
    width: width * 0.85,
  },
  EditBtn: {
    marginTop: height * 0.007,
    width: width * 0.8,
    height: height * 0.05,
  },
  Personal: {
    marginTop: height * 0.005,
    height: height * 0.372,
  },
  Margin: {
    marginTop: height * 0.015,
  },
  Career: {
    marginTop: height * 0.01,
    height: height * 0.17,
  },
});
export default Profile;
