import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Text,
  FlatList
} from "react-native";
import Label from "../../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import HomeBottomList from "../../../Components/HomeBottomList";
import { heightConverter, heightPercentageToDP, widthConverter } from "../../../Components/Helpers/Responsive";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from "axios";
import dayjs from "dayjs"
import socketIO from "socket.io-client";
const MYServer = "https://node-winjoyserver-deploy.herokuapp.com/";
const LiveGameShows = ({ props, navigation }) => {
  const socket = socketIO(MYServer);
  useEffect(() => {

  
   
    socket.on("start", msg => {
     // alert("hii")
      console.log("msgg", msg);
    });
    socket.on("startlivestream", msg => {
      // alert("hii")
       console.log("list", msg);
     });
     socket.on("sendStartlivegameshow", msg => {
      // alert("hii")
       console.log("game", msg);
     });
    // socket.on("start", msg => {
    //  console.log("msg",msg);
    //   // console.log("msg", msg);
    // });

    LiveStream()
    PastWinner();
    GameBtnStat()
  }, [])
  const submitChatMessage = () => {
    let dat = "waqarrr";
    socket.emit('livestream', dat);

  }
  const [winnerData, setWinnerData] = useState([]);
  const [navToQuiz, setNavToQuiz] = useState(false);
  const [liveStreamUri, setLiveStreamUri] = useState("");
  const [gameBtnText, setGameBtnText] = useState(true);
  const [livegameData, setLivegameData] = useState([]);
  const PastWinner = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);

    await axios.get(`${Config.API_URL}/livegameshow/all/winners/list`, requestOptions).then(response => {
      let res = response;
      setWinnerData(res?.data)
    });

  }

  const StartGame = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);

    await axios.get(`${Config.API_URL}/livegameshow`, requestOptions).then(response => {
      let res = response.data;
      console.log("StartGame", res);
      if (res.status === "success") {
        if (res.message === "Game Show Available") {
          setLivegameData(res)
          LetBegain(res?.LivegameShow?.id)
          //   navigation.navigate("SimpeStackScreen", { screen: "Quiz",
          //  // params:{liveGameShowId: res.LivegameShow.id}
          //  })
        } else {
          alert(res)
        }
      }
    });

  }
  const LiveStream = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);

    await axios.get(`${Config.API_URL}/livestream/available`, requestOptions).then(response => {
      let res = response.data;
      console.log("reslink", res);
      if (res) {
        setLiveStreamUri(res?.livestream_url)
      }

    });

  }
  const LetBegain = async (Lid) => {
    console.log("lid", Lid);
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);

    await axios.get(`${Config.API_URL}/lets/begin?live_gameshow_id=${Lid}`, requestOptions).then(response => {
      let res = response.data;
      console.log("letbegain", res);
      if (res.status === "success") {
        if (res.message === "Welcome to Live Game Show") {
          navigation.navigate("SimpeStackScreen", { screen: "Quiz", params: { selected: liveStreamUri } })

        }
      }
      else if (res.status === "error") {
        if (res.message === "Sorry! you have already played.") {

          alert(res.message)
        }
        else {

        }
      }

    });

  }
  const GameBtnStat = async () => {
    const Token = await EncryptedStorage.getItem("Token");
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    // alert(13123);

    await axios.get(`${Config.API_URL}/user/game/status`, requestOptions).then(response => {
      let res = response.data;
      console.log("reee", res);
      if (res.status === "success") {
        if (res.message === "Welcome to Live Game Show.") {
          setGameBtnText(true)
        } else {
          alert(res)
        }
      }
    });

  }


  return (
    <ScrollView
      style={{ backgroundColor: "#ffffff" }}
    >
      <LinearGradient
        colors={["#420E92", "#E7003F"]}
        style={styles.mainView}
      >

        <Text style={styles.heading}>
          Daily Challenge & Win
        </Text>
        <Label primary font={16} bold dark style={{ color: "#ffff", lineHeight: 27 }}>
          Answer 12 simple questions and <Label primary font={16} bold dark style={{ color: "yellow", }}>
            WIN
          </Label>
          <Label primary font={20} bold dark style={{ color: "#ffff", }}>
            {" "}amazing prizes
          </Label>
        </Label>
        {gameBtnText ? (
          <TouchableOpacity
            onPress={() => {
              StartGame()
               // submitChatMessage()
            }

            }>
            <View style={styles.btnView}>
              <Label primary font={16} bold dark style={{ color: "#EA245A", }}>
                Let's Begin
              </Label>
            </View>
          </TouchableOpacity>
        ) : (null)}
        <LinearGradient
          colors={["#FFFF13", "#A4FF00"]}
          style={styles.newGameView}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        >
          <Label primary font={16} bold dark style={{ color: "#420E92", }}>
            NEXT GAME
          </Label>
          <Label primary font={16} dark style={{ color: "#420E92", }}>
            {dayjs(livegameData?.LivegameShow?.start_date).format('DD-MMMM-YYYY hh:mm a')}

          </Label>
        </LinearGradient>
      </LinearGradient>
      <HomeBottomList data={winnerData} />
      <View style={{ marginBottom: height * 0.05 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: heightPercentageToDP('50'),
    width: width,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center'
  },
  newGameView: {
    marginTop: 10,
    width: width - 25,
    height: heightConverter(100),
    justifyContent: 'center',
    borderRadius: 20
  },
  btnView: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: width - 200,
    height: heightConverter(60),
    justifyContent: 'center',
    borderRadius: 30
  },
  heading: {
    color: "#ffff",
    fontFamily: "Axiforma-Regular",
    fontSize: 35,
    width: widthConverter(210),
    textAlign: 'center',
    lineHeight: heightConverter(40),
    marginTop: heightConverter(30)
  }
});



export default LiveGameShows;
