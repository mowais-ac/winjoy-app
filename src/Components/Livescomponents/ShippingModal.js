import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import donation from '../../assets/imgs/d.png';
import check from '../../assets/imgs/c.png';
import meal from '../../assets/imgs/meal.png';
import plant from '../../assets/imgs/plant.png';
const ShippingModal = ({
  modalVisible,
  setModalVisible,
  paymentMethod,
  setPaymentMethod,
  setShippingAddress,
  OrderDetail,
}) => {
  return (
    <Modal
      swipeDirection={['down']}
      useNativeDriverForBackdrop
      hasBackdrop={true}
      onSwipeComplete={() => setModalVisible(false)}
      isVisible={modalVisible}
      style={{margin: 0}}
      onBackButtonPress={() => {
        setModalVisible(false);
      }}>
      <View style={styles.modalView}>
        <View style={styles.notch} />
        <View style={styles.container}>
          <View style={styles.shipmaintext}>
            <Text style={styles.shiptext}>Shipping Address</Text>
          </View>
          <View
            style={[
              styles.pickup,
              {borderColor: paymentMethod === 'pickup' ? '#420E92' : '#ECF1F9'},
            ]}>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('pickup')}
                style={styles.checkBox}>
                {paymentMethod == 'pickup' && (
                  <Image source={check} style={styles.checkImage} />
                )}
              </TouchableOpacity>
              <Text style={styles.pickuptext1}>Pickup</Text>
            </View>
            <Text style={styles.pickuptext2}>
              Floor # 24, Room # 2402, API Wolrd Tower, Sheikh Zayed Road, Dubai
            </Text>
          </View>
          <View
            style={[
              styles.deliver,
              {
                borderColor:
                  paymentMethod === 'deliver' ? '#420E92' : '#ECF1F9',
              },
            ]}>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('deliver')}
                style={styles.checkBox}>
                {paymentMethod == 'deliver' && (
                  <Image source={check} style={styles.checkImage} />
                )}
              </TouchableOpacity>
              <Text style={styles.delivertext1}>Deliver</Text>
            </View>
            <Text style={styles.delivertext2}>Delivery charges: AED 15</Text>
            <View style={styles.inputtext}>
              <TextInput placeholder="Enter address" />
            </View>
          </View>
          <View style={styles.donatemaintext}>
            <Text style={styles.donatetext}>Donate</Text>
          </View>
          <View
            style={[
              styles.donate,
              {
                borderColor:
                  paymentMethod === 'donation' ? '#420E92' : '#ECF1F9',
              },
            ]}>
            <View style={styles.icon}>
              <Image source={donation} style={styles.donateimg} />
            </View>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('donation')}
                style={styles.checkBox}>
                {paymentMethod == 'donation' && (
                  <Image source={check} style={styles.checkImage} />
                )}
              </TouchableOpacity>
              <Text style={styles.donatetext1}>ShareTheMeal.org</Text>
            </View>
            <Text style={styles.donatetext2}>Make a donation</Text>
            <Text style={styles.donatetext3}>
              Our mission objective at fortunaze is to transform lives, not just
              those of our customers but of children who are less fortunate
              around the world.{' '}
            </Text>
          </View>

          <View
            style={[
              styles.plant,
              {borderColor: paymentMethod === 'plant' ? '#420E92' : '#ECF1F9'},
            ]}>
            <View style={styles.icon}>
              <Image source={plant} style={styles.plantimg} />
            </View>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('plant')}
                style={styles.checkBox}>
                {paymentMethod === 'plant' && (
                  <Image source={check} style={styles.checkImage} />
                )}
              </TouchableOpacity>
              <Text style={styles.planttext1}>For Our Emirates We Plant</Text>
            </View>
            <Text style={styles.planttext2}>Plant a tree</Text>
            <Text style={styles.planttext3}>
              For Every WinJoy purchases, we plant a tree with Emirates
              Environmental Group.
            </Text>
          </View>
          <View
            style={[
              styles.meal,
              {borderColor: paymentMethod === 'meal' ? '#420E92' : '#ECF1F9'},
            ]}>
            <View style={styles.icon}>
              <Image source={meal} style={styles.mealimg} />
            </View>
            <View style={styles.mainbtn}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('meal')}
                style={styles.checkBox}>
                {paymentMethod == 'meal' && (
                  <Image source={check} style={styles.checkImage} />
                )}
              </TouchableOpacity>
              <Text style={styles.mealtext1}>
                Donate a meal with every purchase
              </Text>
            </View>
            <Text style={styles.mealtext2}>Donate a meal</Text>
            <Text style={styles.mealtext3}>
              For Every WinJoy purchases, we donate a meal to 1 Billion Meals.
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={OrderDetail()} style={styles.enterbtn}>
          <Text style={styles.entertext}>Enter Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closebtn}>
          <Text style={styles.closetext}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ShippingModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    tintColor: '#420E92',
  },
  modalView: {
    backgroundColor: 'white',
    width: '99%',
    marginTop: 40,
    height: '95%',
    borderWidth: 2,
    borderColor: '#20212429',
    borderRadius: 5,
    paddingHorizontal: '3%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 4,
    shadowRadius: 19.46,
    elevation: 4,
  },
  notch: {
    height: 5,
    backgroundColor: '#E6DFEE',
    borderRadius: 100,
    marginTop: '5%',
    width: '40%',
    alignSelf: 'center',
  },
  container: {
    height: '78%',
    marginTop: '5%',
    /* borderColor: 'lightgrey',
    borderRadius: 20,
    borderWidth: 1, */
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 3,
    marginRight: '3%',
    top: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: '3%',
    top: '15%',
  },
  shipmaintext: {height: 30, justifyContent: 'center'},
  shiptext: {
    color: '#420E92',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Axiforma',
  },
  pickup: {
    height: '15%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: '#F7F9FE',

    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  mainbtn: {flexDirection: 'row', justifyContent: 'flex-start'},
  pickuptext1: {color: '#420E92', fontSize: 15},
  pickuptext2: {
    paddingLeft: '10%',
    color: 'black',
    fontSize: 12,
  },
  deliver: {
    height: '18%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: '#F7F9FE',

    borderWidth: 1,
    borderRadius: 10,
  },
  delivertext1: {color: '#420E92', fontSize: 15},
  delivertext2: {
    paddingLeft: '10%',
    color: 'black',
    fontSize: 12,
  },
  inputtext: {
    marginTop: '2%',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  donatemaintext: {height: 30, justifyContent: 'center'},
  donatetext: {
    color: '#420E92',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Axiforma',
  },
  donate: {
    height: '19%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: '#F7F9FE',
    borderRadius: 10,

    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  donateimg: {height: '100%', width: '100%', resizeMode: 'contain'},
  donatetext1: {color: 'green', fontSize: 12},
  donatetext2: {
    paddingLeft: '10%',
    color: '#420E92',
    fontSize: 15,
  },
  donatetext3: {
    paddingLeft: '10%',
    color: 'black',
    fontSize: 12,
    textAlign: 'justify',
  },
  plant: {
    height: '18%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F9FE',

    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  plantimg: {height: '100%', width: '100%', resizeMode: 'contain'},
  planttext1: {color: 'green', fontSize: 12},
  planttext2: {
    paddingLeft: '10%',
    color: '#420E92',
    fontSize: 15,
  },
  planttext3: {
    paddingLeft: '10%',
    color: 'black',
    fontSize: 12,
    textAlign: 'justify',
  },

  meal: {
    height: '18%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F9FE',

    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  mealimg: {height: '100%', width: '100%', resizeMode: 'contain'},
  mealtext1: {color: 'green', fontSize: 12},
  mealtext2: {
    paddingLeft: '10%',
    color: '#420E92',
    fontSize: 15,
  },
  mealtext3: {
    paddingLeft: '10%',
    color: 'black',
    fontSize: 12,
    textAlign: 'justify',
  },

  enterbtn: {
    height: 45,
    marginTop: '7%',
    backgroundColor: '#420E92',
    borderRadius: 50,
  },
  entertext: {
    fontSize: 17,
    fontFamily: 'Axiforma',
    color: '#fff',
    marginTop: '3%',
    alignSelf: 'center',
  },
  closebtn: {
    height: 43,
    marginTop: '2%',
    backgroundColor: '#fff',
    borderColor: '#420E92',
    borderWidth: 1,
    borderRadius: 50,
  },
  closetext: {
    fontSize: 17,
    fontFamily: 'Axiforma',
    color: '#420E92',
    marginTop: '3%',
    alignSelf: 'center',
  },
});
