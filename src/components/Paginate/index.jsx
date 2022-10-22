import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss';

const Paginate = ({ onChangePage, currentPage }) => {
  return (
    <div style={{ maxWidth: '1640px' }}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(currentPage + 1)}
        pageRangeDisplayed={currentPage}
        pageCount={20}
        nextRel={currentPage + 12}
        forcePage={currentPage - 12}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Paginate;
