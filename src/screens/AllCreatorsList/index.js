import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import {FanJoyCard, WjBackground} from '../../Components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {AllCreatorsList} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/types';
import Icon from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');
const index = ({route, navigation}) => {
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const [resData, setResData] = useState([]);
  const [insearchData, setInsearchData] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const allCreatorsList = useSelector(state => state.app.allCreatorsList);
  // const [experienceId, setExperienceId] = useState();
  useEffect(() => {
    dispatch(AllCreatorsList());
    console.log('allCreatorsList', allCreatorsList);
    setResData(allCreatorsList?.data);
    setInsearchData(allCreatorsList?.data);
  }, []);
  const onPressCreator = id => {
    // alert(id)
    dispatch2({
      type: types.CREATOR_ID,
      creatorId: id,
      //  user: res.data.data,
    });
    navigation.navigate('CreatorsPage');
  };
  const searchEmployee = value => {
    const filteredContacts = insearchData.filter(item => {
      console.log('item', item);
      let contactLowercase = (
        item.first_name +
        ' ' +
        item.last_name
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setResData(filteredContacts);
  };
  return (
    <SafeAreaView style={styles.safeStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f8d7e8', '#c7dfe8']}
        style={{height: height}}>
        <WjBackground
          style={{
            height: height * 0.25,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        />
        <Header style={{top: 0, position: 'absolute', marginTop: 10}} />

        <View style={{marginTop: 55, alignItems: 'center'}}>
          <Text style={[styles.headerText]}>Our Creators</Text>
          <Text style={styles.subHeaderText}>Created By Stars</Text>
        </View>

        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {showResult ? (
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '80%',
                borderRadius: 25,
                marginRight: 40,
              }}>
              <TextInput
                style={{
                  paddingVertical: height * 0.015,
                  paddingLeft: 20,
                  fontFamily: 'Axiforma-Regular',
                  color: '#000000',
                }}
                onChangeText={text => searchEmployee(text)}
                // value={number}
                placeholder="Search by name"
                placeholderTextColor={'#420E92'}
                keyboardType="default"
              />
            </View>
          ) : null}
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              setShowResult(!showResult);
            }}>
            <Icon name="search" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: height * 0.07,
          }}>
          {resData ? (
            <ScrollView>
              {/* height issue here */}
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  margin: 5,
                  height: 1120,
                }}>
                {resData.map((item, index) => {
                  return (
                    <View style={{padding: 10, width: '50%'}}>
                      <FanJoyCard
                        key={index}
                        name={item?.first_name + ' ' + item?.last_name}
                        imageUrl={item?.profile_image}
                        fans={item.fans}
                        id={item.id}
                      />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : null}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default index;
