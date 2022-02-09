import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity
} from "react-native";
import BackgroundRound from "../../Components/BackgroundRound";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import LongButton from "../../Components/LongButton";
import { ChanceCard } from "../../Components";
import { wait } from "../../Constants/Functions";
import { getProducts } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");
const index = ({ props, navigation }) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [isClosing, setIsClosing] = useState(true);
  const productsData = useSelector(state => state?.app?.productsData);
  const [headerValue, setHeaderValue] = useState(0);
  const [updateData, setUpdateData] = useState(false);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(isClosing));
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getProducts(isClosing));
    wait(500).then(() => setRefreshing(false));
  }, []);
const CategoryFunc=(index,id)=>{
  setSelected(index)
  let cat=`&category=${id}`
  dispatch(getProducts(isClosing,cat));
  setUpdateData(!updateData)
}
  return (
    <SafeAreaView>
      <BackgroundRound height={0.3} />
      <Header style={{
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: headerValue !== 0 ? 'rgba(0,0,0,0.5)' : null,
        width: '100%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
      }} />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        onScroll={(e) => {
          setHeaderValue(e.nativeEvent.contentOffset.y)
        }}
      >
        <Label primary font={16} bold dark style={{ color: "#ffff", marginTop: height * 0.07 }}>
          {t("do_not_miss_chance")}
        </Label>
        <Label primary font={16} bold dark style={{ color: "#ffff" }}>
          win great deals
        </Label>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <LongButton
            onPress={() => {
              setIsClosing(false);
              dispatch(getProducts(0));
              setUpdateData(!updateData)
            }}
            style={[styles.Margin,
            { backgroundColor: !isClosing ? "#fff" : null, borderWidth: isClosing ? 2 : null, borderColor: isClosing ? "#ffffff" : null }
            ]}
            textstyle={{ color: isClosing ? "#fff" : "#000000" }}
            text={"All " + (!isClosing ? "(" + productsData?.data?.length + ")" : "")}
            font={16}
            shadowless
          />
          <LongButton
            onPress={() => {
              setIsClosing(true);
              dispatch(getProducts(1));
              setUpdateData(!updateData)
            }}
            style={[
              styles.Margin,
              { backgroundColor: isClosing ? "#fff" : null, borderWidth: 2, borderColor: "#ffffff" },
            ]}
            textstyle={{ color: isClosing ? "#000000" : "#ffffff" }}
            text={t("closing_soon")}
            font={16}
            shadowless
          />
        </View>
        <View>

          <FlatList
            data={productsData?.categories_collection}
            scrollEnabled={true}
            extraData={updateData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                CategoryFunc(index,item?.id)
                 
                  }}>
                <Text style={{ color: selected === index ? '#fff' : '#E899B8', fontFamily: 'Axiforma-Bold', fontSize: RFValue(15) }}>{item?.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <Text style={{ color: '#000000', textAlign: 'center', width: width,}}>The list is empty</Text>
            )
            }

            contentContainerStyle={{
              paddingTop: 20,
              paddingLeft: 10,
              paddingRight: 10
            }}
            ItemSeparatorComponent={() => (
              <View style={{ width: 15 }} />
            )}
          />

        </View>
        <View>
          {/* onPress={()=>navigation.navigate("SimpeStackScreen",{screen:"ProductDetail"})}> */}


          <FlatList
            data={productsData?.data}
            scrollEnabled={false}
            extraData={updateData}
            renderItem={({ item }) => (

              <ChanceCard
                title={item?.product?.title}
                updated_stocks={item?.product?.updated_stocks}
                stock={item?.product?.stock}
                image={item?.product?.image}
                description={item?.description}
                price={item?.product?.price}
                prize_title={item.prize_title}
                data={item}
                onPress={() =>
                  navigation.navigate("ProductDetail", { data: item })
                }
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <Text style={{ color: '#000000', top: 300, textAlign: 'center', width: width,height:300,}}>The list is empty</Text>
            )
            }

            contentContainerStyle={{
              paddingBottom: height * 0.1,
            }}

          />


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Margin: {
    height: height * 0.06,
    width: width * 0.4,
    backgroundColor: "#ffffff",
  },
});

export default index;
