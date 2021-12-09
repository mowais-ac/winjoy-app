import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LongButton from "../LongButton";
import styles from "./Styles";
const { StyleSheet, Dimensions } = require('react-native');
const { width, height } = Dimensions.get("window");
function EliminateQuizOptions({ options, optionSelected, onPressOption, result, onPressDone, disableOption }) {
  const [btnEnable, setBtnEnable] = useState(false);
  return (
    <>
      <View style={styles.optionsViewMain}>
        <FlatList
          data={options}
          renderItem={
            ({ item, index }) => {
              return (
                <TouchableWithoutFeedback onPress={() => {

                //  onPressOption(index,item.answer,item.id)
                 
            
                 // setBtnEnable(false)
                }}

                  disabled={disableOption}
                >


                  <View style={styles.optionView} >
                    <Text style={styles.optionsText}>
                      {item.answer}
                    </Text>
                  </View>


                </TouchableWithoutFeedback>
              )
            }
          }


        />
      </View>
    </>
  );
}

export { EliminateQuizOptions };
