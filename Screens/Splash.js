import React, { useEffect } from "react";

import { View, ActivityIndicator } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { IsVerified } from "../Constants/Functions";

export default function Splash({ navigation }) {
  useEffect(() => {
    const Check = async () => {
      try {
        var Token = await EncryptedStorage.getItem("Token");
        if (Token !== null) {
          if (await IsVerified(Token)) {
            return navigation.replace("TabsStack");
          }
        }
        await EncryptedStorage.clear();
        return navigation.replace("LoginStack");
      } catch (error) {
        console.log(error);
      }
    };
    Check();
  });
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}
