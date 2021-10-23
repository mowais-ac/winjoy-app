import React, { Component, Fragment, useState, useRef, useEffect, } from "react";
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
    ActivityIndicator
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
import PlayerView from "react-native-aws-ivs-player-view";
const { width, height } = Dimensions.get("window");
const BackgroundVideo = ({ route, navigation }) => {
    const { uri } = route.params;
    const [selected, setSelected] = useState(null);
    const [buffer, setBuffer] = useState(false);
    const [timerCount, setTimer] = useState(20)
    const [question, setQuestion] = useState([]);
    const [questionIncrement, setQuestionIncrement] = useState(0);
    const [answerId, setAnswerId] = useState();
    const [activityScreen, setActivityScreen] = useState(false);
    const [activity, setActivity] = useState(false);
    const Questions = async () => {
        setActivityScreen(true)
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
            setActivityScreen(false)

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
                } else if (res.status === "error") {
                    alert("error")
                    navigation.navigate("Landing")
                }
                else {
                    navigation.navigate("Congrats", { data: res })
                }



            });
    }
    const SaveResponse = async (ansId) => {

        setTimer(20)
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
                if (res.status === "success") {
                    if (res.message === "Congrats!! move to next question") {


                        if (question[question.length - 1].id === question[questionIncrement]?.id) {
                            CheckResult()
                            // navigation.navigate("Congrats", { data: res })
                        }
                        else {
                            let inc = questionIncrement + 1;
                            setQuestionIncrement(inc)
                        }
                    }
                }
                else (res.status === "error")
                {
                    if (res.message === "Wrong Answer!! Don't loose hope try next time") {
                        navigation.navigate("WrongAnswer")
                    }
                }
                // if (question[question.length - 1].id === question[questionIncrement]?.id) {
                //     CheckResult()
                // }
                // else {
                //     let inc = questionIncrement + 1;
                //     setQuestionIncrement(inc)
                // }


                setActivity(false)
                setSelected(null)

            })
            .catch((e) => {
                setActivity(false)
                alert("Error", e);

            });

    }
    if(timerCount<=0){
        setTimer(20)
        SaveResponse(3)
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
          }, 1000) //each count lasts for a second
          //cleanup the interval on complete
          return () => clearInterval(interval)

    }
    const onPressDone = (ansId) => {
        setActivity(true)
        setAnswerId(ansId)

        SaveResponse(ansId)



    }
    const onPressOption = (sel) => {
        setSelected(sel)

    }
    useEffect(async () => {
        Questions()
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
    }, []);
    return (
        <View>
            <BackgroundRound height={1} />
            <View style={{ height: 20 }} />
            <Header back={true} />

            <Video
                // key={keyS}
                source={{
                    uri: uri
                }}
                style={styles.backgroundVideo}
                resizeMode={"cover"}
                minLoadRetryCount={2}
                fullScreen={true}
                ignoreSilentSwitch={"obey"}
                onLoad={() => setBuffer(false)}
                onLoadStart={() => setBuffer(true)}
            />
            {/* <PlayerView
                style={styles.backgroundVideo}
                ref={(e) => {
                    setPlayer(e);
                }}
            /> */}

            <Wrapper>


                <LinearGradient
                    colors={["rgba(0,0,0,0)", "#390c7f"]}
                    style={styles.gradientView}
                >

                    {activityScreen ? (
                        <ActivityIndicator size="large" color={"#ffffff"} top={300} />
                    ) : (
                        <>
                            <View
                                style={styles.backgroundImage}

                            >
                                <Label primary font={16} bold dark notAlign style={{ color: "#FFFF13", left: 10 }}>
                                    {timerCount}
                                </Label>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    marginBottom: 30,
                                }}>
                                    <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                        Question
                                    </Label>
                                    <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 28 }}>
                                        {question[questionIncrement]?.question}
                                    </Label>
                                </View>
                                {/* </LinearGradient> */}
                            </View>
                            <QuizOptions options={question[questionIncrement]?.answer}
                                onPressDone={onPressDone}
                                activity={activity}
                                optionSelected={selected}
                                onPressOption={onPressOption}

                            />
                        </>
                    )}

                </LinearGradient>








            </Wrapper>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height - 70,
        width: "100%",
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