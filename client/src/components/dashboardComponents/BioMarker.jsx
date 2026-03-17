// don't change imports, unless adding new ones, thank you!
import styles from './BioMarker.module.css';

import { useEffect, useState } from 'react';

export default function BioMarker({ index }) {

  const [biomarkers, setBiomarkers] = useState([]);

    useEffect(() => {
    fetch('http://localhost:5050/dashboard/biomarker')
      .then(res => res.json())
      .then(data => {
            setBiomarkers(data)}) 
      .catch(err => console.error(err));
  }, []);

   const marker = biomarkers[index];

  return (
    <div className={styles.cloudWrapper}>
      <img src="/cloud.svg" alt="cloud" className={styles.cloudImg} />
      <div className={styles.content}>
        <p className={styles.label}>{marker?.name}</p>
        <p className={styles.value}>{marker?.number}</p>
        <p className={styles.unit}>{marker?.unit}</p>
      </div>
    </div>
  );
}