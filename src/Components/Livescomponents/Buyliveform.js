import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-native-modal';
import {LifeCard} from '../LifeCard/LifeCard';
import {getLiveShowPlans} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import BuyLifeLineModal from '../BuyLifeLineModal';
import {LifeCard2} from './LifeCard2';
import BuyLifeLineModal2 from './BuyLifelinemodal2';
const Buyliveform = props => {
  const livePlans = useSelector(state => state.app.livePlans);
  const ModalState = useRef();
  const [amount, setAmount] = useState();
  const [video, setVideo] = useState();
  const [lives, setLives] = useState();
  const [id, setId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLiveShowPlans());
  }, []);

  return (
    <Modal
      swipeDirection={['down']}
      useNativeDriverForBackdrop
      hasBackdrop={true}
      onSwipeComplete={() => props?.setBlmodalVisible(false)}
      isVisible={props.BlmodalVisible}
      style={{margin: 0}}
      onBackButtonPress={() => {
        props.setBlmodalVisible(false);
      }}>
      <TouchableOpacity
        style={styles.MainView}
        onPress={() => props?.setBlmodalVisible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.notch} />
          <View style={styles.container}>
            <View style={styles.textbody}>
              <Text style={styles.text1}>Buy Lives</Text>
            </View>
            <FlatList
              horizontal={true}
              contentContainerStyle={{
                marginVertical: 25,
              }}
              ItemSeparatorComponent={() => <View style={{width: 5}} />}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={livePlans.plan}
              renderItem={({item}) =>
                item?.type === 'buy' ? (
                  <LifeCard2
                    onPress={() => {
                      ModalState.current(true);
                      setAmount(item?.amount);
                      setLives(item?.lives);
                      setId(item?.id);
                    }}
                    amount={item?.amount}
                    lives={item?.lives}
                  />
                ) : null
              }
              keyExtractor={item => item}
            />
          </View>
          <TouchableOpacity onPress={() => props?.setBlmodalVisible(false)}>
            <Text style={styles.skiptext}>Skip for now</Text>
          </TouchableOpacity>
        </View>
        <BuyLifeLineModal2
          ModalRef={ModalState}
          details
          amount={amount}
          lives={lives}
          id={id}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  MainView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(91, 73, 118, 0.4)',
  },
  centeredView: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    // marginTop: 460,
    height: '37%',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
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
    height: 4,
    backgroundColor: '#E6DFEE',
    borderRadius: 100,
    marginTop: '5%',
    width: '40%',
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    height: '80%',
    // marginTop: '5%',
    justifyContent: 'space-evenly',
  },
  textbody: {
    marginTop: 5,
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: '#420E92',
    fontFamily: 'Axiforma',
    fontWeight: '700',
    fontSize: 16,
  },
  skiptext: {
    color: '#420E92',
    fontFamily: 'Axiforma-Regular',
    fontWeight: '600',
  },
});
export default Buyliveform;
