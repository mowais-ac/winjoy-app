import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import { WalletBlanceCard, WalletLastPlayedCard } from "../../Components";
import ProfilePicture from "../../Components/ProfilePicture";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import { useTranslation } from 'react-i18next';
//I18n.locale = "ar";
import axios from 'axios';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from "../../Components/Helpers/Responsive";
const { width, height } = Dimensions.get("window");
//import { getWalletData } from '../../redux/actions/Wallet';
import { useDispatch, useSelector } from "react-redux";
import { getWalletData } from '../../redux/actions';
import dayjs from "dayjs";
import WithDrawModal from "../../Components/WithDrawModal";
import SuccessModal from "../../Components/SuccessModal";
import {
  JSONtoForm,
} from "../../Constants/Functions";
import Modals from "../../Components/Modals";
const index = ({ props, navigation }) => {
  const { t } = useTranslation();
  const [productData, setProductData] = useState([]);
  const [ammount, setAmmount] = useState(null);
  const userData = useSelector(state => state.app.userData);
  const walletData = useSelector(state => state.app.walletData);
  const dispatch = useDispatch();
  const ModalState = useRef()
  const ModalState2 = useRef()
  const ModalStateError = useRef()
  const [headerValue, setHeaderValue] = useState(0);
  const [activity, setActivity] = useState(false);

  console.log("walletData", walletData);
  useEffect(() => {
    dispatch(getWalletData());
    //  console.log("walletData",walletData);
    // const userData = JSON.parse(await EncryptedStorage.getItem("User"));
    // setuserData(userData);
    // GetData();

  }, []);
  const HandleWithdraw = async () => {
    setActivity(true)
    console.log("ammount", ammount);
    if (!ammount) {
      alert("hiii")
    } else {
      const Token = await EncryptedStorage.getItem("Token");
      const body = JSONtoForm({
        w_amount: ammount,
      });
      console.log("body", body);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body,
      };

      await fetch(`${Config.API_URL}/withdrawal`, requestOptions)
        .then(async (response) => response.json())
        .then(async (res) => {
          console.log("resWithdraw", res);
          if (res.status === "error") {
            ModalStateError.current(true, {
              heading: "Error",
              Error: res.message,
              array: res.errors ? Object.values(res.errors) : [],
            });
          }
          else {
            ModalState.current(false)
            ModalState2.current(true)
          }
          setActivity(false)
          // else {
          //   ModalState.current(true, {
          //     heading: "Error",
          //     Error: res.message,
          //     array: res.errors ? Object.values(res.errors) : [],
          //   });
          //   ButtonRef.current.SetActivity(false);
          // }
        })
        .catch((e) => {
          console.log("error", e);
          //  ButtonRef.current.SetActivity(false);
        });
    }
  }

  const onPress = () => {
    HandleWithdraw()
  }
  return (
    <SafeAreaView>
      <BackgroundRound height={0.14} />
      <Header style={{
           position: 'absolute',
            zIndex: 1000,
             backgroundColor:headerValue!==0?'rgba(0,0,0,0.5)':null,
              width: '100%',
              height:height*0.07,
              paddingTop:5,
              borderBottomRightRadius:10,
              borderBottomLeftRadius:10
               }}
               back={true}
                />
      <ScrollView
         onScroll={(e)=>{
          setHeaderValue(e.nativeEvent.contentOffset.y) 
      }}
      >
        <View style={{ flexDirection: 'row', width: widthConverter(420), marginLeft: 25, marginTop: height*0.06, }}>
          <View style={styles.avatarView}>
            <ProfilePicture
              picture={userData?.profile_image}
              id={userData?.id}
              name={(userData?.first_name.slice(0, 1) + userData?.last_name.slice(0, 1))}
              style={styles.avatarView}
              font={28}
            />
          </View>

          <View style={{ width: widthConverter(250), marginLeft: widthConverter(8), marginTop: 2 }}>
            <Text style={{ color: "#FFFFFF", marginTop: 8, fontFamily: "Axiforma-Bold", fontSize: 15 }}>
              {userData?.first_name?.charAt(0).toUpperCase() + userData?.first_name.slice(1)} {userData?.last_name?.charAt(0).toUpperCase() + userData?.last_name.slice(1)}
            </Text>
            <Text

              style={{ color: "#FFFFFF", marginTop: 2, fontFamily: "Axiforma-Bold", fontSize: 12 }}
            >
              {userData?.designation || "Senior Product Analyst"}
              <Text style={{ color: "#e2acc7", fontFamily: "Axiforma-Regular", fontSize: 12 }}>
                {" "}
                at{" "}
              </Text>
              {userData?.company_name || "MicroSoft"}
            </Text>
          </View>
        </View>

        <View style={{paddingBottom:height*0.05}}>

          <WalletBlanceCard
            yourBalance={walletData?.wallet?.your_balance === null ? 0 : walletData?.wallet?.your_balance}
            onPressWithdraw={() => ModalState.current(true)}
          />
          <WalletLastPlayedCard
            onPress={() => navigation.navigate("LastGameWinner")}
            noOfQuestions={walletData?.wallet?.no_of_question === null ? 0 : walletData?.wallet?.no_of_question}
            wonPrize={walletData?.wallet?.won_prize === null ? 0 : walletData?.wallet?.won_prize}

          /> 
          <View
            style={{
              width: width - 25,
              height: heightConverter(500),
              backgroundColor: "#ffffff",
              marginLeft: 10,
              borderRadius: 10,
              padding: 10,
              top: height * 0.06,
              left: 2,
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
              marginBottom: 15,
            }}
          >

            <View style={{ marginLeft: 30 }}>
              <Label notAlign primary font={14} bold style={{ color: "#E7003F", }}>
                {t("last_five_transcation")}
              </Label>
              <FlatList
                data={walletData?.transaction}
                contentContainerStyle={{
                  //paddingBottom: height * 0.48,
              
                }}
                scrollEnabled={true}
                // ListEmptyComponent={
                //   <NotFound
                //     text="Games"
                //     desc="You don't have win any Games yet "
                //     ConModal
                //   />
                // }
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        marginTop: 10,
                        height: 1,
                        width: "92%",
                        backgroundColor: "#dedae9",
                      }}
                    />
                  );
                }}
                renderItem={({ item, index }) => {
                  return (

                    <View style={{
                      flexDirection: 'row',
                      width: widthConverter(300),
                      marginTop: 7

                    }}>
                      <View style={{ marginTop: 10 }}>
                        <Image
                          style={styles.tinyLogo}
                          source={require('../../assets/imgs/lpgame.png')}
                        />
                      </View>
                      <View style={{
                        width: widthConverter(200),
                        marginLeft: 15,

                      }}>
                        <Text style={styles.text}>
                          {item?.amount}
                        </Text>
                        <Text style={styles.text2}>
                          {dayjs(item.transaction_date).format('DD MMM, YYYY')}
                        </Text>
                      </View>

                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView> 
      <WithDrawModal ModalRef={ModalState}
        details
        onPressWithDrawal={() => onPress()}
        yourBalance={walletData?.wallet?.your_balance === null ? 0 : walletData?.wallet?.your_balance}
        AmmountHandleChange={(text) => setAmmount(text)}
        ammount={ammount}
        activity={activity}
      />
      <SuccessModal ModalRef={ModalState2}
        details
        requestOnPress={() => ModalState2.current(false)}
        closeOnPress={() => ModalState2.current(false)}
        yourBalance={walletData?.wallet?.your_balance === null ? 0 : walletData?.wallet?.your_balance}
       
      />
      <Modals ModalRef={ModalStateError} Error />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Margin: {
    height: height * 0.06,
    width: width * 0.4,
    backgroundColor: "#ffffff",
  },
  avatarView: {
    //position: 'absolute',

    width: widthConverter(70),
    height: widthConverter(70),
    borderRadius: heightConverter(130),
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ffffff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  aView: {
    alignItems: "center",
    width: widthConverter("100%"),
    marginTop: 20,
  },
  tinyLogo: {
    width: 30,
    height: 20,
  },
  text: {
    fontFamily: "Axiforma-SemiBold",
    color: '#000000',
    fontSize: 14
  },
  text2: {
    fontFamily: "Axiforma-Light",
    color: "#627482",
    fontSize: 14
  }
});

export default index;
