import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput
} from "react-native";

import Background from "../../Components/Background";
import SafeArea from "../../Components/SafeArea";
import Label from "../../Components/Label";
import Header from "../../Components/Header";

import { Colors } from "../../Constants/Index";
import Section from "../../Components/Section";
import UserInfo from "../../Components/UserInfo";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";
import NotFound from "../../Components/NotFound";
import { wait } from "../../Constants/Functions";
import LinearGradient from "react-native-linear-gradient";
import { heightConverter, widthConverter, widthPercentageToDP } from "../../Components/Helpers/Responsive";
import { RFValue } from "react-native-responsive-fontsize";
import LongButton from "../../Components/LongButton";
import PaymentModals from "../../Components/PaymentModals";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get("window");

const index = ({ navigation }) => {
  const ModalState = useRef();

  const [Data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(null);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(async () => {
    GetData()
  });
  const GetData = async () => {
    let dat = await AsyncStorage.getItem('ids');
    //  let data=[1,2,3,4,5]
    let ids = "";
    JSON.parse(dat).map(element => {
      ids = ids + element + ",";
    });
    console.log("ids", ids);
    console.log("dat", dat);
    let isActive = true;
    const check = async () => {
      if (Data === null) {
        const Token = await EncryptedStorage.getItem("Token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
          },
        };
        await fetch(`${Config.API_URL}/addtocart/products/collection?id=${ids}`, requestOptions)
          .then(async (response) => response.json())
          .then((res) => {
            let total = 0;
            console.log("res", res.data[0]);
            res.data[0].map(element => {
              total = total + parseFloat(element.price);
            });
            setTotal(total)
            console.log("total", total);
            if (!isActive) return;
            setData(res.data[0]);
          });
      }
    };
    check();

    return () => (isActive = false);
  }
  const RemoveItem = async (id) => {
    let dat = await AsyncStorage.getItem('ids');
    //  let data=[1,2,3,4,5]
    let array = JSON.parse(dat);
    console.log("array", array);

    const index = array.indexOf(id);
    if (index > -1) {
      array.splice(index, 1);
    }

    AsyncStorage.setItem('ids', JSON.stringify(array))
    const filteredData = Data.filter(item => item.id !== id);
    setData(filteredData)
    let total = 0;
    filteredData.map(element => {
      total = total + parseFloat(element.price);
    });
    setTotal(total)
  }
  const renderItem = ({ item }) => {
    const ImgUrl = `${Config.PRODUCT_IMG}/${item.id}/${JSON.parse(item.image)
      }`;
    return (
      // <TouchableOpacity
      //   onPress={() => navigation.navigate("WishlistDetails", { item })}
      // >
      <View>
        <Section style={styles.Section}
          disabled={true}
        //onPress={() => navigation.navigate("ProductDetails", { item })}
        >
          <View style={styles.SectionView}>
            <View style={styles.ImageView}>
              <Image
                source={{
                  uri: ImgUrl,
                }}
                style={styles.Image}
              />
            </View>
            <View style={[styles.TextView, { width: width * 0.48 }]}>
              <Label notAlign dark bold2 headingtype="h5" style={{ width: width * 0.48 }}>
                {item.title}
              </Label>
              <Label notAlign darkmuted bold headingtype="h6">
                {item.description}
              </Label>
              <Label
                notAlign
                primary
                bold
                headingtype="h4"
                style={styles.LessMargin}
              >
                Total: {+(item.price).toLocaleString()}
              </Label>
            </View>
            <TouchableOpacity onPress={() => RemoveItem(item.id)}>
              <Entypo name="cross" size={25} color={Colors.DARK_MUTED} style={{ left: 5 }} />
            </TouchableOpacity>
          </View>
        </Section>
      </View>
      // </TouchableOpacity>
    );
  };

  return (
    <SafeArea>
      <Background height={0.21} />
      <Header value={3} />
      <View style={styles.MainTop}>
        <UserInfo style={styles.header} OwnUser popup status />
      </View>
      {Data === null ? (
        <ActivityIndicator size="large" color={Colors.BLACK} />
      ) : (
        <>
          {Data.length >= 1 && (
            <Label primary bold headingtype="h4">
              Cart
            </Label>
          )}
          <View style={{ height: "70%" }}>
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={(e) => e.id.toString()}
              ListEmptyComponent={<NotFound text="Wish Lists" />}
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              contentContainerStyle={{
                paddingBottom: height * 0.28,
              }}
            />
          </View>
          <View style={styles.card2}>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthPercentageToDP("83")
            }}>
              <Text style={styles.metaText}>Total</Text>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>{total.toLocaleString()}</Text>

            </View>
            {/* <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthPercentageToDP("83")
            }}>
              <Text style={[styles.metaText, { fontWeight: 'bold' }]}>Buy a test</Text>
              <Text style={styles.text}>Gold Coin</Text>

            </View> */}
            <PaymentModals ModalRef={ModalState} details total={total} />
            <TouchableOpacity
              onPress={() => {
                ModalState.current(true);
              }}
              style={{
                height: heightConverter(55),
                width: width - 25,
                position: 'absolute',
                bottom: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{
                  height: heightConverter(55),
                  width: width - 25,
                  position: 'absolute',
                  bottom: 0,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                colors={["#420E92", "#E7003F"]}

              >
                <Label primary font={16} bold style={{ color: "#ffffff" }}>
                  Checkout
                </Label>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </>
      )}

    </SafeArea>
  );
};

const styles = StyleSheet.create({
  MainTop: {
    height: height * 0.18,
  },
  header: {
    flexDirection: "row",
    marginTop: height * 0.03,
    marginLeft: width * 0.034,
  },
  Section: {
    marginTop: height * 0.01,
    height: height * 0.15,
    justifyContent: "center",
  },
  SectionView: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    alignSelf: "center",
  },
  ImageView: {
    shadowColor: Colors.SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    width: width * 0.22,
    height: height * 0.11,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  Image: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
  },
  TextView: {
    marginLeft: width * 0.052,
  },
  LessMargin: {
    marginTop: height * 0.003,
    color: 'red'
  },
  card2: {
    width: width - 25,
    height: height * 0.13,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    bottom: 0,
    left: 2,
    alignItems: 'center',
    elevation: 3,
    position: 'absolute',
    paddingTop: 13,

  },
  metaText: {
    color: '#000000',
    fontFamily: "Axiforma-Regular",
  },
  text: {
    color: '#e7003f',
    fontFamily: "Axiforma-Regular",
  },
  ///modal styles

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  MarginLarge: {
    paddingLeft: width * 0.09,
    fontSize: RFValue(12),
    color: Colors.WHITE
  },


});
export default index;
