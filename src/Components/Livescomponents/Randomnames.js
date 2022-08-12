import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ProfilePicture from '../ProfilePicture';
const NO_PER_SCREEN = 5;
const itemWidth = Dimensions.get('window').width / NO_PER_SCREEN;

class Randomnames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
    };
  }

  _renderItem = (item, index) => {
    return (
      <View key={index}>
        <View
          style={{
            height: 'auto',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 100,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              width: 350,
              borderRadius: 10,
              marginVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 5,
              marginBottom: 5,
            }}>
            <ProfilePicture
              picture={item?.profile_image}
              id={item?.id}
              name={
                item?.first_name?.slice(0, 1)?.toUpperCase() +
                item?.last_name?.slice(0, 1)?.toUpperCase()
              }
              style={styles.avatarView}
              font={25}
            />
            <Text
              numberOfLines={1}
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: '600',
                fontFamily: 'Axiforma-Regular',
                paddingLeft: 12,
              }}>
              {item.user_name}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.startScroll();
  }

  // Clear interval when user closes
  componentWillUnmount() {
    clearInterval(this.activeInterval);
  }

  startScroll() {
    this.activeInterval = setInterval(this.scrolling, 32);
  }

  scrolling = () => {
    // Start scrolling if there's more than one stock to display
    const {data} = this.props;
    let {currentPosition} = this.state;
    if (currentPosition < 0) {
      currentPosition = 0;
    }
    if (data.length > 5) {
      // Increment position with each new interval
      const position = currentPosition + 10;
      this.ticker.scrollToOffset({offset: position, animated: false});
      // After position passes this value, snaps back to beginning
      const maxOffset = data.length * itemWidth;
      // Set animation to repeat at end of scroll
      if (currentPosition > maxOffset) {
        const offset = currentPosition - maxOffset;
        this.ticker.scrollToOffset({
          offset,
          animated: false,
        });
        this.setState({currentPosition: offset});
      } else {
        this.setState({currentPosition: position});
      }
    }
  };

  getWrappedData = () => {
    const {data} = this.props;
    const overlappingNo = this.getOverlappingNo();
    return {
      data: [...data, ...data.slice(0, overlappingNo)],
    };
  };

  getOverlappingNo = () => {
    const {data} = this.props;
    const {length} = data;
    let overlappingNo = 10;
    if (length < 10) {
      overlappingNo = length;
    }
    return overlappingNo;
  };

  render() {
    const {data} = this.getWrappedData();
    return (
      <FlatList
        initialNumToRender={4}
        ref={ref => {
          this.ticker = ref;
        }}
        getItemLayout={(_, index) => ({
          length: data.length,
          offset: itemWidth * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => this._renderItem(item, index)}
        style={styles.wrapper}
        keyExtractor={(item, index) => item.title + index}
      />
    );
  }
}

Randomnames.propTypes = {
  stockData: PropTypes.array,
};

Randomnames.defaultProps = {
  stockData: [],
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    flexGrow: 0,
    backgroundColor: 'transparent',
  },
  avatarView: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A49FAA',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
});

export default Randomnames;
