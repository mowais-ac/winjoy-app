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
import { AllCreatorsList} from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import types from '../../redux/types';
import ModalCelebrityProducts from "../../Components/ModalCelebrityProducts";
import ExperienceCelebrityModal from "../../Components/ExperienceCelebrityModal";
const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {
  const celebrityModalState = useRef();
  const ModalState = useRef();
  
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  const allCreatorsList = useSelector(state => state.app.allCreatorsList);
  // const [experienceId, setExperienceId] = useState();
  useEffect(() => {
    dispatch(AllCreatorsList());
    console.log("allCreatorsList",allCreatorsList);
  }, []);
  const onPressCreator = (id) => {
    // alert(id)
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
          style={{height:height}}
        >
          <WjBackground
            style={{ height: height*0.18, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
          />
          <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />

          <View style={{ marginTop: 55, alignItems: 'center', }}>

            <Text style={[styles.headerText]}>Our Creators</Text>
            <Text style={styles.subHeaderText}>Created By Stars</Text>
           
          </View>

          <View style={{ width: '100%', alignItems: 'center',marginTop:height*0.05 }}>

            <FlatList
              data={allCreatorsList?.data}
              style={{ paddingLeft: 20 }}
              numColumns={2}
             // horizontal={true}
             
              renderItem={({ item }) =>
                <FanJoyCard
                  onPress={() => {
                    onPressCreator(item?.id)

                  }}
                  name={item?.first_name + " " + item?.first_name}
                  imageUrl={item?.profile_image}
                  fans={item.fans} 

                  style={{ width: 160, marginRight: 20, height: 180 }}
                />
              } 
              //keyExtractor={(e) => e.id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
              ItemSeparatorComponent={() => (
                <View style={{height: 15 }} />
              )}
              // refreshControl={
              //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              // }
              keyExtractor={(item) => item.id}
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
