import styles from "./Pagination.module.css";
function Pagination({ page, setPage }) {
  const pervHandler = () => {
    if (page <= 1) return;
    setPage((perPage) => perPage - 1);
  };
  const nextHandler = () => {
    if (page >= 10) return;
    setPage((perPage) => perPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.btn} onClick={pervHandler}>
        Pervious
      </button>
      <p
        className={`${styles.page_number} ${page === 1 ? styles.active : null}`}
      >
        1
      </p>
      <p
        className={`${styles.page_number} ${page === 2 ? styles.active : null}`}
      >
        2
      </p>

      <>
        {page > 2 && page < 9 ? (
          <span className={`${styles.active}`}>{page}</span>
        ) : (
          <span>....</span>
        )}
      </>

      <p
        className={`${styles.page_number} ${page === 9 ? styles.active : null}`}
      >
        9
      </p>
      <p
        className={`${styles.page_number} ${
          page === 10 ? styles.active : null
        }`}
      >
        10
      </p>
      <button className={styles.btn} onClick={nextHandler}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
