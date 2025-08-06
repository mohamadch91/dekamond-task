import { FunctionComponent,} from 'react';
import styles from './kloading.module.scss';
import Image from "next/image";


const KLoading: FunctionComponent<any> = ({}) => {
  return (
    <>
      <div className={styles.kloader}>
        <Image src={require("@svg/loading.svg").default} alt="loading" />
      </div>
    </>
  );
};

export default KLoading;
