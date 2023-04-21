import styles from '../styles/blobs.module.scss';

export default function Background() {
  return (
    <div className={`absolute w-full h-full top-0 left-0  overflow-hidden ${styles.container}`}>
      <div className={`${styles.blob} ${styles.one}`}></div>
      <div className={`${styles.blob} ${styles.two}`}></div>
      <div className={`${styles.blob} ${styles.three}`}></div>

      <div className={styles.overlay} />
    </div>
  );
}
