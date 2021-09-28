import {Dimensions, PixelRatio} from 'react-native';
const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const widthConverter = (value) => {
  const percent = (value / 375) * 100;
  return widthPercentageToDP(percent);
};

const heightConverter = (value) => {
  const percent = (value / 812) * 100;
  return heightPercentageToDP(percent);
};

export {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
};
