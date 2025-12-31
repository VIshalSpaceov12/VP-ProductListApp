import React from 'react';
import {FlatList, StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import {Product} from '../types';
import {ProductItem} from './ProductItem';
import {useOrientation} from '../hooks/useOrientation';
import {colors, spacing, fonts, wp, hp} from '../theme';
import images from '../assets';

interface ProductListProps {
  products: Product[];
  selectedIds: Set<number>;
  onToggleSelect: (id: number) => void;
  onLongPress?: (id: number) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isEditMode?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedIds,
  onToggleSelect,
  onLongPress,
  onLoadMore,
  hasMore = false,
  isEditMode = false,
}) => {
  // Responsive layout: 2 columns in landscape, 1 in portrait
  const orientation = useOrientation();
  const isLandscape = orientation === 'landscape';
  const numColumns = isLandscape ? 2 : 1;

  const renderItem = ({item}: {item: Product}) => (
    <ProductItem
      product={item}
      isSelected={selectedIds.has(item.id)}
      onToggleSelect={onToggleSelect}
      onLongPress={onLongPress}
      isLandscape={isLandscape}
      isEditMode={isEditMode}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Image source={images.box} style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>Nothing to display right now.</Text>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;

    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  // Trigger pagination when on end reached
  const handleEndReached = () => {
    if (hasMore && onLoadMore) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      key={numColumns}
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={[
        styles.container,
        isLandscape && styles.gridContainer,
      ]}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.7}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.padding.xxl,
    flexGrow: 1,
  },
  gridContainer: {
    paddingHorizontal: spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  emptyIcon: {
    width: wp(12),
    height: wp(12),
    marginBottom: spacing.padding.lg,
    tintColor: colors.textSecondary,
  },
  emptyTitle: {
    fontSize: fonts.size.xxl,
    fontWeight: fonts.weight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: fonts.size.md,
    color: colors.textSecondary,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.padding.lg,
    gap: spacing.md,
  },
  loadingText: {
    fontSize: fonts.size.md,
    color: colors.textSecondary,
  },
});
