import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div>
      <section className={styles.section}>
        <div className={styles.procenter}>
          <div className={styles.parent} ></div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
