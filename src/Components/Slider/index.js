import {useEffect, useState, useRef} from 'react';
import {View, Dimensions, FlatList, Image} from 'react-native';

const Slider = () => {
  const flatListRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  //auto scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatListRef.current.scrollToIndex({index: 0, animation: true});
      } else {
        flatListRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  });
  const getItemLayout = (data, index) => ({
    length: screenWidth - 20,
    offset: (screenWidth - 20) * index,
    index: index,
  });
  const carouselData = [
    {
      id: '01',
      image: require("../../assets/imgs/banner.png")
    },
    {
      id: '02',
      image: require('../../assets/imgs/ShoppingImage.png'),
    },
    {
      id: '03',
      image: require('../../assets/imgs/ShoppingBanner.png'),
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <Image
        source={item.image}
        style={{width: screenWidth - 20, height: 165}}
        resizeMode="cover"
      />
    );
  };
  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / (screenWidth - 20);
    setActiveIndex(Math.round(index));
  };

  //render dot indicators
  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#f05b31',
              height: 5,
              width: 5,
              borderRadius: 5,
              marginHorizontal: 2,
            }}></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: 'transparent',
              height: 5,
              width: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#fff',
              marginHorizontal: 2,
            }}></View>
        );
      }
    });
  };
  return (
    <>
    <View
      style={{
        height: 165,
        width: screenWidth - 20,
        borderRadius: 8,
        alignSelf: 'center',
        position: 'relative',
        backgroundColor: '#0F0232',
        overflow: 'hidden',
      }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={carouselData}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />
      
    </View>
    <View
    style={{
      marginTop:4,
      flexDirection: 'row',
      justifyContent: 'center',
      //position: 'absolute',
      //top: 150,
      alignSelf: 'center',
    }}>
    {renderDotIndicators()}
  </View>
  </>
  );
};

export default Slider;
