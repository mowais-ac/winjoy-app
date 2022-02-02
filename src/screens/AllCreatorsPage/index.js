import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ScrollView
} from "react-native";
import Header from "../../Components/Header";
import { ExperienceCard, WinExperienceCard, FanJoyCard, TrendingCards, WjBackground } from "../../Components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import EncryptedStorage from "react-native-encrypted-storage";
import I18n from 'react-native-i18n';
import axios from "axios";
import Config from "react-native-config";
import { strings } from "../../i18n";
import { RFValue } from "react-native-responsive-fontsize";
import { getAllCreator } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import types from '../../redux/types';
import ModalCelebrityProducts from "../../Components/ModalCelebrityProducts";
const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {
  const celebrityModalState = useRef();
  const experienceId = useRef();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const data = useSelector(state => state.app.fanjoyData);
 // const [experienceId, setExperienceId] = useState();
  useEffect(() => {
    dispatch(getAllCreator());
    console.log("datat", data);
  }, []);
  const onPressCreator = (id) => {
    dispatch2({
      type: types.CREATOR_ID,
      creatorId: id
      //  user: res.data.data,
    });
    navigation.navigate("CreatorsPage")
  }

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={["#f8d7e8", "#c7dfe8"]}
        >
          <WjBackground
            style={{ height: 155, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
          />
          <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />

          <View style={{ marginTop: 55, alignItems: 'center', }}>

            <Text style={[styles.headerText]}>{strings("fan_joy.fan_joy")}</Text>
            <Text style={styles.subHeaderText}>{strings("fan_joy.created_by_stars")}</Text>
            <Image
              style={styles.playBtn}
              source={require('../../assets/imgs/playRound.png')}
            />
          </View>

          <View style={{ width: '100%', alignItems: 'center', }}>
            <Text style={styles.textHeading}>
              Creators
            </Text>
            <FlatList
              data={data?.celebrities}
              style={{ paddingLeft: 10 }}
              horizontal={true}
              renderItem={({ item }) =>
                <FanJoyCard
                  onPress={() => {
                    onPressCreator(item?.id)
                  }}
                  name={item?.first_name + " " + item?.first_name}
                  imageUrl={item?.profile_image}
                  fans={item.fans}
                  style={{ width: 150, marginRight: 20, height: 180 }}
                />
              }
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={(item) => item.id}
            />
          </View>
          <View
            style={{ width: '100%', height: height * 0.39, justifyContent: 'center', marginTop: 10, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
              <View>
                <Text style={[styles.textHeading, { textAlign: 'center', marginLeft: 3 }]}>Trending Products</Text>
              </View>

            </View>

            <FlatList
              data={data?.products}
              horizontal={true}
              style={{ paddingLeft: 12 }}
              renderItem={({ item }) =>
                <TrendingCards
                  onPress={() => navigation.navigate("AllCreatorsPage")}
                  imageUrl={item.image}
                  title={item?.title}
                  price={item?.price}
                  style={{ width: width * 0.38, height: height * 0.33, }}
                  imageStyle={{ width: width * 0.35, height: height * 0.22, borderRadius: 15 }}
                />
              }
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 15, paddingBottom: 15 }}>
            <Text style={styles.textHeading}>
              Buy experience with celebrities
            </Text>
            <FlatList
              data={data?.experiences}
              horizontal={true}
              style={{ paddingLeft: 10 }}
              renderItem={({ item }) =>
                <ExperienceCard
                  onPress={() => navigation.navigate("AllCreatorsPage")}
                  imageUrl={item.thumbnail}
                  title={item?.title}
                  short_desc={item?.short_desc}
                  style={{ width: width * 0.4, marginRight: 20, height: 190 }}
                />
              }
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={(item) => item.id}
            />
          </View>
          <View
            style={{ width: '100%', height: height * 0.48, justifyContent: 'center', marginTop: 10, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
              <View>
                <Text style={[styles.textHeading, { textAlign: 'center', marginLeft: 3 }]}>Win an Experience</Text>
                <Text style={{ color: '#000000', fontFamily: 'Axiforma Regular', textAlign: 'center', fontSize: RFValue(12), marginTop: 4 }}>
                  You just need to shop a product to win an amazing experience with your favourite stars.
                </Text>
              </View>

            </View>

            <FlatList
              data={data?.win_experience}
              horizontal={true}
              style={{ paddingLeft: 12 }}
              ItemSeparatorComponent={() => {
              return (<View style={{ width: width * 0.03, }} />);
              }}

              renderItem={({ item }) =>
                <WinExperienceCard
                  onPress={() => {
                    // experienceId.current=item?.id;
                    celebrityModalState.current(true)
                  }}
                  short_desc={item?.short_desc}
                  price={item?.price}
                  thumbnail={item?.thumbnail}
                  style={{ height: height * 0.32, backgroundColor: '#fff', borderRadius: 15, }}
                  imageStyle={{ width: width * 0.6, height: height * 0.18, borderRadius: 15, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}
                />
              }
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
                paddingRight: width * 0.05
              }}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={(item) => item.id}
            />
          </View>
          <ModalCelebrityProducts ModalRef={celebrityModalState} details experienceId={experienceId.current}
            onPressContinue={() => {

              celebrityModalState.current(false)

            }}

          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
