import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Background from "../Components/Background";
import SafeArea from "../Components/SafeArea";
import Header from "../Components/Header";
import Label from "../Components/Label";

import { Colors } from "../Constants/Index";
import NotificationBar from "../Components/NotificationBar";
import EncryptedStorage from "react-native-encrypted-storage";
import { useFocusEffect } from "@react-navigation/native";
import NotFound from "../Components/NotFound";
import Config from "react-native-config";
import { wait } from "../Constants/Functions";
import { connect } from "react-redux";
import { UpdateBell } from "../redux/actions/Bell-action";

const { width, height } = Dimensions.get("window");

const Activity = (props) => {
  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const check = async () => {
        let data = [];
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        await fetch(`${Config.API_URL}/all/notifications/list`, requestOptions)
          .then(async (response) => response.json())
          .then(async (res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              data.push(res.data[0]);
            }
          });

        await fetch(
          `${Config.API_URL}/unread/notifications/list`,
          requestOptions
        )
          .then(async (response) => response.json())
          .then(async (res) => {
            if (!isActive) return;
            if (res.status && res.status.toLowerCase() === "success") {
              data.push(res.data[0] ? res.data[0].length : 0);
            }
          });
        if (!isActive) return;
        if (JSON.stringify(data) !== JSON.stringify(Data)) {
          await EncryptedStorage.setItem("Activity", JSON.stringify(data));
          setData(data);
        } else {
          if (props.Bell.count !== 0)
            await fetch(
              `${Config.API_URL}/mark/as-read/all-notifications`,
              requestOptions
            )
              .then(async (response) => response.json())
              .then(async (res) => {
                props.UpdateBell(UpdateBell(0));
              });
        }
      };
      check();
      return () => (isActive = false);
    })
  );
  const renderItem = ({ item, index }) => {
    return (
      <NotificationBar
        item={item}
        style={
          index < Data[1] && {
            backgroundColor: Colors.BENEFICIARY,
          }
        }
      />
    );
  };

  return (
    <SafeArea>
      <Background height={0.19} />
      <View style={styles.MainTop}>
        <Header heading="Activites" noBell />
        {/* <Label notAlign style={styles.Info}>
          {Data ? Data[1] : 0} unread Notifications
        </Label> */}
      </View>
      {Data === null ? (
        <ActivityIndicator size="large" color="black" style={styles.Margin} />
      ) : (
        <FlatList
          data={Data[0]}
          ListEmptyComponent={<NotFound text="Activities" />}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          keyExtractor={(e) => e.id}
          contentContainerStyle={{
            paddingBottom: Dimensions.get("window").height * 0.2,
          }}
        />
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.19,
  },
  Info: {
    marginLeft: width * 0.05,
  },
  Section: {
    marginTop: height * 0.015,
    flexDirection: "row",
  },
  SectionImage: {
    width: width * 0.14,
    height: height * 0.06,
    resizeMode: "stretch",
    alignSelf: "center",
    marginLeft: width * 0.05,
  },
  SectionHead: {
    flexDirection: "column",
    alignSelf: "center",
    marginLeft: width * 0.06,
    width: width * 0.35,
  },
  SectionBold: {
    fontSize: RFValue(18),
  },
  SectionLight: {
    fontSize: RFValue(14),
  },
  SectionViewAmount: {
    position: "absolute",
    marginLeft: width * 0.6,
    alignSelf: "center",
  },
  SectionAmount: {
    color: Colors.SEND,
    fontSize: RFValue(18),
    width: width * 0.3,
    textAlign: "right",
  },
});
const mapStateToProps = (state) => {
  const { Bell } = state;
  return {
    Bell,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateBell: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
