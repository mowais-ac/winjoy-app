import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import Label from "./Label";
import LabelButton from "./LabelButton";
import { Colors, Images } from "../Constants/Index";
import LongButton from "./LongButton";
import { useNavigation } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import { GetDate, JSONtoForm } from "../Constants/Functions";
import ProfilePicture from "./ProfilePicture";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter } from "./Helpers/Responsive";
import { TrendingCards } from "../Components/index";
import { ExperienceProductData } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const ModalCelebrityProducts = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state.app.winExperienceProductData);
  const experienceID = useSelector(state => state.app.experienceID);
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });

 
  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({ state, details, ForceSuccess });
  };
  useEffect(() => {
    dispatch(ExperienceProductData(experienceID));
    console.log("dataimage", data);
  }, []);




  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ModelState.state}
      statusBarTranslucent={false}
      onRequestClose={() => {
        setModelState({
          ...ModelState,
          state: !ModelState.state,
        });
        if (props.onClose) props.onClose();
      }}
    >

      <TouchableWithoutFeedback
        onPress={() => {
          setModelState({
            ...ModelState,
            state: !ModelState.state,
          });
          if (props.onClose) props.onClose();
        }}
      >
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>
      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />

        <Text style={[styles.text, { textAlign: 'center', marginTop: height * 0.03, width: width * 0.8 }]}>
          Buy one of the following and<Text style={{ fontFamily: 'Axiforma Bold' }}>{' '}WIN a dinner with{' '}</Text>John Omarosa
        </Text>

        <View style={styles.ModalBody}>
          <FlatList
            data={data?.experience?.products}

            style={{ paddingLeft: 12, }}
            numColumns={2}

            renderItem={({ item }) =>
              <>
                <TrendingCards


                  onPress={() => navigation.navigate("ExperienceProductDetail",{experienceId:experienceID,productId: item?.id})} 
                  imageUrl={item.image}
                  title={item?.title}
                  price={item?.price}
                  mainViewStyle={{ backgroundColor: '#F2F2FA', width: width * 0.4, height: height * 0.31, borderRadius: 15, }}
                  style={{ height: height * 0.33, }}
                  imageStyle={{ width: width * 0.4, height: height * 0.22, borderRadius: 15, }}
                />
                <View style={{ width: width * 0.06, }} />
              </>
            }
            //keyExtractor={(e) => e.id.toString()}
            contentContainerStyle={{
              paddingBottom: 12,
              marginTop: 10,
            }}
            keyExtractor={(item) => item.id}
          />

        </View>
      </View>
    </Modal>
  );
};

export default ModalCelebrityProducts;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.9,
    marginTop: height * 0.1,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
    alignItems: 'center'
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.01,

  },

  ModalBody: {

    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.76,

  },
  CheckImage: {
    alignSelf: "center",
    resizeMode: "contain",
    height: height * 0.1,
    marginTop: height * 0.09,
  },
  TextHeading: {
    marginTop: height * 0.02,
  },
  RequestMsg: {
    marginTop: height * 0.01,
    width: width * 0.75,
    lineHeight: height * 0.03,
  },


  CloseBtn: {
    marginTop: height * 0.02,
  },

  ConView: {
    height: height * 0.1,
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.MUTED,
    borderBottomWidth: 1,
  },
  ProfilePicture: {
    marginLeft: width * 0.03,
  },
  ProfileInfo: {
    marginLeft: width * 0.02,
    justifyContent: "center",
  },
  ReqMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.035,
  },
  ConfirmMsg: {
    marginTop: height * 0.04,
    width: width * 0.8,
    lineHeight: height * 0.03,
  },
  ApproveBtn: {
    marginTop: height * 0.01,
  },
  DeclineBtn: {
    marginTop: height * 0.02,
  },

  ErrorView: {
    height: height * 0.44,
    marginTop: height * 0.56,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
  },
  ErrorBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.4,
  },

  ErrorTxt: {
    width: width * 0.9,
    alignSelf: "center",
  },
  ///new added
  Main1: {
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: width * 0.4,
    borderRadius: 55,
    alignSelf: "center",
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL
  },
  Main2: {
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: width * 0.9,
    borderRadius: 55,
    alignSelf: "center",
    marginTop: height * 0.011,
    borderWidth: 1,
    borderColor: Colors.DARK_LABEL
  },
  mView: {
    justifyContent: "center",

    alignSelf: "center",

  },
  MarginLarge: {
    paddingLeft: width * 0.06,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL
  },
  MarginLargeNumber: {
    paddingLeft: width * 0.02,
    fontSize: RFValue(12),
    color: Colors.PRIMARY_LABEL,
    letterSpacing: width * 0.03, width: width * 0.2,
  },
  titleTxt: {
    marginTop: height * 0.01
  },
  textHeading: {
    color: '#6F5F87', fontFamily: 'Axiforma Bold', fontSize: RFValue(16), textAlign: 'center'
  },
  mainTextHeading: {
    color: '#6F5F87', fontFamily: 'Axiforma Regular', fontSize: RFValue(16), textAlign: 'center', lineHeight: height * 0.03
  },
  refferBox: {
    width: width * 0.29,
    height: height * 0.12,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  refferBoxSelected: {
    width: width * 0.29,
    height: height * 0.12,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, borderColor: '#420E92'
  },


  text: {
    color: '#0B2142', fontFamily: 'Axiforma Regular', fontSize: RFValue(16), lineHeight: height * 0.035
  },
  descriptionText: {
    color: '#000000', fontFamily: 'Axiforma Regular', fontSize: RFValue(13), textAlign: 'center', lineHeight: height * 0.03
  }
});
