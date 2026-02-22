import styles from './BioMarker.module.css';

export default function BioMarker({ label, value, unit }) {
  return (
    <div className={styles.cloudWrapper}>
      <img src="/cloud.svg" alt="cloud" className={styles.cloudImg} />
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p classname={styles.value}>{value}</p>
        <p classname={styles.unit}>{unit}</p>
      </div>
    </div>
  );
}