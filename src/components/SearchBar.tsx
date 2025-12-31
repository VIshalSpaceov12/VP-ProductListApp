import React, {useRef} from 'react';
import {View, TextInput, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, Keyboard} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {colors, spacing, fonts, wp, hp} from '../theme';
import images from '../assets';
import {SortOrder} from '../types';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  sortOrder: SortOrder;
  onSortPress: () => void;
}

const getSortIcon = (order: SortOrder): ImageSourcePropType => {
  switch (order) {
    case SortOrder.ASC:
      return images.up_arrow;
    case SortOrder.DESC:
      return images.down_arrow;
    default:
      return images.up_down;
  }
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  sortOrder,
  onSortPress,
}) => {
  const inputRef = useRef<TextInput>(null);
  const hasValue = value?.length > 0;

  const handleClear = () => {
    onChangeText('');
  };

  const handleIconPress = () => {
    if (hasValue) {
      handleClear();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleSortPress = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    Keyboard.dismiss();
    onSortPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search Products..."
          placeholderTextColor={colors.textPlaceholder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handleIconPress}>
          <Image
            source={hasValue ? images.close : images.search}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.sortButton, sortOrder !== SortOrder.NONE && styles.sortButtonActive]}
        onPress={handleSortPress}
        activeOpacity={0.7}>
        <Image
          source={getSortIcon(sortOrder)}
          style={[
            styles.sortIcon,
            {tintColor: sortOrder !== SortOrder.NONE ? colors.white : colors.textTertiary},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
    gap: spacing.md,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.padding.md,
    height: hp(5.5),
  },
  searchIcon: {
    width: wp(5),
    height: wp(5),
    marginLeft: spacing.md,
    tintColor: colors.textSecondary,
  },
  input: {
    flex: 1,
    height: hp(5.5),
    fontSize: fonts.size.base,
    color: colors.textPrimary,
  },
  sortButton: {
    width: hp(5.5),
    height: hp(5.5),
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
  },
  sortIcon: {
    width: wp(5),
    height: wp(5),
  },
});
