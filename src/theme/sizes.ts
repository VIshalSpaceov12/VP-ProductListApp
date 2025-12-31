// Responsive sizing utilities based on screen dimensions
import {Dimensions, Platform} from 'react-native';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const getPortraitDimensions = () => {
  const {width, height} = Dimensions.get('window');
  return {
    width: Math.min(width, height),
    height: Math.max(width, height),
  };
};

export const SCREEN_WIDTH = getPortraitDimensions().width;
export const SCREEN_HEIGHT = getPortraitDimensions().height;

export const hs = (size: number): number => {
  const {width} = getPortraitDimensions();
  return (width / BASE_WIDTH) * size;
};

export const vs = (size: number): number => {
  const {height} = getPortraitDimensions();
  return (height / BASE_HEIGHT) * size;
};

export const ms = (size: number, factor: number = 0.5): number => {
  return size + (hs(size) - size) * factor;
};

// Width and height percentage-based sizing
export const wp = (percentage: number): number => {
  const {width} = getPortraitDimensions();
  return (width * percentage) / 100;
};

export const hp = (percentage: number): number => {
  const {height} = getPortraitDimensions();
  return (height * percentage) / 100;
};

export const deviceInfo = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
} as const;
