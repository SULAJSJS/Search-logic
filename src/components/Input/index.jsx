import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';
import styles from './Input.module.scss';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchValue } from '../../store/slice/pruductSlice';

const Input = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const listRef = useRef(null);
  const { keywords, searchValue } = useSelector((state) => state.products);
  const word = value ? value : '';

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 800),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
    listRef.current.style.display = 'flex';
    console.log(value);
  };

  const handleClick = (e) => {
    setValue(e.target.innerText);
    listRef.current.style.display = 'none';
    dispatch(fetchProducts({ word }));
  };

  const handleClickButton = () => {
    dispatch(fetchProducts({ word }));
    listRef.current.style.display = 'none';
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        <input type="text" placeholder="Поиск" value={value} onChange={onChangeInput} />
        <Button onClick={handleClickButton} variant="contained">
          Найти
        </Button>
      </Box>
      <Box
        ref={listRef}
        className={styles.list}
        style={{ display: 'flex', justifyContent: 'center' }}>
        {searchValue && (
          <ul>
            {keywords.map((word, i) => (
              <li
                style={word === null ? { display: 'none' } : {}}
                key={word.id}
                onClick={handleClick}>
                {word.keyword}
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Box>
  );
};

// onClick={() => dispatch(fetchProducts(searchValue))}

export default Input;
