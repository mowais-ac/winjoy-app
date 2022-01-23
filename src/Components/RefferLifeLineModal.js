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
import { RefferalTextInput } from "../Components/index";
import { getLiveShowPlans } from '../redux/actions';
import { useSelector, useDispatch } from "react-redux";
import { LifeCard } from "./LifeCard/LifeCard";
import { numericRegex, alphabetRegex } from '../Constants/regex';
import Modals from "../Components/Modals";
import BuyLifeCongrats from "./BuyLifeCongrats";
const { width, height } = Dimensions.get("window");

let li = [{
  sr: 1,
  status: false,
  status2: false
}];
let reff = [{
  name: null,
  phone_no: null
}];

const RefferLifeLineModal = (props) => {

  const ModalState = useRef();
  const ModalStateError = useRef();
  const livePlans = useSelector(state => state.app.livePlans);
  const dispatch = useDispatch();
  const [ModelState, setModelState] = useState({
    state: false,
    details: null,
  });
  const [selected, setSelected] = useState(0);
  const [id, setId] = useState(0);
  const [validatorIndex, setValidatorIndex] = useState(false);
  //const validatorIndex=[]; 
  const [updateData, setUpdateData] = useState(false);
  const [refferalLivePlans, setRefferalLivePlans] = useState([]);
  const [totalRef, setTotalRef] = useState([]);

  const [loader, setLoader] = useState(false);


  const ApproveRef = useRef();
  const DeclineRef = useRef();

  const navigation = useNavigation();
  const SucessModalState = useRef();

  useEffect(() => {
    if (props.ModalRef) props.ModalRef.current = HandleChange;
  });

  const HandleChange = (state, details = null, ForceSuccess = false) => {
    setModelState({ state, details, ForceSuccess });
  };
  useEffect(() => {
    dispatch(getLiveShowPlans());
    console.log("livePlansModal", livePlans.plan);
    let li = [];
    let idforFirst;
    livePlans.plan.forEach(element => {
      console.log("element", element);
      if (element.type === "referral") {
        li.push(element)

        if (element.required_referrals === 1) {
          console.log("element", element.id);
          idforFirst = element.id;
        }
      }


    });
    setRefferalLivePlans(li);
    setId(idforFirst)
      
  }, []);
  const onPressRefTab = (index, item) => {
    li = [];
    reff = [];
    setTotalRef(item.required_referrals)
    setSelected(index)
    setId(item.id)
    console.log("num", item.required_referrals);
    for (var i = 0; i < item?.required_referrals; ++i) {
      console.log("i", i);
      li.push({
        sr: i + 1,
        status: false,
        status2: false
      })
      reff.push({
        name: null,
        phone_no: null
      })
    }
  }
  const SettingName = (name, index) => {
    // if (name === "" || name === undefined || name === null) {
    //   li[index].status = true;
    // } else {
    //   li[index].status = false
    // }
    reff[index].name = name;
    // if(reff[index].name===""){
    //   setIsValid(index)
    // }
    console.log("reff", reff);
  }
  const SettingNumber = (number, index) => {
    reff[index].phone_no = number
    console.log("reff", reff);
    // phoneArr[index] = number;
    // console.log("phoneArr", phoneArr);

  }

  // const SettingNumber = (text, index) => {
  //   console.log("number",text,index);

  //  }
  const HandleClick = async () => {
    
    let validToPost = true;
    var postData = "";
    reff.forEach((element, index) => {
      if (element.name !== "" && element.name !== null && element.name !== undefined && alphabetRegex.test(element?.name)) {
        li[index].status = false;
      }
      else {
        li[index].status = true;
        console.log("chek", li[index].status);
      }
      if (element.phone_no !== "" && element.phone_no !== null && element.phone_no !== undefined && numericRegex.test(element?.phone_no) && element?.phone_no.length === 11) {
        li[index].status2 = false;
      }
      else {
        li[index].status2 = true;
        console.log("chek2", li[index].status2);
      }
    });
    li.forEach(element => {
      if (element.status === true) {
        validToPost = false;
      }
      if (element.status2 === true) {
        validToPost = false;
      }
    });
    setUpdateData(!updateData)
    if (validToPost) {
      postData = {
        "referrals": reff
      };
      PostData(postData)
    }

    // if (dataCheck === true) {
    //   setUpdateData(!updateData)
    // }
    // else {
    //   var postData = "";
    //   postData = {
    //     "referrals": reff
    //   };
    //   PostData(postData)
    // }


    // if (selected === 4) {
    //   referrals.push({
    //     name: nameRef1,
    //     phone_no: numberRef1,
    //   });
    // }
    // else if (selected === 5) {
    //   var postData = "";
    //   postData = {
    //     "referrals": reff
    //   };
    //   PostData(postData)
    // }
    // else if (selected === 6) {
    //   var postData = "";
    //   postData = {
    //     "referrals": reff
    //   };
    //   PostData(postData)
    // }
  };
  const PostData = async (postData) => {
    setLoader(true)
    console.log("postData", postData);
    console.log("id", id);

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
    await fetch(`${Config.API_URL}/buy_lives_plan/${id}`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        setLoader(false)
        console.log("ress", res);
        if (res.status === "success") {
          dispatch(getLiveShowPlans());
          SucessModalState.current(true)
        }
        else {
          ModalStateError.current(true, {
            heading: "Error",
            Error: res.message,
            // array: res.errors ? Object.values(res.errors) : [],
          });
        }



      })
      .catch((e) =>{
        setLoader(false)
         console.log("error", e)});
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
              data={refferalLivePlans}
              renderItem={({ item, index }) => (
                item?.type === "referral" ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.32, }}>
                    <TouchableOpacity
                      onPress={() => {
                        onPressRefTab(index, item)
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
            {selected === 0 ? (
              <FlatList
                style={{ height: height * 0.35, width: '100%', }}
                data={li}
                extraData={updateData}
                renderItem={({ item, index }) => (
                  <RefferalTextInput
                    srNumber={item.sr}
                    validationBorderName={item.status}
                    validationBorderNumber={item.status2}
                    onChangeName={(name) => {
                      if (!name) {
                        SettingName(name, index)
                      } else {
                        SettingName(name, index)
                      }

                    }}
                    onChangeNumber={(number) => {
                      if (!number) {
                        SettingNumber(number, index)
                      } else {
                        SettingNumber(number, index)
                      }
                    }
                    }
                  />
                )}

              //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
              />
            ) : null}
            {selected === 1 ? (
            
              <FlatList
                style={{ height: height * 0.35, width: '100%', }}
                data={li}
                extraData={updateData}
                renderItem={({ item, index }) => (
              
                  <RefferalTextInput
                    srNumber={item.sr}
                    validationBorderName={item.status}
                    validationBorderNumber={item.status2}
                    onChangeName={(name) => {
                      if (!name) {
                        SettingName(name, index)
                      } else {
                        SettingName(name, index)
                      }

                    }}
                    onChangeNumber={(number) => {
                      if (!number) {
                        SettingNumber(number, index)
                      } else {
                        SettingNumber(number, index)
                      }
                    }
                    }
                  />
                   
                )}

              //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
              />
             
            ) : null}
            {selected === 2 ? (
              <FlatList
                style={{ height: height * 0.35, width: '100%', }}
                data={li}
                extraData={updateData}
                renderItem={({ item, index }) => (
                  <RefferalTextInput
                    srNumber={item.sr}
                    validationBorderName={item.status}
                    validationBorderNumber={item.status2}
                    onChangeName={(name) => {
                      if (!name) {
                        SettingName(name, index)
                      } else {
                        SettingName(name, index)
                      }

                    }}
                    onChangeNumber={(number) => {
                      if (!number) {
                        SettingNumber(number, index)
                      } else {
                        SettingNumber(number, index)
                      }
                    }
                    }
                  />
                )}

              //   ListEmptyComponent={this.RenderEmptyContainerOnGoing()}
              />
            ) : null}

          </View>

          <View style={{ width: '100%', paddingLeft: 15 }}>
            <TouchableOpacity
              onPress={() => { HandleClick() }}
              disabled={loader}
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
                {loader ? (
                  <ActivityIndicator size="large" color={"#ffffff"} />
                ) : (
                  selected === 0 ? (
                    <Label primary font={16} bold style={{ color: "#ffffff" }}>
                      Refer 1 Friends
                    </Label>
                  ) : selected === 1 ? (
                    <Label primary font={16} bold style={{ color: "#ffffff" }}>
                      Refer {totalRef} Friends
                    </Label>
                  ) : selected === 2 ? (
                    <Label primary font={16} bold style={{ color: "#ffffff" }}>
                      Refer {totalRef} Friends
                    </Label>
                  ) : null
                )}

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
            <Modals ModalRef={ModalStateError} Error />
            <BuyLifeCongrats ModalRef={SucessModalState}
              heading={"Congratulations"}
              description={"4 lives are ready to use. Feel free to play more games & win amazin prizes."}
              requestOnPress={() => {

                SucessModalState.current(false)

              }}
              closeOnPress={() => {
                SucessModalState.current(false)
                setModelState({
                  ...ModelState,
                  state: !ModelState.state,
                });
              }}
            />
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
