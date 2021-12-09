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
    ActivityIndicator,
    Animated
} from "react-native";
import styled from "styled-components/native";
import Video from "react-native-video";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Icon from 'react-native-vector-icons/Ionicons';
import ElimanationModal from "../../Components/ElimanationModal";
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
import { EliminateQuizResult, EliminateQuizOptions, QuizOptions, QuizResult } from "../../Components";
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
import socketIO from "socket.io-client";
const MYServer = "https://node-winjoyserver-deploy.herokuapp.com/";
const { width, height } = Dimensions.get("window");
let timer = () => { };
const BackgroundVideo = ({ route, navigation }) => {
    const socket = socketIO(MYServer);
    const { uri } = route.params;
    const [selected, setSelected] = useState(null);
    const [buffer, setBuffer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const [question, setQuestion] = useState([]);
    //const [questionIncrement, setQuestionIncrement] = useState(0);
    // const [answerId, setAnswerId] = useState(null);
    const [activityScreen, setActivityScreen] = useState(false);
    const [activity, setActivity] = useState(false);
    //  const [answer, setAnswer] = useState("");
    const [liveStream, setLiveStream] = useState(false);
    const [gameShowCheck, setGameShowCheck] = useState(false);
    const [showResult, setShowResult] = useState(false);
    // const [selectedAns, setSelectedAns] = useState("");
    const [timerFlag, setTimerFlag] = useState(false);
    const [disableQuizOptions, setDisableQuizOptions] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState(0);
    const answerId = useRef(null);
    const selectedAns = useRef(null);
    const answer = useRef(null);
    const questionRef = useRef([]);
    const questionIncrement = useRef(0);
    const attemptWrong = useRef(false);
    const ModalState = useRef();
    const userElimante = useRef(false);

    const startTimer = () => {
        timer = setTimeout(() => {
            if (timeLeft <= 0) {
                clearTimeout(timer);

                // if (timerFlag&&gameShowCheck&&!showResult) {
                //     console.log("hiii");
                //     setDisableQuizOptions(true)
                //     setTimerFlag(false)
                //   //  ModalState.current(true);
                //   }
                return false;

            }
            setTimeLeft(timeLeft - 1);
        }, 1000)
    }

    useEffect(() => {
        startTimer();
        return () => clearTimeout(timer);
    });

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
            console.log("resQuestion", res);
            questionRef.current = res;

            // setQuestion(res)
            setActivityScreen(false)

        });

    }
    const CheckResult = async () => {
        ///Check Result
        const Token = await EncryptedStorage.getItem("Token");
        const body = JSONtoForm({
            live_gameshow_id: questionRef.current[0]?.live_gameshow_id,
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
                console.log("res", res);
                if (res === "Sorry! Try Next Time") {
                    // navigation.navigate("WrongAnswer")
                    // setShowResult(true)
                } else if (res.status === "error") {
                    alert("error")
                    navigation.navigate("Landing")
                }
                else {
                    navigation.navigate("Congrats", { data: res })
                }



            });
    }
    const SaveResponse = async () => {
        setActivity(true)
        console.log("sques", questionRef.current);
        let ans = ""
        questionRef.current[questionIncrement.current]?.answer.map((item) => {
            console.log("item", item);
            if (item.is_correct === 1) {
                console.log("item.answer", item.answer);
                ans = item.answer;
            }
        })
        console.log("aaaa", ans);
        //        setAnswer(ans)
        answer.current = ans;
        // setTimer(20)
        const Token = await EncryptedStorage.getItem("Token");
        const body = JSONtoForm({
            question: questionRef.current[questionIncrement.current]?.id,
            answer: answerId.current,
            live_gameshow_id: questionRef.current[questionIncrement.current]?.live_gameshow_id,
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

                    }
                }
                else (res.status === "error")
                {
                    if (res.message === "Wrong Answer!! Don't loose hope try next time") {

                        // let inc = questionIncrement.current + 1;
                        // questionIncrement.current=inc;
                        // setGameShowCheck(true)
                        setShowResult(true)
                        if (userElimante.current === false) {
                            setTimeout(() => {
                                ModalState.current(true);
                            }, 3000);
                        }


                        //  navigation.navigate("WrongAnswer", { Tans: ans })
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

    const onPressOption = (sel, ans, ansId) => {
        setDisableQuizOptions(true)
        //  setActivity(true)
        // setAnswerId(ansId)
        answerId.current = ansId;
        // setSelectedAns(ans)
        selectedAns.current = ans;
        setSelected(sel)

    }
    const onPressContinue = () => {
        ModalState.current(false)
        userElimante.current = true;
    }
    useEffect(() => {
        // action on update of movies
    }, [answerId]);
    useEffect(async () => {
        socket.on("sendHideQuestion", msg => {
            console.log(msg);
            setGameShowCheck(false)

        });
        socket.on("sendHideAnswer", msg => { 
            console.log(msg);
        });
        socket.on("sendEndShow", msg => {
            navigation.navigate("TabsStack", { screen: "WINNERS"})
        });
        socket.on("sendCount", msg => {
            setJoinedUsers(msg)
        });
        socket.on("sendShowCorrectAnswer", msg => {
            console.log("msg", msg);

            setGameShowCheck(true)
            setShowResult(true)
            SaveResponse()
        });
        socket.on("startlivestream", msg => {
            console.log(msg);
            setLiveStream(true)

        });
        socket.on("sendStartlivegameshow", msg => {
            console.log("questionIncrement", questionIncrement);
            Questions()
            setGameShowCheck(true)
            setTimeLeft(20)
            clearTimeout(timer);
            startTimer();
            setTimerFlag(true)


        });
        socket.on("sendSwitchNextQuestion", msg => {
            console.log("msg", msg);

            if (msg === "Next question should switch") {
                let inc = questionIncrement.current + 1;
                questionIncrement.current = inc;


                setGameShowCheck(true)
                setDisableQuizOptions(false)
                setShowResult(false)
                setTimeLeft(20)
                clearTimeout(timer);
                startTimer();

                //  setTimer(20)
            }
        });

        socket.on("sendHideAnswer", msg => {
            setGameShowCheck(false)

        });




    }, []);
    // if (nextQuestion) {
    //     setTimer(20)
    //     setGameShowCheck(true)
    //     let inc = questionIncrement + 1;
    //     setQuestionIncrement(inc)
    //     setNextQuestion(!nextQuestion)

    // }


    return (
        <View style={{ backgroundColor: 'black' }}>
            {/* <BackgroundRound height={1} />
            <View style={{ height: 20 }} />
            <Header back={true} /> */}


            <Wrapper>


                <View

                    style={styles.gradientView}
                >

                    {liveStream ? (
                        <Video
                            // key={keyS}
                            source={{
                               // uri: uri
                                  uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                            }}
                            // onReadyForDisplay={readyToDisplay}
                            style={styles.backgroundVideo}
                            resizeMode={"cover"}
                            minLoadRetryCount={2}
                            fullScreen={true}
                            ignoreSilentSwitch={"obey"}
                            onLoad={() => setBuffer(false)}
                            onLoadStart={() => setBuffer(true)}
                        />
                    ) : <ActivityIndicator size="large" color={"#ffffff"} top={300} />}
                    {/* <PlayerView
                style={styles.backgroundVideo}
                ref={(e) => {
                    setPlayer(e);
                }}
            /> */}
                    {activityScreen ? (
                        <ActivityIndicator size="large" color={"black"} top={300} />
                    ) : (

                        <>
                            <View style={{ margin: 15 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="person" size={25} color="#ffffff" />
                                    <Text style={{ fontSize: 20, color: '#ffffff' }}>{joinedUsers}</Text>
                                </View>
                            </View>
                            {gameShowCheck ? (
                                userElimante.current ? (
                                    <LinearGradient style={styles.backgroundImage}
                                        colors={["rgba(128,0,128,0)", "rgba(128,0,128,0)", "#420e92", "#420e92"]}
                                    >

                                        {showResult ? (

                                            <View
                                                style={styles.quizView}
                                            >
                                                <Label primary font={26} bold dark style={{ color: "#FFFF13", }}>
                                                    Time's Up
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                                    Result
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 28 }}>
                                                    {questionRef.current[questionIncrement.current]?.question}
                                                </Label>
                                                {/* </View> */}
                                                {/* </LinearGradient> */}
                                                <EliminateQuizResult
                                                    options={questionRef.current[questionIncrement.current]?.answer}
                                                    answer={answer.current}
                                                    activity={activity}
                                                />
                                            </View>
                                        ) : (
                                            <View
                                                style={styles.quizView}
                                            >
                                                <Label primary font={26} bold dark style={{ color: "#FFFF13", }}>
                                                    {timeLeft <= 0 ? "Time's Up" : timeLeft}
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                                    Question
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 28 }}>
                                                    {questionRef.current[questionIncrement.current]?.question}
                                                </Label>
                                                {/* </View> */}
                                                {/* </LinearGradient> */}
                                                <EliminateQuizOptions options={questionRef.current[questionIncrement.current]?.answer}
                                                    //  onPressDone={onPressDone}
                                                    //  activity={activity}
                                                    optionSelected={selected}
                                                    onPressOption={onPressOption}
                                                    disableOption={true}

                                                />
                                            </View>
                                        )}
                                    </LinearGradient>
                                ) : (
                                    <LinearGradient style={styles.backgroundImage}
                                        colors={["rgba(128,0,128,0)", "rgba(128,0,128,0)", "#420e92", "#420e92"]}
                                    >

                                        {showResult ? (

                                            <View
                                                style={styles.quizView}
                                            >
                                                <Label primary font={26} bold dark style={{ color: "#FFFF13", }}>
                                                    Time's Up
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                                    Result
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 28 }}>
                                                    {questionRef.current[questionIncrement.current]?.question}
                                                </Label>
                                                {/* </View> */}
                                                {/* </LinearGradient> */}
                                                <QuizResult
                                                    options={questionRef.current[questionIncrement.current]?.answer}
                                                    answer={answer.current}
                                                    answerByUser={selectedAns.current}
                                                    activity={activity}
                                                />
                                            </View>
                                        ) : (
                                            <View
                                                style={styles.quizView}
                                            >
                                                <Label primary font={26} bold dark style={{ color: "#FFFF13", }}>
                                                    {timeLeft <= 0 ? "Time's Up" : timeLeft}
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                                    Question
                                                </Label>
                                                <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 28 }}>
                                                    {questionRef.current[questionIncrement.current]?.question}
                                                </Label>
                                                {/* </View> */}
                                                {/* </LinearGradient> */}
                                                <QuizOptions options={questionRef.current[questionIncrement.current]?.answer}
                                                    //  onPressDone={onPressDone}
                                                    //  activity={activity}
                                                    optionSelected={selected}
                                                    onPressOption={onPressOption}
                                                    disableOption={timeLeft <= 0 || disableQuizOptions ? true : false}

                                                />
                                            </View>
                                        )}
                                    </LinearGradient>
                                )
                            ) : null}
                        </>

                    )}

                </View>
            </Wrapper>
            <ElimanationModal ModalRef={ModalState} details onPressContinue={onPressContinue} />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        width: "100%",
        position: "absolute",
        // top: 70,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0,
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30

    },
    quizView: {
        height: height - 370,
        width: "100%",
        position: "absolute",
        bottom: 0,
    },
    backgroundImage: {
        height: height,
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