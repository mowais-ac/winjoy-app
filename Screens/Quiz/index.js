import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    ImageBackground,
    ScrollView,
    SafeAreaView
} from "react-native";
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
const { width, height } = Dimensions.get("window");
const index = ({ props, navigation }) => {
    const [question, setQuestion] = useState([]);
    const [questionIncrement, setQuestionIncrement] = useState(0);
    const [answerId, setAnswerId] = useState();
    const Questions = async () => {

        const Token = await EncryptedStorage.getItem("Token");
        console.log("token", Token);
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
            console.log('res', question)


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
                console.log("result",res);
                if (res === "Sorry! Try Next Time") {
                    alert("Sorry! Try Next Time")
                }
                else {
                    navigation.navigate("Congrats",{data:res})
                }



            });
    }
    const SaveResponse = async (ansId) => {
        console.log("lastindex", question[question.length - 1].id);


        const Token = await EncryptedStorage.getItem("Token");
        const body = JSONtoForm({
            question: question[questionIncrement]?.id,
            answer:ansId ,
            live_gameshow_id: question[questionIncrement]?.live_gameshow_id,
        });
        console.log("body",body);
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
                console.log("ressave", res);
                if (question[question.length - 1].id === question[questionIncrement]?.id) {
                    CheckResult()
                }
                else {
                    let inc = questionIncrement + 1;
                    setQuestionIncrement(inc)
                }




            })
            .catch((e) => {
                alert("Error", e);

            });

    }
    const onPressDone = (ansId) => {
        setAnswerId(ansId)

        SaveResponse(ansId)
    }
    useEffect(async () => {
        Questions()
    }, []);
    return (

        <SafeAreaView>

            <Background height={1} />
            <View style={{ height: 20 }} />
            <ScrollView>
                <Header back={true} />

                <ImageBackground
                    source={require("../../assets/imgs/game.png")}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                    imageStyle={{ borderRadius: 30 }}
                >
                    <LinearGradient
                        colors={["rgba(43,23,81,0)", "rgba(43,23,81,1)"]}
                        style={styles.gradientView}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            marginBottom: 30
                        }}>
                            <Label primary font={16} bold dark style={{ color: "#FFFF13", }}>
                                Question
                            </Label>
                            <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 32 }}>
                                {question[questionIncrement]?.question}
                            </Label>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                <QuizOptions options={question[questionIncrement]?.answer} onPress={() => alert("hii")}
                    onPressDone={onPressDone}
                    optionDisable={false}
                />


            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        top: 50,
        height: 350,
        width: '100%',
        flex: 1,
        position: 'absolute',
    },
    gradientView: {
        borderRadius: 30,
        height: 350,
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
});



export default index;
