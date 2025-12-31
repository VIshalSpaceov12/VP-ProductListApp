import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {colors, spacing, fonts, wp, hp} from '../theme';
import images from '../assets';

interface FloatingDeleteButtonProps {
  count: number;
  onPress: () => void;
}

export const FloatingDeleteButton: React.FC<FloatingDeleteButtonProps> = ({
  count,
  onPress,
}) => {
  if (count === 0) return null;

  const handlePress = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}>
      <Image source={images.trash} style={styles.icon} />
      <Text style={styles.text}>Delete ({count})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: hp(3),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.padding.lg,
    paddingVertical: spacing.padding.md,
    borderRadius: spacing.borderRadius.xl,
    gap: spacing.sm,
    elevation: 6,
    shadowColor: colors.error,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  icon: {
    width: wp(4.5),
    height: wp(4.5),
    tintColor: colors.white,
  },
  text: {
    color: colors.white,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semibold,
  },
});
