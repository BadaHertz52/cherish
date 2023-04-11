import { memo, useCallback } from 'react';

import { useRanger } from 'react-ranger';
import styled from 'styled-components';

import styles from './style.module.scss';

export const Segment = styled('div')`
  background: ${(props: any) =>
    props.index === 0
      ? '#d9d9d9'
      : props.index === 1
      ? '#FF6B8F'
      : props.index === 2
      ? '#d9d9d9'
      : '#d9d9d9'};
  height: 100%;
`;

interface PriceSliderProps {
  prices: number[];
  setPrices: React.Dispatch<React.SetStateAction<number[]>>;
}

const PriceSlider = ({ prices, setPrices }: PriceSliderProps) => {
  const { getTrackProps, segments, handles } = useRanger({
    min: 0,
    max: 600000,
    stepSize: 10000,
    values: prices,
    onDrag: setPrices,
  });

  const changePriceFormat = useCallback((value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContent}>
        <div className={styles.sliderContentContainer}>
          <p className={styles.sliderContentContainerTitle}>희망 가격대</p>
          <h2 className={styles.sliderContentContainerPrice}>
            {changePriceFormat(prices[0])}~{changePriceFormat(prices[1])}
          </h2>
        </div>
        <div className={styles.track} {...getTrackProps()}>
          {segments.map(({ getSegmentProps }, i) => (
            <Segment {...getSegmentProps()} index={i} />
          ))}
          {handles.map(({ getHandleProps }) => (
            <div {...getHandleProps({})}>
              <button className={styles.handle}></button>
            </div>
          ))}
        </div>
        <div className={styles.sliderContentMinMaxPrice}>
          <p>10,000</p>
          <p>600,000</p>
        </div>
      </div>
    </div>
  );
};

export default memo(PriceSlider);
