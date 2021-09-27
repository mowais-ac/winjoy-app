import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback,FlatList  } from "react-native";
import styles from "./Styles";

function QuizOptions({ options, onPress,reset,result,optionDisable ,answer}) {
  console.log("optionDisable",optionDisable);
  const optArr = options?.split(",");
  //console.log("optArr", optArr);

  const [selected, setSelected] = useState(null);
  function ChangeColor(index){
    setSelected(index)
  }
  return (
   <>
    <View style={styles.optionsViewMain}>
              <FlatList
                data={optArr}
                renderItem={
                  ({ item, index }) => {
                    return (
                      <TouchableWithoutFeedback onPress={() =>{
                       setSelected(index)
                     
                      }}
                    
                      disabled={optionDisable}
                        > 
                      {
                        optionDisable?
                        (
                          <View style={[styles.optionView, { backgroundColor:'#ffffff'}]} >
                          <Text style={[styles.optionsText, { color:'#2F2442'}]}>
                            {item}
                          </Text>
                        </View>
                        ):(
                          <View style={[styles.optionView, { backgroundColor:selected===index?'#ffffff':null}]} >
                          <Text style={[styles.optionsText, { color: selected === index ? '#2F2442' : '#ffffff' }]}>
                            {item}
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
            </>
  ); 
}

export { QuizOptions };
