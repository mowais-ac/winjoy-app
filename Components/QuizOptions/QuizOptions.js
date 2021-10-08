import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LongButton from "../LongButton";
import styles from "./Styles";
const { StyleSheet, Dimensions } = require('react-native');
const { width, height } = Dimensions.get("window");
function QuizOptions({ options, onPress, reset, result, optionDisable, onPressDone, activity }) {
  console.log("optionDisable", optionDisable);
  console.log("options", options);

  //console.log("optArr", optArr);
  const [ansId, setAnsId] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <View style={styles.optionsViewMain}>
        <FlatList
          data={options}
          renderItem={
            ({ item, index }) => {
              return (
                <TouchableWithoutFeedback onPress={() => {
                  setSelected(index)
                  setAnsId(item.id)
                }}

                  disabled={optionDisable}
                >
                  {
                    optionDisable ?
                      (
                        <View style={[styles.optionView, { backgroundColor: '#ffffff' }]} >
                          <Text style={[styles.optionsText, { color: '#2F2442' }]}>
                            {item.answer}
                          </Text>
                        </View>
                      ) : (
                        <View style={[styles.optionView, { backgroundColor: selected === index ? '#ffffff' : null }]} >
                          <Text style={[styles.optionsText, { color: selected === index ? '#2F2442' : '#ffffff' }]}>
                            {item.answer}
                          </Text>
                        </View>
                      )
                  }
                </TouchableWithoutFeedback>
              )
            }
          }


        />
      </View>
      <View style={{ marginTop: height * 0.85,}}>
      <TouchableOpacity style={styles.Margin}
        disabled={activity}
        onPress={() => {
          onPressDone(ansId),
            setSelected(null)

          // navigation.navigate("QuizAnswer")
        }
        }
      >

        {activity ? <ActivityIndicator size="large" color={"#ffffff"} /> : <Text
          style={{
            color: '#ffffff',
            fontSize: 17,
            textAlign: 'center'
          }}
        >Done</Text>}


      </TouchableOpacity>
      </View>
    </>
  );
}

export { QuizOptions };
