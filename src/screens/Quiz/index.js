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
import Icon from 'react-native-vector-icons/Ionicons';
import ElimanationModal from "../../Components/ElimanationModal";
import UseLifeLineModal from "../../Components/UseLifeLineModal";
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
import socketIO from "socket.io-client";
import ProgressCircle from 'react-native-progress-circle';
import { connect, useDispatch, useSelector } from "react-redux";
import types from '../../redux/types';
const MYServer = "https://node-winjoyserver-deploy.herokuapp.com/";
const { width, height } = Dimensions.get("window");
let timer = () => { };
const BackgroundVideo = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.app.userData);
    const [availLifeActivity, setAvailLifeActivity] = useState(false);
    const socket = socketIO(MYServer);
    const { uri } = route.params;
    const [selected, setSelected] = useState(null);
    const [buffer, setBuffer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
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
    const livecheck = useRef(0);
    const attemptWrong = useRef(false);
    const ModalState = useRef();
    const userElimante = useRef(false);
    const LifeLineModalState = useRef();

    const startTimer = () => {
        timer = setTimeout(() => {
            if (timeLeft <= 0) {
                clearTimeout(timer);

                // if (timerFlag && gameShowCheck && !showResult) {
                //     setDisableQuizOptions(true)
                //     setTimerFlag(false)
                //     ModalState.current(true);
                // }
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
            questionRef.current = res;
            // setQuestion(res)
            setActivityScreen(false)
        });

    }
    const DeductLive = async () => {
        setAvailLifeActivity(true)
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

        await fetch(`${Config.API_URL}/deduct_lives/${questionRef.current[questionIncrement.current]?.live_gameshow_id}`, requestOptions)
            .then(async (response) => response.json())
            .then(async (res) => {
                setAvailLifeActivity(false)
                console.log("resUseLife", res);
                if (res.message = "Live availed successfully") {

                    dispatch({
                        type: types.USER_DATA,
                        userData: res?.user,
                        //  user: res.data.data,
                    });
                    LifeLineModalState.current(false)
                }
                else {
                    ModalState.current(true);
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
                setActivity(false)
            }
        })
        //        setAnswer(ans)
        answer.current = ans;
        // setTimer(20)
        console.log("answerId.current ", answerId.current);
        if (answerId.current === null || answerId.current === undefined) {
            if (userElimante.current === true)
                ModalState.current(false);
            else
                ModalState.current(true);
        }
        else {
            const Token = await EncryptedStorage.getItem("Token");
            const body = JSONtoForm({
                question: questionRef.current[questionIncrement.current]?.id,
                answer: answerId.current,
                live_gameshow_id: questionRef.current[questionIncrement.current]?.live_gameshow_id,
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

            await fetch(`${Config.API_URL}/save/user/response`, requestOptions)
                .then(async (response) => response.json())
                .then(async (res) => {
                    console.log("saveRes", res)
                    if (res.status === "success") {
                        if (res.message === "Congrats!! move to next question") {

                        }
                    }
                    else if (res.status === "error") {
                        if (res.message === "Wrong Answer!! Don't loose hope try next time") {
                            if (userElimante.current !== true) {
                                ModalState.current(true);
                                if (livecheck.current <= 4) {
                                    LifeLineModalState.current(true)
                                    livecheck.current = livecheck.current + 1;
                                    console.log("livecheck", livecheck.current);
                                } else {
                                    ModalState.current(true);
                                }
                            }








                            //  setShowResult(true)
                            // if (userElimante.current === false) {
                            //     setTimeout(() => {
                            //         ModalState.current(true);
                            //     }, 3000);
                            // }


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
    const onPressContinueLifeLine = () => {
        ModalState.current(false)
        DeductLive()
    }
    const onPressNotNow = () => {
        LifeLineModalState.current(false)
        ModalState.current(true)
    }
    // useEffect(() => {
    //     // action on update of movies
    // }, [answerId]);
    useEffect(async () => {
        console.log("uri", uri);
        socket.on("sendHideQuestion", msg => {
            console.log(msg);
            setGameShowCheck(false)

        });
        socket.on("sendHideAnswer", msg => {
            console.log(msg);
        });
        socket.on("sendEndShow", msg => {
            console.log("msg", msg);
            navigation.navigate("BottomTabStack", { screen: "WINNERS" })
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
        socket.on("sendOnboarding", msg => {
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
            // LifeLineModalState.current(true)
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
                                uri: uri
                                // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
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
                            <ImageBackground
                                resizeMode="center"
                                style={{ width: 60, height: 50, top: height * 0.05, right: 10, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}
                                source={require('../../assets/imgs/pinkHeart.png')}
                            >

                                <Text style={{ color: "#E7003F", fontFamily: 'Axiforma SemiBold', fontSize: RFValue(15) }}>
                                    {userData?.lives_count}
                                </Text>
                            </ImageBackground>
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
                                                <Label primary bold dark style={styles.questionTitle}>
                                                    Result
                                                </Label>
                                                <Label primary bold dark style={styles.questionTitle}>
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
                                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <ProgressCircle
                                                        percent={(timeLeft * 100) / 20}
                                                        radius={35}
                                                        borderWidth={6}
                                                        color={timeLeft < 10 ? 'red' : '#490d8e'}
                                                        shadowColor="#d3d9dd"
                                                        bgColor="#fff"
                                                    >
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12, }}>
                                                                {timeLeft <= 0 ? "Time's Up" : timeLeft}
                                                            </Text>

                                                        </View>
                                                    </ProgressCircle>
                                                </View>
                                                <Label primary bold dark style={styles.questionTitle}>
                                                    Question
                                                </Label>
                                                 <Label primary bold dark style={styles.questionTitle}>
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
                                                <Label primary bold dark style={styles.questionTitle}>
                                                    Result
                                                </Label>
                                                 <Label primary bold dark style={styles.questionTitle}>
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
                                                {/* <Label primary font={26} bold dark style={{ color: "#FFFF13", }}>
                                                    {timeLeft <= 0 ? "Time's Up" : timeLeft}
                                                </Label> */}
                                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <ProgressCircle
                                                        percent={(timeLeft * 100) / 20}
                                                        radius={35}
                                                        borderWidth={6}
                                                        color={timeLeft < 10 ? 'red' : '#490d8e'}
                                                        shadowColor="#d3d9dd"
                                                        bgColor="#fff"
                                                    >
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <Text style={{ fontFamily: 'Axiforma-SemiBold', fontSize: 12, color: "#E7003F", lineHeight: 12, }}>
                                                                {timeLeft <= 0 ? "Time's Up" : timeLeft}
                                                            </Text>

                                                        </View>
                                                    </ProgressCircle>
                                                </View>
                                                <Label primary bold dark style={styles.questionTitle}>
                                                    Question
                                                </Label>
                                                <Label primary font={14} bold dark style={{ color: "#ffff", lineHeight: 28, }}>
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
            <UseLifeLineModal ModalRef={LifeLineModalState} details onPressContinueLifeLine={onPressContinueLifeLine}
                onPressNotNow={onPressNotNow}
                availLifeActivity={availLifeActivity}

            />
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
        height: height * 0.6,
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
    questionTitle: {
        color: "#ffff",
        lineHeight: 28,
        fontSize:RFValue(14)
    }

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