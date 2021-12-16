import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Section from "../Components/Section";

import Label from "../Components/Label";
import { Colors, Images } from "../Constants/Index";
import SmallPopup from "./SmallPopup";
import { GetDate } from "../Constants/Functions";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const NotificationBar = (props) => {
  const navigation = useNavigation();
  const { item } = props;
  const styles = StyleSheet.create({
    Section: {
      marginTop: height * 0.015,
      height: height * 0.145,
    },
    SectionHead: {
      flexDirection: "column",
      height: height * 0.07,
      flexDirection: "row",
      alignItems: "center",
      marginTop: height * 0.005,
    },
    SectionImage: {
      width: width * 0.13,
      height: height * 0.05,
      resizeMode: "contain",
      marginLeft: width * 0.06,
    },

    SectionText: {
      height: height * 0.07,
      width: width * 0.92,
    },
    Text: {
      marginLeft: width * 0.06,
      marginTop: height * 0.002,
      width: width * 0.85,
    },
    TextColor: { color: Colors.DARK_LABEL },
  });

  const HandleClick = () => {
    switch (item.type) {
      case "App\\Notifications\\RequestCoinsToFriend":
        return navigation.navigate("MenuStack", {
          screen: "RequestList",
          params: { initial: item.data.transaction_id },
        });

      case "App\\Notifications\\ConnectionRequestAccepted":
      case "App\\Notifications\\FriendRequestSent":
        return navigation.navigate("MenuStack", {
          screen: "Connections",
        });

      default:
        return navigation.navigate("TransactionDetails", {
          id: item.data.transaction_id || 1,
          item,
        });
    }
  };

  const GetImage = () => {
    switch (item.type) {
      case "App\\Notifications\\TransferCoinsRequest":
      case "App\\Notifications\\TransactionStatus":
      case "App\\Notifications\\TransferCoinsAccepted":
      case "App\\Notifications\\RequestCoinsToFriend":
      case "App\\Notifications\\RequestCoinsDecline":
      case "App\\Notifications\\RequestCoinsApproved":
      case "App\\Notifications\\RequestCoinsNotifyMe":
      case "App\\Notifications\\CoinsReceived":
      case "ReceiveCoins":
        return Images.Send;

      case "App\\Notifications\\TransactionBuyCoins":
      case "App\\Notifications\\BuyCoinsRequestToAdmin":
      case "App\\Notifications\\BuyCoinsStatusChanged":
        return Images.Process;

      case "App\\Notifications\\ConnectionRequestAccepted":
      case "App\\Notifications\\FriendRequestSent":
        return Images.Connection;

      case "App\\Notifications\\CreditRequestApproved":
      case "App\\Notifications\\RequestCreditCoins":
      case "App\\Notifications\\CreditPaidNotification":
        return Images.CreditIcon;

      default:
        return Images.Withdraw;
    }
  };

  const GetText = (t) => {
    switch (t) {
      case "success":
      case "accepted":
        return "SUCCESS";
      case "processing":
      case "PENDING":
        return "PROCESS";
      default:
        return "FAIL";
    }
  };
  const GetType = () => {
    switch (item.type) {
      case "App\\Notifications\\ConnectionRequestAccepted":
        return {
          Text: "ACCEPTED",
          type: GetText(item.data.status).toLocaleLowerCase(),
        };
      case "App\\Notifications\\FriendRequestSent":
        return {
          Text: "PENDING",
          type: GetText(item.data.status).toLocaleLowerCase(),
        };

      default:
        return {
          type: GetText(item.data.status).toLocaleLowerCase(),
          Text: GetText(item.data.status),
        };
    }
  };

  const GetField = ({ item }) => {
    switch (item.type) {
      default:
        return <></>;
      case "App\\Notifications\\TransferCoinsRequest":
      case "App\\Notifications\\TransactionStatus":
      case "App\\Notifications\\TransferCoinsAccepted":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            <Label bold notAlign style={styles.TextColor} font={11}>
              Transfer {parseFloat(item.data.transfer_amount)}{" "}
              {item.data.coin_type} coins
            </Label>{" "}
            to
            <Label bold notAlign style={styles.TextColor} font={11}>
              {" "}
              {item.data.transfer_to || item.data.username}
            </Label>
          </Label>
        );

      case "App\\Notifications\\BuyCoinsRequestToAdmin":
      case "App\\Notifications\\BuyCoinsStatusChanged":
      case "App\\Notifications\\TransactionBuyCoins":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            <Label bold notAlign style={styles.TextColor} font={11}>
              Topup {+item.data.buy_coins} {item.data.coin_type} coins
            </Label>{" "}
            to
            <Label bold notAlign style={styles.TextColor} font={11}>
              {" "}
              your account
            </Label>
          </Label>
        );
      case "App\\Notifications\\WithdrawalCoins":
      case "App\\Notifications\\WithdrawalAccept":
      case "App\\Notifications\\WithdrawalDecline":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            <Label bold notAlign style={styles.TextColor} font={11}>
              Receive request
            </Label>{" "}
            for
            <Label bold notAlign style={styles.TextColor} font={11}>
              {" "}
              {+item.data.coins_withdraw || +item.data.withdrawal_ammount}{" "}
              {item.data.coin_type} coins
            </Label>
          </Label>
        );
      case "App\\Notifications\\RequestCoinsToFriend":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            <Label bold notAlign style={styles.TextColor} font={11}>
              {item.data.username}
            </Label>{" "}
            requested for
            <Label bold notAlign style={styles.TextColor} font={11}>
              {" "}
              {+item.data.request_amount || +item.data.requested_coins}{" "}
              {item.data.coin_type} coins
            </Label>
          </Label>
        );
      case "App\\Notifications\\RequestCoinsApproved":
      case "App\\Notifications\\RequestCoinsDecline":
      case "App\\Notifications\\RequestCoinsNotifyMe":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            Requested{" "}
            <Label bold notAlign style={styles.TextColor} font={11}>
              {+item.data.request_amount || +item.data.requested_coins}{" "}
              {item.data.coin_type} coins
            </Label>{" "}
            from
            <Label bold notAlign style={styles.TextColor} font={11}>
              {" "}
              {item.data.username}
            </Label>
          </Label>
        );
      case "App\\Notifications\\CoinsReceived":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            Received{" "}
            <Label bold notAlign style={styles.TextColor} font={11}>
              {+item.data.coins_transferd} {item.data.coin_type} coins
            </Label>{" "}
            from
            <Label bold notAlign style={styles.TextColor} font={11}>
              {" "}
              {item.data.username}
            </Label>
          </Label>
        );
      case "App\\Notifications\\ConnectionRequestAccepted":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            <Label
              bold
              notAlign
              style={styles.TextColor}
              font={11}
              text={item.data.sender_name}
            />{" "}
            accepted your connection request
          </Label>
        );
      case "App\\Notifications\\FriendRequestSent":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            <Label
              bold
              notAlign
              style={styles.TextColor}
              font={11}
              text={item.data.sender_name}
            />{" "}
            sent you a connection request
          </Label>
        );
      case "ReceiveCoins":
        switch (item.transaction_type) {
          case "buy_coins":
            return (
              <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
                <Label bold notAlign style={styles.TextColor} font={11}>
                  Topup {+item.amount} {item.coin_type} coins
                </Label>{" "}
                to
                <Label bold notAlign style={styles.TextColor} font={11}>
                  {" "}
                  your account
                </Label>
              </Label>
            );
          case "borrow":
            return (
              <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
                Requested for{" "}
                <Label bold notAlign style={styles.TextColor} font={11}>
                  {parseFloat(+item.amount)} {item.coin_type} credit coins
                </Label>
              </Label>
            );

          case "transfer":
          case "request":
            return (
              <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
                <Label bold notAlign style={styles.TextColor} font={11}>
                  Received {parseFloat(item.amount)} {item.coin_type} coins
                </Label>{" "}
                from
                <Label bold notAlign style={styles.TextColor} font={11}>
                  {" "}
                  {item.user_sender.user_name}
                </Label>
              </Label>
            );

          default:
            return <></>;
        }
      case "TransferCoins":
        switch (item.transaction_type) {
          case "order":
            return (
              <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
                Ordered product of{" "}
                <Label bold notAlign style={styles.TextColor} font={11}>
                  {parseFloat(item.amount)} {item.coin_type} coins
                </Label>
              </Label>
            );
          case "payoff_credit":
            return (
              <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
                Paid off{" "}
                <Label bold notAlign style={styles.TextColor} font={11}>
                  {parseFloat(item.amount)} {item.coin_type} credit coins
                </Label>
              </Label>
            );

          case "interest_rate":
            return (
              <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
                Successfully returned usage charge of{" "}
                <Label bold notAlign style={styles.TextColor} font={11}>
                  {parseFloat(item.amount)} {item.coin_type} coins
                </Label>
                for your credits
              </Label>
            );

          case "request":
          case "transfer":
            return (
              <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
                <Label bold notAlign style={styles.TextColor} font={11}>
                  Sent {parseFloat(item.amount)} {item.coin_type} coins
                </Label>{" "}
                to
                <Label bold notAlign style={styles.TextColor} font={11}>
                  {" "}
                  {item.user_receiver.user_name}
                </Label>
              </Label>
            );
          default:
            return <></>;
        }

      case "App\\Notifications\\RequestCreditCoins":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            Requested for{" "}
            <Label bold notAlign style={styles.TextColor} font={11}>
              {parseFloat(item.data.credit_amount)} {item.data.coin_type} credit
              coins
            </Label>
          </Label>
        );
      case "App\\Notifications\\CreditRequestApproved":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            Approved request for{" "}
            <Label bold notAlign style={styles.TextColor} font={11}>
              {parseFloat(item.data.credit_amount)} {item.data.coin_type} credit
              coins
            </Label>
          </Label>
        );
      case "App\\Notifications\\CreditPaidNotification":
        return (
          <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
            Successfully returned
            <Label bold notAlign style={styles.TextColor} font={11}>
              {" "}
              100 credits coins
            </Label>{" "}
          </Label>
        );
    }
  };

  const GetData = () => (
    <>
      <View style={styles.SectionHead}>
        <Image source={GetImage()} style={styles.SectionImage} />
        <SmallPopup item={GetType(item)} />
      </View>
      <View style={styles.SectionText}>
        <Label style={[styles.Text, styles.TextColor]} notAlign font={11}>
          <GetField item={item} />
        </Label>
        <Label style={[styles.Text, styles.TextColor]} notAlign light font={11}>
          {GetDate(item.updated_at)}
        </Label>
      </View>
    </>
  );

  return (
    <Section style={[styles.Section, props.style]}>
      {!props.NoTouch ? (
        <TouchableOpacity onPress={HandleClick}>
          <GetData />
        </TouchableOpacity>
      ) : (
        <GetData />
      )}
    </Section>
  );
};

export default NotificationBar;
