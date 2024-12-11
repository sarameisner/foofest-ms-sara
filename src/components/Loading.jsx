import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div>
      <section className={styles.section}>
        <div className={styles.procenter}>
          <div className={styles.parent} style={{ '--percent': '85%' }}></div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
