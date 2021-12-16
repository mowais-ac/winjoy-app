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
              ? StatusBar.currentHeight +
                Dimensions.get("window").height * 0.005
              : 0,
        }}
      >
        {props.children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SafeArea;
