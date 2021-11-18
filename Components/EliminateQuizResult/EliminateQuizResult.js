import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LongButton from "../LongButton";
import styles from "./Styles";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
const { StyleSheet, Dimensions } = require('react-native');
const { width, height } = Dimensions.get("window");
function EliminateQuizResult({ options, optionSelected, answer, answerByUser, onPressDone, activity }) {
  console.log("options", options);
  console.log("answerByUser", answerByUser);
  console.log("answer", answer);
  return (
    <>
      <View style={styles.optionsViewMain}>
        <FlatList
          data={options}
          renderItem={
            ({ item, index }) => {
              return (

                <>
                  {activity ? (
                    <View style={[styles.optionView, { backgroundColor:"#ffffff" }]} >
                      <Text style={[styles.optionsText, { color:'#2F2442' }]}>
                        {item.answer}
                      </Text>

                      <ActivityIndicator size="small" color={"#2F2442"} />

                    </View>
                  ) : (
                    <View style={[styles.optionView, { backgroundColor: item.answer === answer ? '#4ce74b' : "#ffffff" }]} >
                      <Text style={[styles.optionsText, { 
                        color: answerByUser !== item.answer ? '#2F2442' : item.answer===answer?'#2F2442':'#d3001d'

                      }]}>
                        {item.answer}
                      </Text>
                      {item.answer === answer && answerByUser === item.answer ? (
                        <Icon name="check" size={30} color="#ffffff" />
                      ) : (
                        <>
                          {item.answer === answer ? (
                            <Icon name="check" size={30} color="#ffffff" />
                          ) : null}
                          {answerByUser === item.answer ? (
                            <Icon2 name="cross" size={30} color="#d3001d" />
                          ) : null}
                        </>
                      )}


                    </View>
                  )}
                </>
              )
            }
          }


        />
      </View>

    </>
  );
}

export { EliminateQuizResult };
