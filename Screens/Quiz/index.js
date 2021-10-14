// import React, { useState, useRef, useEffect } from "react";
// import {
//     StyleSheet,
//     Dimensions,
//     View,
//     Image,
//     ImageBackground,
//     ScrollView,
//     SafeAreaView,
//     Text
// } from "react-native";
// import {
//     JSONtoForm,
// } from "../../Constants/Functions";
// import LinearGradient from "react-native-linear-gradient";
// import Background from "../../Components/Background";
// import Header from "../../Components/Header";
// import Label from "../../Components/Label";
// import LongButton from "../../Components/LongButton";
// import { QuizOptions } from "../../Components";
// import EncryptedStorage from "react-native-encrypted-storage";
// import Config from "react-native-config";
// import axios from "axios";
// import BackIcon from 'react-native-vector-icons/Ionicons';
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { heightConverter, widthConverter } from "../../Components/Helpers/Responsive";
// import { RFValue } from "react-native-responsive-fontsize";
// import Colors from "../../Constants/Colors";
// const { width, height } = Dimensions.get("window");
// const index = ({ props, navigation }) => {
//     const [question, setQuestion] = useState([]);
//     const [questionIncrement, setQuestionIncrement] = useState(0);
//     const [answerId, setAnswerId] = useState();
//     const [activity, setActivity] = useState(false);
//     const Questions = async () => {

//         const Token = await EncryptedStorage.getItem("Token");
//         const requestOptions = {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${Token}`,
//             },
//         };
//         // alert(13123);
//         await axios.get(`${Config.API_URL}/begin/game/questions/answers/list`, requestOptions).then(response => {
//             let res = response.data;

//             setQuestion(res)


//         });

//     }
//     const CheckResult = async () => {
//         ///Check Result
//         const Token = await EncryptedStorage.getItem("Token");
//         const body = JSONtoForm({
//             live_gameshow_id: question[0]?.live_gameshow_id,
//         });
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${Token}`,
//             },
//             body,
//         };

//         await fetch(`${Config.API_URL}/finish/gameshow`, requestOptions)
//             .then(async (response) => response.json())
//             .then(async (res) => {
//                 if (res === "Sorry! Try Next Time") {
//                     alert("Sorry! Try Next Time")
//                     navigation.navigate("LastGameWinner")
//                 }
//                 else {
//                     navigation.navigate("Congrats", { data: res })
//                 }



//             });
//     }
//     const SaveResponse = async (ansId) => {
//         const Token = await EncryptedStorage.getItem("Token");
//         const body = JSONtoForm({
//             question: question[questionIncrement]?.id,
//             answer: ansId,
//             live_gameshow_id: question[questionIncrement]?.live_gameshow_id,
//         });
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${Token}`,
//             },
//             body,
//         };

//         await fetch(`${Config.API_URL}/save/user/response`, requestOptions)
//             .then(async (response) => response.json())
//             .then(async (res) => {
//                 if (question[question.length - 1].id === question[questionIncrement]?.id) {
//                     CheckResult()
//                 }
//                 else {
//                     let inc = questionIncrement + 1;
//                     setQuestionIncrement(inc)
//                 }


//                 setActivity(false)

//             })
//             .catch((e) => {
//                 setActivity(false)
//                 alert("Error", e);

//             });

//     }
//     const onPressDone = (ansId) => {
//         setActivity(true)
//         setAnswerId(ansId)

//         SaveResponse(ansId)



//     }
//     useEffect(async () => {
//         Questions()
//     }, []);
//     return (

//         <SafeAreaView>

//             <Background height={1} />
//             <View style={{ height: 20 }} />
//             <ScrollView>
//                 <View style={styles.Container}>

//                     <TouchableOpacity
//                         onPress={() => navigation.navigate("Landing")}
//                     >
//                         <View style={styles.containerBack}>
//                             <BackIcon name="ios-chevron-back" size={20} color="#FFFFFF" style={{ left: 5, }} />
//                             <Text style={styles.text}>Back</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>

//                 <ImageBackground
//                     source={require("../../assets/imgs/game.png")}
//                     resizeMode="cover"
//                     style={styles.backgroundImage}
//                     imageStyle={{ borderRadius: 30 }}
//                 >
//                     <LinearGradient
//                         colors={["rgba(43,23,81,0)", "rgba(43,23,81,1)"]}
//                         style={styles.gradientView}
//                     >
//                         <View style={{
//                             flex: 1,
//                             justifyContent: 'flex-end',
//                             marginBottom: 30
//                         }}>
//                             <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
//                                 Question
//                             </Label>
//                             <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 32 }}>
//                                 {question[questionIncrement]?.question}
//                             </Label>
//                         </View>
//                     </LinearGradient>
//                 </ImageBackground>

//                 <QuizOptions options={question[questionIncrement]?.answer} onPress={() => alert("hii")}
//                     onPressDone={onPressDone}
//                     optionDisable={false}
//                     activity={activity}
//                 />


//             </ScrollView>
//         </SafeAreaView>

//     );
// };

// const styles = StyleSheet.create({
//     backgroundImage: {
//         top: 50,
//         height: 350,
//         width: '100%',
//         flex: 1,
//         position: 'absolute',
//     },
//     gradientView: {
//         borderRadius: 30,
//         height: 350,
//         width: '100%',

//     },
//     scrollViewStyle: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//         paddingTop: 60
//     },
//     homeView: {
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     Margin: {
//         marginTop: height * 0.85,
//         width: width * 0.85,
//         backgroundColor: '#2B1751',

//     },
//     Container: {
//         flexDirection: "row",
//     },
//     containerBack: {
//         flexDirection: 'row',
//         width: widthConverter(90),
//         marginRight: widthConverter(-30)

//     },
//     text: {
//         fontFamily: "Axiforma-Regular",
//         fontSize: RFValue(14),
//         color: Colors.LABEL,
//         left: 4
//     },
// });



// export default index;
import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import Video from "react-native-video";


// import React, { useState, useRef, useEffect } from "react";
// import {
//     StyleSheet,
//     Dimensions,
//     View,
//     Image,
//     ImageBackground,
//     ScrollView,
//     SafeAreaView,
//     Text
// } from "react-native";
import {
    JSONtoForm,
} from "../../Constants/Functions";
import LinearGradient from "react-native-linear-gradient";
import Background from "../../Components/Background";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import { QuizOptions } from "../../Components";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from "axios";
import BackIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { heightConverter, widthConverter } from "../../Components/Helpers/Responsive";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../../Constants/Colors";
import BackgroundRound from "../../Components/BackgroundRound";
const { width, height } = Dimensions.get("window");
const BackgroundVideo = ({ props, navigation }) => {
    const [question, setQuestion] = useState([]);
    const [questionIncrement, setQuestionIncrement] = useState(0);
    const [answerId, setAnswerId] = useState();
    const [activity, setActivity] = useState(false);
    const Questions = async () => {

        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
        };
        // alert(13123);
        await axios.get(`${Config.API_URL}/begin/game/questions/answers/list`, requestOptions).then(response => {
            let res = response.data;

            setQuestion(res)


        });

    }
    const CheckResult = async () => {
        ///Check Result
        const Token = await EncryptedStorage.getItem("Token");
        const body = JSONtoForm({
            live_gameshow_id: question[0]?.live_gameshow_id,
        });
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
            body,
        };

        await fetch(`${Config.API_URL}/finish/gameshow`, requestOptions)
            .then(async (response) => response.json())
            .then(async (res) => {
                if (res === "Sorry! Try Next Time") {
                    navigation.navigate("WrongAnswer")
                }
                else {
                    navigation.navigate("Congrats", { data: res })
                }



            });
    }
    const SaveResponse = async (ansId) => {
        const Token = await EncryptedStorage.getItem("Token");
        const body = JSONtoForm({
            question: question[questionIncrement]?.id,
            answer: ansId,
            live_gameshow_id: question[questionIncrement]?.live_gameshow_id,
        });
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
            body,
        };

        await fetch(`${Config.API_URL}/save/user/response`, requestOptions)
            .then(async (response) => response.json())
            .then(async (res) => {
                if (question[question.length - 1].id === question[questionIncrement]?.id) {
                    CheckResult()
                }
                else {
                    let inc = questionIncrement + 1;
                    setQuestionIncrement(inc)
                }


                setActivity(false)

            })
            .catch((e) => {
                setActivity(false)
                alert("Error", e);

            });

    }
    const onPressDone = (ansId) => {
        setActivity(true)
        setAnswerId(ansId)

        SaveResponse(ansId)



    }
    useEffect(async () => {
        Questions()
    }, []);
    return (
        <View>
            <BackgroundRound height={1} />
            <View style={{ height: 20 }} />
            <Header back={true} />

            <Video
                source={{ uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />

            <Wrapper>


                <LinearGradient
                    colors={["rgba(0,0,0,0)", "#390c7f"]}
                    style={styles.gradientView}
                >
                    
                        <View
                            style={styles.backgroundImage}

                        >

                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                marginBottom: 30,
                            }}>
                                <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                    Question
                                </Label>
                                <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 32 }}>
                                    {question[questionIncrement]?.question}
                                </Label>
                            </View>
                            {/* </LinearGradient> */}
                        </View>
                        <QuizOptions options={question[questionIncrement]?.answer} onPress={() => alert("hii")}
                            onPressDone={onPressDone}
                            optionDisable={false}
                            activity={activity}
                        />
                    
                </LinearGradient>








            </Wrapper>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height - 70,
        position: "absolute",
        top: 70,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30

    },
    backgroundImage: {
        top: 50,
        height: 350,
        width: '100%',
        flex: 1,
        position: 'absolute',
    },
    gradientView: {
        height: height,
        width: '100%',



    },
    scrollViewStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 60
    },
    homeView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    Margin: {
        marginTop: height * 0.85,
        width: width * 0.85,
        backgroundColor: '#2B1751',

    },
    Container: {
        flexDirection: "row",
        // backgroundColor:'red'
    },
    containerBack: {
        flexDirection: 'row',
        width: widthConverter(90),
        marginRight: widthConverter(-30)

    },
    text: {
        fontFamily: "Axiforma-Regular",
        fontSize: RFValue(14),
        color: Colors.LABEL,
        left: 4
    },

});

// styled-component

export const Wrapper = styled.View`
  justify-content: space-between;

  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 100px;
  width: 100px;
  height: 100px;
`;
export const TextDescription = styled.Text`
  letter-spacing: 3;
  color: #f4f4f4;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
export const Title = styled.Text`
  color: #f4f4f4;
  margin: 50% 0px 20px;
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
`;
const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${props => (props.transparent ? "transparent" : "#f3f8ff")};
 padding:15px;
border:${props => (props.transparent ? "1px solid #f3f8ff " : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${props => (props.transparent ? "#f3f8ff " : "#666")};
`;

export const Button = ({ onPress, color, ...props }) => {
    return (
        <StyledButton {...props}>
            <StyledTitle {...props}>{props.title}</StyledTitle>
        </StyledButton>
    );
};
export default BackgroundVideo;