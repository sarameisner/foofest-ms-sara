import styles from "../styles/Loading.module.css"; //her bruger vi også styles sheet da der er flere animationer

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
