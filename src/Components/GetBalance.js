import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FormatNumber, GetCoins, GetMaxCoins } from "../Constants/Functions";
import { Images } from "../Constants/Index";
import CoinsModal from "./CoinsModal";
import InputField from "./InputField";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const GetBalance = (props) => {
  const [ChangedCoin, setChangedCoin] = useState(null);
  const ModalRef = useRef();
  const Data = useSelector((state) => state.Coins);

  const NoTouch = true;

  return (
    Data !== null &&
    (props.OnlyView || NoTouch ? (
      <View style={styles.CoinModalDisplay}>
        <Image source={Images.Gold} style={styles.CoinIcon} />
        <InputField
          Icon="balance"
          editable={false}
          value={
            Data
              ? `${FormatNumber(+Data.Balance["Gold Coins"])} Gold Coins`
              : "Loading"
          }
        />
      </View>
    ) : (
      <>
        <CoinsModal ModalRef={ModalRef} onApprove={(e) => setChangedCoin(e)} />
        <TouchableOpacity
          style={styles.CoinModalDisplay}
          onPress={() =>
            ModalRef.current(
              true,
              ChangedCoin !== null
                ? ChangedCoin
                : Data !== undefined
                ? GetMaxCoins(Data.Balance).id
                : 0
            )
          }
        >
          {ChangedCoin === null ? (
            Data.Balance !== undefined && (
              <Image
                source={Images[GetMaxCoins(Data.Balance).type.split(" ")[0]]}
                style={styles.CoinIcon}
              />
            )
          ) : (
            <Image
              source={Images[GetCoins(Data, ChangedCoin)[0].split(" ")[0]]}
              style={styles.CoinIcon}
            />
          )}
          <InputField
            Icon="balance"
            editable={false}
            value={
              ChangedCoin === null
                ? Data
                  ? `${GetMaxCoins(Data.Balance).coins} ${
                      GetMaxCoins(Data.Balance).type
                    }`
                  : "Loading"
                : `${GetCoins(Data, ChangedCoin)[1]} ${
                    GetCoins(Data, ChangedCoin)[0]
                  }`
            }
          />
        </TouchableOpacity>
      </>
    ))
  );
};

const styles = StyleSheet.create({
  CoinModalDisplay: {
    marginTop: height * 0.015,
    flexDirection: "row",
    alignSelf: "center",
  },
  CoinIcon: {
    position: "absolute",
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: "contain",
    alignSelf: "center",
    left: width * 0.24,
    alignSelf: "center",
    zIndex: 2,
  },
});

export default GetBalance;
