import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import LongButton from "../LongButton";
import styles from "./Styles";

function QuizOptions({ options, onPress, reset, result, optionDisable, onPressDone }) {
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
      <LongButton style={styles.Margin}
        textstyle={{ color: '#ffffff' }}
        text="Done"
        font={17}
        onPress={() => {
          onPressDone(ansId),
            setSelected(null)

          // navigation.navigate("QuizAnswer")
        }
        }
      />
    </>
  );
}

export { QuizOptions };
