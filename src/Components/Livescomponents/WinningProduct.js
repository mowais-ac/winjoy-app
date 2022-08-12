import {
  Image,
  Platform,
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PS5 from '../../assets/imgs/ps5.png';
import bgcart from '../../assets/imgs/bgcart.png';
const {width, height} = Dimensions.get('window');
const WinningProduct = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        height: height * 0.32,
        width: '90%',
        position: 'absolute',
        bottom: '5%',
        borderRadius: 20,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Axiforma-Regular',
          fontWeight: 'bold',
          color: '#fff',
        }}>
        BETTER LUCK NEXT TIME
      </Text>
      <Text style={styles.stroktext}>YOU CAN STILL BUY</Text>
      <View style={styles.productView}>
        <View style={styles.p_topsetter}>
          <View style={styles.top_setter}>
            <View style={styles.p_des}>
              <View style={styles.bg_pImage}>
                <Image resizeMode="cover" source={PS5} style={styles.p_image} />
              </View>
              <View style={styles.inner_p_details}>
                <Text style={styles.p_title}>Men suit</Text>
                <Text numberOfLines={3} style={styles.p_detail}>
                  spend AED100 on any work that needs doing around the house.
                </Text>
                <Text style={styles.p_price}>
                  Price <Text>100</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.btn}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.inner_btn}
            colors={['#420E92', '#E7003F']}>
            <Text style={styles.btn_text}>Add to cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  productView: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: height * 0.22,
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
  },

  bg_p_details: {
    width: '100%',
    height: '90%',
  },
  p_title: {
    color: '#420E92',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 25,
  },
  inner_p_details: {
    flexDirection: 'column',
    marginLeft: 5,
    justifyContent: 'center',
  },
  p_price: {
    color: '#420E92',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 25,
  },
  p_buy_btn: {
    width: 134,
    height: 45,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btn_text: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  activity: {position: 'absolute', top: 290, left: 0, right: 0},
  left_liveinnerTop: {
    flexDirection: 'row',
    width: '33%',
    justifyContent: 'space-between',
  },
  bg_cart: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cart: {
    width: 20,
    height: 20,
    marginRight: 12,
  },

  p_topsetter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
  },
  top_setter: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 110,
    width: '94%',
  },
  p_des: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 112,
  },
  bg_pImage: {
    width: 110,
    height: 100,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  p_image: {width: 110, height: 100, borderRadius: 10},
  p_detail: {
    fontSize: 13,
    fontFamily: 'Axiforma',
    color: '#000',
    width: 200,
  },
  p_text: {
    fontSize: 15,
    fontFamily: 'Axiforma',
    padding: 8,
    textAlign: 'center',
    fontWeight: '600',
    color: '#420E92',
  },
  inner_pText: {
    fontSize: 15,
    fontFamily: 'Axiforma-Regular',
    color: '#E7003F',
    fontWeight: '700',
  },
  btn: {
    width: '85%',
    height: 45,
  },
  inner_btn: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn_text: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Axiforma',
    fontSize: 16,
  },
  strokbody: {justifyContent: 'center', alignItems: 'center'},
  stroktext: {
    textShadowColor: '#E7003F',
    textShadowOffset: {width: 0, height: 0},
    color: '#fff',
    fontSize: 28,
    textShadowRadius: 5.5,
    fontFamily: 'Axiforma-Regular',
    fontWeight: '700',
  },
});
export default WinningProduct;
