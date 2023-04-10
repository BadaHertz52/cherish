import Header from '@/components/common/Header';
import styles from './style.module.scss';
import { ItemCard } from '@/components';
import { useState, useEffect } from 'react';
import type { Item } from '@/components/ItemCard';

export const RecentlyViewProductPage = () => {
  const [recentProducts, setRecentProducts] = useState<Item[]>([]);

  useEffect(() => {
    // TODO: 최근 본 상품 API 교체 및 선택 링크 연결
    setRecentProducts(
      Array.from({ length: 8 }, (_, index) => ({
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
    <div className={styles.recentlyViewProductPage}>
      <Header title="최근 본 상품" handleBackButton={() => {}} />

      <section>
        {/* TODO: 이름 교체 */}
        <h2>최근 OOO님이 찾아본 선물이에요.</h2>
        <div className={styles.productSection}>
          {recentProducts.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};
