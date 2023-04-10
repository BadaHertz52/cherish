import Header from '@/components/common/Header';
import styles from './style.module.scss';
import { ItemCard } from '@/components';
import { useState, useEffect, SetStateAction } from 'react';
import { DrawerScreen } from '@/layouts/DrawerScreen';
import type { Item } from '@/components/ItemCard';

export type RecentlyViewProductPageProps = {
  handleBackButton: () => void;
};

export const RecentlyViewProductPage = ({ handleBackButton }: RecentlyViewProductPageProps) => {
  const [recentProducts, setRecentProducts] = useState<Item[]>([]);

  useEffect(() => {
    // TODO: 최근 본 상품 API 교체 및 선택 링크 연결
    setRecentProducts(
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        company: 'Aesop',
        name: '최근 본 상품',
        price: 31000,
        image:
          'https://ichef.bbci.co.uk/news/800/cpsprodpb/E172/production/_126241775_getty_cats.png',
        bookmarked: true,
      })),
    );
  }, []);

  return (
    <DrawerScreen title="최근 본 상품" handleBackButton={handleBackButton}>
      {/* TODO: 이름 교체 */}
      <div className={styles.recentlyViewProductPage}>
        <h2>최근 OOO님이 찾아본 선물이에요.</h2>
        <div className={styles.productSection}>
          {recentProducts.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </DrawerScreen>
  );
};
