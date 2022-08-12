import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import arrow from '../../assets/imgs/r-arrow.png';
const {width, height} = Dimensions.get('window');
import ChatList from './ChatList';
import {ScrollView} from 'react-native-gesture-handler';
const Chat = props => {
  const [Inputdata, setInputdata] = useState();
  const [arr, setarr] = useState([]);
  console.log(props?.userInfo?.user_name);

  const updatedArray = [
    ...arr,
    {
      msg: Inputdata,
      name: props?.userInfo?.user_name,
    },
  ];

  return (
    <View style={styles.mainbody}>
      <View style={styles.innerbody}>
        <View style={{height: 270, marginBottom: 5}}>
          <ScrollView>
            {arr.map((item, index) => {
              return (
                <ChatList
                  key={index}
                  userInfo={props?.userInfo}
                  Inputdata={item?.msg}
                  name={item?.name}
                />
              );
            })}
          </ScrollView>
        </View>
        {/* <View>
          <ChatList userInfo={props?.userInfo} Inputdata={Inputdata} />
           <ChatList />
          <ChatList />
          <ChatList /> 
        </View> */}
        <View style={styles.msgbody}>
          <TextInput
            value={Inputdata}
            placeholder="write something here"
            placeholderTextColor={'#fff'}
            keyboardType={'default'}
            onChangeText={text => {
              setInputdata(text);
            }}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              setInputdata(), setarr(updatedArray);
            }}
            style={styles.msgbtn}>
            <Image source={arrow} style={{width: 15, height: 15}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.livebody}>
        <View style={styles.innerlivecontent}>
          <Image style={styles.liveimg} />
          <View style={{width: 135}}>
            <Text style={styles.livetext1}>Get chance to</Text>
            <Text style={styles.livetext2}>
              Win{' '}
              <Text numberOfLines={2} style={styles.livetext3}>
                gourmet dining on a bus
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.innerlive}>
          <Text style={styles.livetext4}>30 Lives</Text>
          <TouchableOpacity onPress={props?.onPress} style={styles.livebtn}>
            <Text style={styles.livetext5}>Enter Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainbody: {
    height: height * 0.55,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    alignItems: 'center',
  },
  innerbody: {
    height: height * 0.4,
    width: '98%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  msgbody: {
    backgroundColor: '#000000',
    opacity: 0.25,
    height: 50,
    width: '95%',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  livebody: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: height * 0.13,
    width: '90%',
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerlivecontent: {
    flexDirection: 'row',
    width: '65%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  msgbtn: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 10,
    height: 50,
    width: '90%',
    borderRadius: 100,
    color: '#fff',
  },
  liveimg: {
    backgroundColor: 'red',
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  livetext1: {
    color: '#777777',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
    fontSize: 15,
  },
  livetext2: {
    color: '#420E92',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
    fontSize: 15,
  },
  livetext3: {
    color: '#E7003F',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
    fontSize: 15,
  },
  livetext4: {
    color: '#420E92',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Axiforma',
  },
  livetext5: {
    color: '#fff',
    fontFamily: 'Axiforma-Regular',
    fontSize: 15,
  },
  livebtn: {
    backgroundColor: '#420E92',
    width: 95,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerlive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
});
export default Chat;
