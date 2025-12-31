import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {SortOrder} from '../types';
import {colors, spacing, fonts} from '../theme';
import images from '../assets';

interface ActionBarProps {
  sortOrder: SortOrder;
  onSortPress: () => void;
  selectedCount: number;
  onDeletePress: () => void;
}

const getSortIcon = (order: SortOrder): ImageSourcePropType => {
  switch (order) {
    case 'asc':
      return images.up_arrow;
    case 'desc':
      return images.down_arrow;
    default:
      return images.up_down;
  }
};

const getSortLabel = (order: SortOrder): string => {
  switch (order) {
    case 'asc':
      return 'Low to High';
    case 'desc':
      return 'High to Low';
    default:
      return 'Sort Price';
  }
};

export const ActionBar: React.FC<ActionBarProps> = ({
  sortOrder,
  onSortPress,
  selectedCount,
  onDeletePress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.sortButton, sortOrder !== 'none' && styles.sortButtonActive]}
        onPress={onSortPress}
        activeOpacity={0.7}>
        <Image
          source={getSortIcon(sortOrder)}
          style={[
            styles.sortIcon,
            {tintColor: sortOrder !== 'none' ? colors.white : colors.textSecondary},
          ]}
        />
        <Text style={[styles.sortText, sortOrder !== 'none' && styles.activeText]}>
          {getSortLabel(sortOrder)}
        </Text>
      </TouchableOpacity>

      {selectedCount > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDeletePress}
          activeOpacity={0.7}>
          <Image source={images.trash} style={styles.deleteIcon} />
          <Text style={styles.deleteText}>Delete ({selectedCount})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.padding.lg,
    paddingBottom: spacing.padding.md,
    gap: spacing.gap.lg,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.padding.lg,
    paddingVertical: spacing.lg,
    borderRadius: spacing.borderRadius.xl,
    gap: spacing.gap.sm,
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
  },
  sortIcon: {
    width: 16,
    height: 16,
  },
  sortText: {
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semibold,
    color: colors.textTertiary,
  },
  activeText: {
    color: colors.white,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorLight,
    paddingHorizontal: spacing.padding.lg,
    paddingVertical: spacing.lg,
    borderRadius: spacing.borderRadius.xl,
    gap: spacing.gap.sm,
  },
  deleteIcon: {
    width: 16,
    height: 16,
    tintColor: colors.error,
  },
  deleteText: {
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semibold,
    color: colors.error,
  },
});
