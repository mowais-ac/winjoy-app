// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   FlatList,
//   ImageBackground,
//   Text,
//   Image
// } from "react-native";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { wait } from "../../Constants/Functions";
// import LoaderImage from "../../Components/LoaderImage";
// import Label from "../../Components/Label";
// import { Colors } from "../../Constants/Index";
// import { useFocusEffect } from "@react-navigation/native";
// import EncryptedStorage from "react-native-encrypted-storage";
// import Config from "react-native-config";
// const { width, height } = Dimensions.get("window");
// import axios from "axios";
// import LinearGradient from "react-native-linear-gradient";
// import HomeBottomList from "../../Components/HomeBottomList";
// import {
//   heightConverter,
//   heightPercentageToDP,
//   widthConverter,
// } from "../../Components/Helpers/Responsive";
// import BackgroundRound from "../../Components/BackgroundRound";
// import Header from "../../Components/Header";

// import AvatarBtn from "../../Components/AvatarBtn";
// import { RFValue } from "react-native-responsive-fontsize";
// import Entypo from 'react-native-vector-icons/Entypo';
// import styles from './styles';
// import { TopTab } from '../../Components';
// import dayjs from "dayjs"
// import LongButton from "../../Components/LongButton";
// import { FanJoyCard, WjBackground } from "../../Components";
// import Carousel from 'react-native-snap-carousel';
// import Video from "react-native-video";
// import { getLandingScreen } from '../../Redux/actions';
// import socketIO from "socket.io-client";
// const MYServer = "https://node-winjoyserver-deploy.herokuapp.com/";
// function ClosingSoon({ item }) {
//   let progress = item.updated_stocks
//     ? (item?.updated_stocks / item?.stock) * 100
//     : 0;

//   const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${JSON.parse(item.image)[0]
//     }`;
//   return (
//     <View
//       style={{
//         width: width * 0.38,
//         height: heightConverter(190),
//         backgroundColor: "#ffffff",
//         marginLeft: 10,
//         borderRadius: 10,
//         padding: 10,
//       }}
//     >
//       <LoaderImage
//         source={{
//           uri: ImgUrl.replace("http://", "https://"),
//         }}
//         style={{
//           width: 120,
//           height: 90,
//         }}
//         resizeMode="contain"
//       />
//       <Label primary font={11} dark style={{ color: "#000000" }}>
//         Get a chance to
//         <Label
//           notAlign
//           bold
//           primary
//           font={11}
//           bold
//           style={{ color: "#E7003F" }}
//         >
//           {" "}
//           WIN
//         </Label>
//       </Label>
//       <Label bold font={11} dark style={{ color: "#000000", width: "110%" }}>
//         {item.title}
//       </Label>
//       {/* <Label  bold font={11} dark style={{ color: "#000000", }}>
//       Edition
//       </Label> */}
//       <View style={styles.containerprogressBar}>
//         <LinearGradient
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           colors={["#E7003F", "#420E92"]}
//           style={[styles.LinerGradientProgrees, { width: `${progress}%` }]}
//         />
//         <View style={styles.GreybarWidth} />
//       </View>
//       <Label primary font={10} style={{ color: "#877C80", top: 4 }}>
//         {item.updated_stocks ? item.updated_stocks : 0} sold out of {item.stock}
//       </Label>
//     </View>
//   );
// }
// const index = (props) => {
//   const { Coins, navigation } = props;

//   const [banners, setBanners] = useState([]);
//   const [lowerBanner, setLowerBanner] = useState([]);
//   const [fanjoyData, setFanjoyData] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [refreshing, setRefreshing] = React.useState(false);
//   const [productList, setProductList] = React.useState([]);
//   const [winnerData, setWinnerData] = useState([]);
//   const [imgActive, setImgActive] = useState(0);
//   const [homeData, setHomeData] = useState([]);
//   const [gameShowData, setGameShowData] = useState([]);
//   const [time, setTime] = useState("");
//   const [activeSlide, setActiveSlide] = useState();
//   const userData = useSelector(state => state.app.userData);
//   const LandingData = useSelector(state => state.app.LandingData);
//   const [buffer, setBuffer] = useState(false);
//   const dispatch = useDispatch();
//   const socket = socketIO(MYServer);
//   console.log("LandingData", LandingData);
//   const onRefresh = React.useCallback(() => {
//     // setBanners(null);
//     setRefreshing(true);
//     dispatch(getLandingScreen());
//     var CurrentDate = dayjs().format("YYYY-MM-DDThh:mm:ss.000000Z");
//     var duration = dayjs(LandingData?.gameshow?.start_date).diff(dayjs(CurrentDate), 'seconds');
//     setTime(duration)
//     setBanners(LandingData?.banners);
//     setLowerBanner(LandingData?.lowerBanner)
//     setProductList(LandingData?.products)
//     setFanjoyData(LandingData?.funJoy)
//     initialLoad();
//     wait(2000).then(() => setRefreshing(false));
//   }, []);
//   const UpdateLandingDataOnce = () => {
//     initialLoad();
//     dispatch(getLandingScreen());
//   };
//   const initialLoad = () => {
//     dispatch(getLandingScreen());
//     var CurrentDate = dayjs().format("YYYY-MM-DDThh:mm:ss.000000Z");
//     var duration = dayjs(LandingData?.gameshow?.start_date).diff(dayjs(CurrentDate), 'seconds');
//     setTime(duration)
//     setBanners(LandingData?.banners);
//     setLowerBanner(LandingData?.lowerBanner)
//     setProductList(LandingData?.products)
//     setFanjoyData(LandingData?.funJoy)
//     setGameShowData(LandingData?.gameShow)
//   }
//   useFocusEffect(
//     React.useCallback(() => {
//       UpdateLandingDataOnce();
//       initialLoad();
//     }, [])
//   );
//   useEffect(() => {
//     setGameShowData(LandingData?.gameShow)
//   });
//   function _renderItem({ item, index }) {
//     if (item.type === "image") {
//       return (
//         <View key={index}>
//           <Image source={{ uri: Config.MAIN_URL + item.url }}
//             resizeMode={"cover"}
//             style={styles.ShoppingBanner}
//           />
//         </View>
//       )
//     } else {
//       return (
//         <View key={index}>
//           {item.url ? (
//             <Video
//               source={{ uri: Config.MAIN_URL + item.url }}  // Can be a URL or a local file.
//               // ref={(ref) => { this.player = ref }}  // Store reference
//               resizeMode={"cover"}
//               // paused={index !== activeSlide}
//               //  onError={this.onVideoError}
//               minLoadRetryCount={2}
//               fullScreen={true}
//               ignoreSilentSwitch={"obey"}
//               onLoad={() => setBuffer(false)}
//               onLoadStart={() => setBuffer(true)}
//               controls={false}
//               style={styles.ShoppingBanner}
//             />

//           ) : (null)}
//         </View>
//       )
//     }
//   }
//   return (

//     <View>
//       <Header style={{ top: 5, position: 'absolute', zIndex: 1000 }} />

//       <ScrollView
//         style={{ backgroundColor: "#f6f1f3" }}
//         refreshControl={
//           <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
//         }
//       >
//         <View style={{ width: '100%', alignItems: 'center', }}>
//           <LinearGradient colors={["#5B0C86", "#E7003F"]} style={styles.mainView}>
//             <TopTab
//             style={{marginTop:height*0.09}}
//              />

//             <View style={styles.wrap}>
//               {loader ? (
//                 <ActivityIndicator size="large" color="#fff" />
//               ) : (
//                 null
//                 // <Carousel
//                 //   layout={"default"}
//                 //   resizeMode={"cover"}
//                 //   loop={true}
//                 //   autoplay={true}
//                 //   autoplayInterval={8000}

//                 //   // ref={ref => this.carousel = ref}
//                 //   data={banners}
//                 //   sliderWidth={width}
//                 //   itemWidth={width}
//                 //   renderItem={_renderItem}
//                 //   style={styles.ShoppingBanner}
//                 //   onSnapToItem={index => setActiveSlide(index)}
//                 // />
//               )}

//             </View>
//           </LinearGradient>
//         </View>
//       </ScrollView>
//     </View >
//   );
// };

// export default index;
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
import Label from "../../Components/Label";
const { width, height } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
import HomeBottomList from "../../Components/HomeBottomList";
import { heightConverter, heightPercentageToDP, widthConverter } from "../../Components/Helpers/Responsive";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import axios from "axios";
import dayjs from "dayjs"
import socketIO from "socket.io-client";
import Header from "../../Components/Header";
const MYServer = "https://node-winjoyserver-deploy.herokuapp.com/";
const index = ({ props, navigation }) => {
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
       <Header style={{ top: 5, position: 'absolute', zIndex: 1000,left:0 }} />
      <LinearGradient
        colors={["#420E92", "#E7003F"]}
        style={styles.mainView}
      >
       
        <Text style={[styles.heading,{marginTop:40}]}>
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



export default index;
