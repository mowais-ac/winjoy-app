import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const SafeArea = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          paddingTop:
            Platform.OS === "android"
              ? 0
              : 0,
        }}
      >
        {props.children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SafeArea;
