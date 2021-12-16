import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

const LoaderImage = (props) => {
  const [Loader, setLoader] = useState(true);
  return (
    <>
      <Image {...props} style={[props.style, Loader && {width: 0, height: 0}]} onLoadEnd={() => setLoader(false)} />
      {Loader && (
        <View
          style={[
            props.style,
            {
              backgroundColor: "grey",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </>
  );
};

export default LoaderImage;
