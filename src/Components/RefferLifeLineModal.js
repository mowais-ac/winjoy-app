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
  ScrollView
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
import { RefferalTextInput } from "../Components/index";
import { getLiveShowPlans } from '../redux/actions';
import { useSelector, useDispatch } from "react-redux";
import { LifeCard } from "./LifeCard/LifeCard";
import { emailRegex } from '../Constants/regex';
const { width, height } = Dimensions.get("window");
let referrals= [];
const RefferLifeLineModal = (props) => {
  const livePlans = useSelector(state => state.app.livePlans);
  const dispatch = useDispatch();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [selected, setSelected] = useState(0);
  const [id, setId] = useState(null);
  const [array, setArray] = useState([]);


  //referal 1
  const [nameRef1, setNameRef1] = useState("");
  const [numberRef1, setNumberRef1] = useState("");
  const [checkUser, setCheckUser] = useState(false);


  //referal 2
  const [names, setName] = useState([]);


  //referal 3
  const [name1Ref3, setName1Ref3] = useState("");
  const [number1Ref3, setNumber1Ref3] = useState("");

  const [name2Ref3, setName2Ref3] = useState("");
  const [number2Ref3, setNumber2Ref3] = useState("");

  const [name3Ref3, setName3Ref3] = useState("");
  const [number3Ref3, setNumber3Ref3] = useState("");

  const [name4Ref3, setName4Ref3] = useState("");
  const [number4Ref3, setNumber4Ref3] = useState("");

  const [name5Ref3, setName5Ref3] = useState("");
  const [number5Ref3, setNumber5Ref3] = useState("");

  const ApproveRef = useRef();
  const DeclineRef = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({ state, details, ForceSuccess });
  };
  useEffect(() => {
    dispatch(getLiveShowPlans());
    //  dispatch(buyLivePlans());
    console.log("liveplansModal", livePlans);
  }, []);
  const Setting = (name,number,index) => {
    referrals.push({
      name: name,
      number:number,
    });
    console.log("ref",referrals);
  };
 
 
  // const SettingNumber = (text, index) => {
  //   console.log("number",text,index);
   
  //  }
  const HandleClick = async () => {

    var postData = "";

    if (selected === 4) {
      if (!nameRef1) {
        alert("Wrong Email", nameRef1)
      } else if (!numberRef1) {
        alert("number Required")
      }
      else {
        postData = {
          "referrals": [
            {
              "phone_no": `${numberRef1}`,
              "name": `${nameRef1}`
            }
          ]
        };
        PostData(postData)
      }

    } else if (selected === 5) {
      postData = {
        "referrals": [
          {
            "phone_no": `${name1Ref2}`,
            "name": `${number1Ref2}`
          },
          {
            "phone_no": `${name2Ref2}`,
            "name": `${number2Ref2}`
          },
          {
            "phone_no": `${name3Ref2}`,
            "name": `${number3Ref2}`
          },
        ]
      };
    } else if (selected === 7) {
      postData = {
        "referrals": [
          {
            "phone_no": `${name1Ref3}`,
            "name": `${number1Ref3}`
          },
          {
            "phone_no": `${name2Ref3}`,
            "name": `${number2Ref3}`
          },
          {
            "phone_no": `${name3Ref3}`,
            "name": `${number3Ref3}`
          },
          {
            "phone_no": `${name4Ref3}`,
            "name": `${number4Ref3}`
          },
          {
            "phone_no": `${name5Ref3}`,
            "name": `${number5Ref3}`
          },
        ]
      };
    }

  };
  const PostData = async (postData) => {
    var Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(postData),
    };
    console.log("requestOptions",);
    await fetch(`${Config.API_URL}/buy_lives_plan/${id}`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        console.log("ress", res);
        // console.log("res", res.already_exist_users[0].email);
        alert(res.message)
        if (res.already_exist_users[0].email === nameRef1) {
          setCheckUser(true)
        }
      })
      .catch((e) => console.log("error", e));
  }
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

        <Text style={[styles.text, { textAlign: 'center', marginTop: height * 0.03, width: width }]}>
          Refer To Earn Lives
        </Text>

        <View style={styles.ModalBody}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity onPress={() => setSelected(0)}>
              <View style={selected === 0 ? styles.refferBoxSelected : styles.refferBox}>
                <Text style={[styles.mainTextHeading, { color: selected === 0 ? '#420E92' : '#6F5F87' }]}>Refer 1</Text>
                <Text style={[styles.textHeading, { color: selected === 0 ? '#420E92' : '#6F5F87' }]}>Earn 1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected(1)}>
              <View style={selected === 1 ? styles.refferBoxSelected : styles.refferBox}>
                <Text style={[styles.mainTextHeading, { color: selected === 1 ? '#420E92' : '#6F5F87' }]}>Refer 3</Text>
                <Text style={[styles.textHeading, { color: selected === 1 ? '#420E92' : '#6F5F87' }]}>Earn 5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected(2)}>
              <View style={selected === 2 ? styles.refferBoxSelected : styles.refferBox}>
                <Text style={[styles.mainTextHeading, { color: selected === 2 ? '#420E92' : '#6F5F87' }]}>Refer 5</Text>
                <Text style={[styles.textHeading, { color: selected === 2 ? '#420E92' : '#6F5F87' }]}>Earn 10</Text>
              </View>
            </TouchableOpacity>
          </View> */}
          <View style={{ alignItems: 'center' }}>
            <FlatList
              horizontal={true}
              style={{}}
              contentContainerStyle={{ height: height * 0.14, marginLeft: 11 }}
              // ItemSeparatorComponent={
              //   () => <View style={{ width: 10, }} />
              // }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={livePlans.plan}
              renderItem={({ item, index }) => (
                item?.type === "referral" ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.32, }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(index)
                        setId(item.id)
                      }
                      }>
                      <View style={selected === index ? styles.refferBoxSelected : styles.refferBox}>
                        <Text style={[styles.mainTextHeading, { color: selected === index ? '#420E92' : '#6F5F87' }]}>{item?.title?.split(' ')[0] + ' ' + item?.title?.split(' ')[1]}</Text>
                        <Text style={[styles.textHeading, { color: selected === index ? '#420E92' : '#6F5F87' }]}>{item?.title?.split(' ')[2] + ' ' + item?.title?.split(' ')[3]}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null

              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={{
            paddingLeft: 15,
            paddingRight: 15,
          }}>
            {selected === 4 ? (

              <RefferalTextInput
                srNumber={1}
                onChangeName={(text) => { setNameRef1(text) }}
                onChangeNumber={(text) => setNumberRef1(text)}
                validationBorder={false}
              />



            ) : null}
            {selected === 5 ? (
              <FlatList
                style={{ height: height * 0.35, width: '100%', }}


                data={[1, 2, 3]}
                renderItem={({ item, index }) => (
                  <RefferalTextInput
                    srNumber={item}
                    onChangeName={(name) => {
                      Setting(name, index)
                    }}
                    onChangeNumber={(number) => 
                      Setting(number, index)
                      }
                  />
                )}

              //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
              />
            ) : null}
            {selected === 6 ? (

              <View style={{ height: height * 0.37 }}>
                <ScrollView>
                  <RefferalTextInput
                    srNumber={1}
                    onChangeName={(text) => { setName1Ref3(text) }}
                    onChangeNumber={(text) => setNumber1Ref3(text)}
                  />
                  <RefferalTextInput
                    srNumber={2}
                    onChangeName={(text) => { setName2Ref3(text) }}
                    onChangeNumber={(text) => setNumber2Ref3(text)}
                  />
                  <RefferalTextInput
                    srNumber={3}
                    onChangeName={(text) => { setName3Ref3(text) }}
                    onChangeNumber={(text) => setNumber3Ref3(text)}
                  />
                  <RefferalTextInput
                    srNumber={4}
                    onChangeName={(text) => { setName4Ref3(text) }}
                    onChangeNumber={(text) => setNumber4Ref3(text)}
                  />
                  <RefferalTextInput
                    srNumber={5}
                    onChangeName={(text) => { setName5Ref3(text) }}
                    onChangeNumber={(text) => setNumber5Ref3(text)}
                  />
                </ScrollView>
              </View>

            ) : null}

          </View>

          <View style={{ width: '100%', paddingLeft: 15 }}>
            <TouchableOpacity
              onPress={() => { HandleClick() }}
              style={{
                height: heightConverter(20),
                width: width * 0.9,

                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.03,
                marginLeft: width * 0.014,


              }}
            >
              <View

                style={{
                  height: heightConverter(60),
                  width: width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#420e92',
                  borderRadius: 40,


                }}


              >
                {selected === 4 ? (
                  <Label primary font={16} bold style={{ color: "#ffffff" }}>
                    Refer 1 Friends
                  </Label>
                ) : selected === 5 ? (
                  <Label primary font={16} bold style={{ color: "#ffffff" }}>
                    Refer 3 Friends
                  </Label>
                ) : selected === 6 ? (
                  <Label primary font={16} bold style={{ color: "#ffffff" }}>
                    Refer 5 Friends
                  </Label>
                ) : null}
              </View>
            </TouchableOpacity>
            <LabelButton
              primary
              headingtype="h3"
              bold
              style={[styles.CloseBtn, { color: '#6F5F87', fontSize: RFValue(14) }]}
              onPress={() => {
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
              }}
            >
              Not Now
            </LabelButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RefferLifeLineModal;

const styles = StyleSheet.create({
  MainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    height: height * 0.75,
    marginTop: height * 0.25,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.WHITE,
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
    height: height * 0.6,

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
    height: height * 0.13,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  refferBoxSelected: {
    width: width * 0.29,
    height: height * 0.13,
    backgroundColor: '#F2EFF5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, borderColor: '#420E92'
  },


  text: {
    color: '#420E92', fontFamily: 'Axiforma Bold', fontSize: RFValue(14)
  },
  descriptionText: {
    color: '#000000', fontFamily: 'Axiforma Regular', fontSize: RFValue(13), textAlign: 'center', lineHeight: height * 0.03
  }
});
