import React, { useRef } from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text
} from "react-native";
import Header from "../../Components/Header";
import { FanJoyCard, WjBackground } from "../../Components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";


const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {

  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={["#f8d7e8", "#c7dfe8"]}
      >
        <WjBackground
          style={{ height: 155, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
        />
        <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />

        <View style={{ marginTop: 60, alignItems: 'center' }}>

          <Text style={[styles.headerText]}>FAN JOY</Text>
          <Text style={styles.subHeaderText}>CREATED BY STARS</Text>
          <Image
            style={styles.playBtn}
            source={require('../../assets/imgs/playRound.png')}
          />
        </View>
        <View style={{ width: '100%', alignItems: 'center', marginLeft: 5 }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            numColumns={2}
            renderItem={(item) =>
              <FanJoyCard
                style={{ marginTop: 15 }}
              />
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              
              paddingBottom: height * 0.51,
            }}
          // refreshControl={
          //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          // }
          />
        </View>

      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
