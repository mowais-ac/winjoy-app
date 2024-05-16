import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Colors} from '../Constants/Index';
import InputField from './InputField';
import Label from './Label';
const {width, height} = Dimensions.get('window');

const WithModal = props => {
  const [IsVisible, setIsVisible] = useState(false);
  const Data = [25, 50, 100, 150, 200, 250, 300];
  const CloseModal = () => {
    setIsVisible(!IsVisible);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (props.onChange) {
            props.onChange(props.phone ? item.phonecode : item.name);
            CloseModal();
          }
        }}
        style={[styles.CountryView, props.phone && styles.PhoneView]}>
        <Label
          dark
          text={item.name}
          notAlign={props.phone}
          style={props.phone && styles.ItemName}
        />
        {props.phone && <Label dark notAlign text={`+${item.phonecode}`} />}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={IsVisible}
      statusBarTranslucent={false}
      onRequestClose={() => CloseModal()}>
      <TouchableWithoutFeedback onPress={() => CloseModal()}>
        <View style={styles.MainView} />
      </TouchableWithoutFeedback>
      <View style={styles.ModalView}>
        <View style={styles.SmallBorder} />
        <Label primary headingtype="h3" bold2 style={styles.ModalHead}>
          Select Country
        </Label>
        <View style={styles.ModalBody}>
          {Data === null ? (
            <ActivityIndicator size="large" color={Colors.BLACK} />
          ) : (
            <View style={styles.ModalInside}>
              <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={e => e.id.toString()}
                contentContainerStyle={{
                  paddingBottom: height * 0.2,
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  UserFieldView: {
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.MUTED,
  },
  SearchInput: {
    paddingLeft: width * 0.08,
  },

  ChangeConView: {
    position: 'absolute',
    width: width * 0.2,
    marginTop: height * 0.052,
    paddingRight: width * 0.05,
    zIndex: 3,
    alignSelf: 'flex-end',
  },
  ChangeCon: {
    zIndex: 4,
  },

  MainView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: Colors.BG_MUTED,
  },
  ModalView: {
    width: width,
    height: height * 0.71,
    alignSelf: 'center',
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: Colors.BENEFICIARY,
    marginTop: height * 0.29,
  },
  ModalBody: {
    marginTop: height * 0.02,
    backgroundColor: Colors.WHITE,
    height: height * 0.61,
  },
  ModalInside: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  SmallBorder: {
    width: width * 0.35,
    height: 4,
    backgroundColor: Colors.SMALL_LINE,
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  ModalHead: {
    marginTop: height * 0.03,
  },
  TransactionInput: {
    backgroundColor: Colors.WHITE,
    marginTop: height * 0.02,
  },
  TransactionInputF: {
    color: Colors.BLACK,
  },
  CountryView: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.MUTED,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PhoneView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: width * 0.1,
  },
  ItemName: {
    width: width * 0.6,
  },
});
export default WithModal;
