import { Place, Photo } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKeywords, fetchProducts, setCurrentOffsetPage } from '../../store/slice/pruductSlice';
import Paginate from '../Paginate';
import Skeleton from '../Skeleton/Skeleton';

const Products = () => {
  const dispatch = useDispatch();
  const { data, currentPage, searchValue } = useSelector((state) => state.products);
  const [limit, setLimit] = useState(12);
  const search = searchValue ? searchValue : '';

  useEffect(() => {
    dispatch(fetchProducts({ limit, currentPage }));
    console.log('data', data?.data);
  }, [limit, currentPage]);

  useEffect(() => {
    dispatch(fetchKeywords(search));
  }, [searchValue]);

  const onChangePage = (num) => {
    dispatch(setCurrentOffsetPage(num));
  };

  const skeleton = Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((_, i) => (
    <Skeleton key={i} />
  ))

  return (
    <>
      <div className={styles.wrapper}>
        {data?.data?.results ? (
          <>
            {data?.data?.results?.map((item, i) => (
              <div key={i} className={styles.root}>
                {item.photos?.[0]?.photo ? (
                  <img width={218} height={160} src={item.photos?.[0]?.photo} alt="" />
                ) : (
                  <div
                    className={styles.image}
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      width: 218,
                      height: 160,
                      textAlign: 'center',
                    }}>
                    <Photo sx={{ width: 180, height: 120, opacity: 0.3, mt: '20px' }} />
                  </div>
                )}
                <div className={styles.card}>
                  <h4>
                    {item.initial_price} {item.currency}
                  </h4>
                  <p>{item.title}</p>
                </div>
                <div className={styles.location}>
                  <Place />
                  <p>{item.location.title_ru}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          skeleton
        )}
      </div>
      <Paginate onChangePage={onChangePage} currentPage={currentPage} />
    </>
  );
};

export default Products;
