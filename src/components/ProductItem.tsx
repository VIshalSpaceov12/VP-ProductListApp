import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {Product} from '../types';
import {colors, spacing, fonts, wp} from '../theme';
import images from '../assets';

interface ProductItemProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  isLandscape?: boolean;
  isEditMode?: boolean;
}

// Renders a single product card in the list
export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  isSelected,
  onToggleSelect,
  isLandscape = false,
  isEditMode = false,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View style={[styles.wrapper, isLandscape && styles.landscapeWrapper]}>
      <TouchableOpacity
        style={[styles.container, isEditMode && isSelected && styles.selected]}
        onPress={() => isEditMode && onToggleSelect(product.id)}
        activeOpacity={isEditMode ? 0.8 : 1}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product.image}}
            style={styles.thumbnail}
            onLoadEnd={() => setImageLoading(false)}
          />
          {imageLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.topSection}>
            <View style={styles.textContent}>
              <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
              <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
              {/* Display up to 3 tags for each product */}
              {product?.tags?.length > 0 && (
                <View style={styles.tagsContainer}>
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                  {product.tags.length > 3 && (
                    <View style={styles.tagMore}>
                      <Text style={styles.tagMoreText}>+{product.tags.length - 3}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
            {isEditMode && (
              <TouchableOpacity
                style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                onPress={() => onToggleSelect(product.id)}>
                {isSelected && (
                  <Image source={images.check} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.padding.md,
    marginVertical: spacing.xs,
  },
  landscapeWrapper: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.padding.sm,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  imageContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: spacing.borderRadius.sm,
    padding: spacing.xs,
    marginRight: spacing.md,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: spacing.borderRadius.sm,
  },
  thumbnail: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'cover',
    borderRadius: spacing.borderRadius.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  checkbox: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkIcon: {
    width: wp(3),
    height: wp(3),
    tintColor: colors.white,
  },
  description: {
    fontSize: fonts.size.xs,
    color: colors.textSecondary,
    lineHeight: fonts.lineHeight.tight,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    backgroundColor: '#FFF0E6',
    borderRadius: spacing.borderRadius.xs,
  },
  tagText: {
    fontSize: fonts.size.xs,
    color: colors.primary,
    fontWeight: fonts.weight.medium,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  tagMore: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: spacing.borderRadius.xs,
  },
  tagMoreText: {
    fontSize: fonts.size.xs,
    color: colors.textSecondary,
    fontWeight: fonts.weight.medium,
  },
  price: {
    fontSize: fonts.size.xl,
    fontWeight: fonts.weight.extrabold,
    color: colors.primary,
  },
  selected: {
    borderColor: colors.primary,
  },
});
