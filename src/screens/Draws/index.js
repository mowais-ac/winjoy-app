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
  ScrollView,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../Components/Header";
import { LifeCard, LifeCardRefferAndVideo, TopTab, WjBackground } from "../../Components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import EncryptedStorage from "react-native-encrypted-storage"; 
import I18n from 'react-native-i18n';
import axios from "axios";
import LastGame from "./LastGame";
import { RFValue } from "react-native-responsive-fontsize";
import BuyLifeLineModal from "../../Components/BuyLifeLineModal";
import WatchAddModal from "../../Components/WatchAddModal";
import RefferLifeLineModal from "../../Components/RefferLifeLineModal";
import BuyLifeCongrats from "../../Components/BuyLifeCongrats";
import { getLiveShowPlans } from '../../redux/actions';
const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {
  const livePlans = useSelector(state => state.app.livePlans);
  const ModalState = useRef();
  const AddModalState = useRef();
  const RefferModalState = useRef();
  const SucessModalState = useRef();
  const [headerValue, setHeaderValue] = useState(0);
  const [amount, setAmount] = useState();
  const [video, setVideo] = useState();
  const [lives, setLives] = useState();
  const [idVideoAdd, setIdVideoAdd] = useState();
  const [id, setId] = useState();
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLiveShowPlans());
  }, []);

  const onPressFirst = () => {
    setSelected(0)
  }
  const onPressSecond = () => {
    setSelected(1)
  }

  return (
    <SafeAreaView style={styles.safeStyle}>

      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={["#f8d7e8", "#c7dfe8"]}
        style={{ paddingBottom: 10 }}

      >

        <Header style={{
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
          width: '100%',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10
        }} />
        <ScrollView
          onScroll={(e) => {
            setHeaderValue(e.nativeEvent.contentOffset.y)
          }}
        >
          <WjBackground
            style={{ height: height * 0.24, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
          />
          <View style={{ marginTop: height * 0.09, height: height * 0.15, alignItems: 'center', }}>
            <View style={{ marginBottom: height * 0.01 }}>
              <Text style={[styles.headerText]}>Luckydraws</Text>
            </View>
            <TopTab
              onPressFirst={onPressFirst}
              onPressSecond={onPressSecond}
              selected={selected}
              firstText={"Last Game"}
              secondText={"All Time"}
            />
          </View>
          <View style={{ width: '100%', alignItems: 'center', }}>
          <LastGame
          name={"Alyce M. Cervantes"}
          date={"january 20, 2022"}
          />
          </View>
        </ScrollView>
      </LinearGradient>

    </SafeAreaView>
  );
};
export default index;
