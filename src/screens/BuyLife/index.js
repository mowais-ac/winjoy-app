import React, { useState, useEffect, useRef } from "react";
import {
    Image,
    SafeAreaView,
    View,
    StyleSheet,
    Dimensions,
    Alert,
    FlatList,
    Text,
    ScrollView
} from "react-native";
import Header from "../../Components/Header";
import { LifeCard, LifeCardRefferAndVideo, RewardzButton, WjBackground } from "../../Components";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import EncryptedStorage from "react-native-encrypted-storage";
import I18n from 'react-native-i18n';
import axios from "axios";
import Config from "react-native-config";
I18n.locale = "ar";
import { strings } from "../../i18n";
import { RFValue } from "react-native-responsive-fontsize";
import BuyLifeLineModal from "../../Components/BuyLifeLineModal";
import WatchAddModal from "../../Components/WatchAddModal";
import RefferLifeLineModal from "../../Components/RefferLifeLineModal";

const { width, height } = Dimensions.get("window");
const index = ({ route, navigation }) => {
    const ModalState = useRef();
    const AddModalState = useRef();
    const RefferModalState = useRef();
 
    useEffect(() => {
    }, []);



    return (
        <SafeAreaView style={styles.safeStyle}>
            <ScrollView>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={["#f8d7e8", "#c7dfe8"]}
                    style={{ paddingBottom: 10 }}

                >
                    <WjBackground
                        style={{ height: 155, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
                    />
                    <Header style={{ top: 0, position: "absolute", marginTop: 10 }} />

                    <View style={{ marginTop: height * 0.1, alignItems: 'center', }}>

                        <Text style={[styles.headerText]}>Buy Life Lines</Text>
                        <Text style={styles.subHeaderText}>Stay in the game even with the wrong answer!</Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: height * 0.08 }}>
                        <Text style={[styles.heading2Text, { fontSize: RFValue(30), marginTop: height * 0.03 }]}>
                            Sorry!
                        </Text>
                        <Text style={styles.text}>
                            You don’t have any life line currently, please use the following link to buy
                        </Text>
                        <Text style={[styles.text, { color: '#420E92', marginTop: height * 0.035 }]}>
                            Buy Life Lines
                        </Text>
                        <FlatList
                            horizontal={true}
                            contentContainerStyle={{ marginTop: 20 }}
                            ItemSeparatorComponent={
                                () => <View style={{ width: 10, }} />
                            }
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={[1, 2, 3]}
                            renderItem={({ item }) => (
                                <LifeCard
                                    onPress={() =>   ModalState.current(true)}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                        <Text style={[styles.text, { color: '#420E92', fontFamily: "Axiforma Bold", marginTop: height * 0.035 }]}>
                            OR
                        </Text>
                        <Text style={[styles.text, { color: '#420E92', marginTop: height * 0.035 }]}>
                            Earn Life Lines
                        </Text>
                        <View style={{ marginTop: height * 0.03, width: "94%", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <LifeCardRefferAndVideo
                                imagePath={require('../../assets/imgs/videoIcon.png')}
                                heading={"Watch a video"}
                                description={"Eearn 1 life line"}
                                onPress={()=>AddModalState.current(true)}
                            />
                            <LifeCardRefferAndVideo
                                imagePath={require('../../assets/imgs/letterIcon.png')}
                                heading={"Refer Friends"}
                                description={"Earn Lives"}
                                onPress={()=>RefferModalState.current(true)}
                            />
                        </View>
                    </View>
                    <BuyLifeLineModal ModalRef={ModalState} details 
                   // onPressContinue={onPressContinue} 
                    />
                     <WatchAddModal ModalRef={AddModalState} details 
                   // onPressContinue={onPressContinue} 
                    />
                    <RefferLifeLineModal  ModalRef={RefferModalState} details/>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};
export default index;
