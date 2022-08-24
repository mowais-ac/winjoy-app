import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {io} from 'socket.io-client';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import arrow from '../../assets/imgs/r-arrow.png';
const {width, height} = Dimensions.get('window');
import ChatList from './ChatList';
import {ScrollView} from 'react-native-gesture-handler';
const Chat = props => {
  const [Inputdata, setInputdata] = useState('');
  const msgg = useRef();
  const [user, setUser] = useState('');
  const [data, setData] = useState([]);
  const socket = io('https://node-winjoyserver-deploy.herokuapp.com/');
  const [arr, setarr] = useState([]);

  const addTodo = useCallback(() => {
    socket.on('userConnected', data => {
      setUser(data);
      console.log('user', data);
    });
    socket.on('sendMessage', msg => {
      let clonearray = [...data];
      setData(clonearray.concat(msg.message));
    });
  }, [data, user]);
  useEffect(() => {
    addTodo();
  }, [data]);
  /* const updatedArray = [
    ...arr,
    {
      msg: data,
      name: user,
    },
  ]; */

  const sendMessage = () => {
    if (!!Inputdata) {
      socket.emit('sendChatMessage', Inputdata);
      socket.emit('newUser', props?.userInfo?.user_name);
      setInputdata();
      return;
    }
    alert('please enter your message');
  };

  return (
    <View style={styles.mainbody}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={{height: '100%'}}
        enableAutoAutomaticScroll={Platform.OS === 'ios'}
        extraHeight={130}
        extraScrollHeight={130}>
        <View style={styles.innerbody}>
          <View
            style={{
              // backgroundColor: 'pink',
              marginBottom: 10,
              height: 325,
            }}>
            <FlatList
              inverted={true}
              data={data}
              renderItem={({item}) => {
                return (
                  <ChatList
                    //key={index}
                    // userInfo={props?.userInfo}
                    Inputdata={item}
                    name={user}
                  />
                );
              }}
            />
          </View>

          <View style={styles.msgbody}>
            <TextInput
              value={Inputdata}
              placeholder="write something here"
              placeholderTextColor={'#fff'}
              keyboardType={'default'}
              onChangeText={text => {
                setInputdata(text);
              }}
              onSubmitEditing={sendMessage}
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.msgbtn}>
              <Image source={arrow} style={{width: 15, height: 15}} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.livebody}>
        <View style={styles.innerlivecontent}>
          <Image style={styles.liveimg} source={{uri: props?.data?.image}} />
          <View style={{width: 135, marginLeft: 5}}>
            <Text style={styles.livetext1}>Get chance to</Text>
            <Text style={styles.livetext2}>
              Win{' '}
              <Text numberOfLines={2} style={styles.livetext3}>
                {props?.data?.title}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.innerlive}>
          <Text style={styles.livetext4}>{props.data.lives} Lives</Text>
          <TouchableOpacity onPress={props?.onPress} style={styles.livebtn}>
            {props.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.livetext5}>Enter Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainbody: {
    height: 550,
    // height: 450,
    // backgroundColor: 'pink',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    alignItems: 'center',
  },
  innerbody: {
    //width: '98%',
    // top: 50,
    borderRadius: 20,
    alignItems: 'center',
    //backgroundColor: 'red',

    // justifyContent: 'space-between',
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
    height: 105,
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
    justifyContent: 'flex-start',
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
