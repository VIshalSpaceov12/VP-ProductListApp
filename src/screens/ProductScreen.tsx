import React, {useState, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import {Product, SortOrder} from '../types';
import {filterProducts, sortProducts} from '../utils/productUtils';
import {SearchBar} from '../components/SearchBar';
import {ProductList} from '../components/ProductList';
import {FloatingDeleteButton} from '../components/FloatingDeleteButton';
import {colors, spacing, fonts} from '../theme';
import productsData from '../data/Products.json';

const PAGE_SIZE = 20;

export const ProductScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, searchTerm);
    return sortProducts(filtered, sortOrder);
  }, [products, searchTerm, sortOrder]);

  const displayedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, visibleCount]);

  const hasMore = visibleCount < filteredAndSortedProducts.length;

  const handleSortPress = useCallback(() => {
    setSortOrder(current => {
      if (current === 'none') return 'asc';
      if (current === 'asc') return 'desc';
      return 'none';
    });
  }, []);

  const handleToggleSelect = useCallback((id: number) => {
    setSelectedIds(current => {
      const newSet = new Set(current);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    setProducts(current => current.filter(p => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    setIsEditMode(false);
  }, [selectedIds]);

  const handleEditToggle = useCallback(() => {
    Keyboard.dismiss();
    if (isEditMode) {
      setSelectedIds(new Set());
    }
    setIsEditMode(prev => !prev);
  }, [isEditMode]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(current => current + PAGE_SIZE);
  }, []);

  const handleSearchChange = useCallback((text: string) => {
    setSearchTerm(text);
    setVisibleCount(PAGE_SIZE);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={handleEditToggle}>
          <Text style={[styles.editButton, isEditMode && styles.cancelButton]}>
            {isEditMode ? 'Cancel' : 'Select'}
          </Text>
        </TouchableOpacity>
      </View>
      <SearchBar
        value={searchTerm}
        onChangeText={handleSearchChange}
        sortOrder={sortOrder}
        onSortPress={handleSortPress}
      />
      {isEditMode && (
        <View style={styles.selectionBar}>
          <Text style={styles.selectionText}>{selectedIds?.size} selected</Text>
        </View>
      )}
      <ProductList
        products={displayedProducts}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isEditMode={isEditMode}
      />
      {isEditMode && (
        <FloatingDeleteButton
          count={selectedIds.size}
          onPress={handleDeleteSelected}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.padding.md,
    paddingTop: spacing.padding.lg,
    paddingBottom: spacing.padding.xs,
  },
  headerTitle: {
    fontSize: fonts.size.title,
    fontWeight: fonts.weight.extrabold,
    color: colors.textPrimary,
  },
  editButton: {
    fontSize: fonts.size.lg,
    fontWeight: fonts.weight.semibold,
    color: colors.primary,
  },
  cancelButton: {
    color: colors.error,
  },
  selectionBar: {
    paddingHorizontal: spacing.padding.md,
    paddingVertical: spacing.padding.sm,
  },
  selectionText: {
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.medium,
    color: colors.textSecondary,
  },
});
