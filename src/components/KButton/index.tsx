import { FunctionComponent, ReactNode, useEffect, useRef } from 'react';
import styles from './kbutton.module.scss'
import { ButtonColors, ButtonIcons, ButtonSizes, KButtonProps } from './types';
import KLoading from '../KLoading';


const KButton: FunctionComponent<KButtonProps> = ({
  text,
  onClick,
  color,
  disable,
  icon,
  size,
  customStyle,
  loading,
  iconJSX,
  iconColor = '',
  className = '',
  id,
}) => {
  return (
    <>
      <button
        disabled={disable? disable: false}
        className={`${styles['k-button']}  ${styles[color]}  ${styles[size]} ${styles[className]} ${disable && styles['disable']}` }
        onClick={() => {
          onClick();
        }}
        style={customStyle}
        id={id}
      >
        {iconJSX && iconJSX}
        {icon?.includes('back') && !loading && (
          <>
            <div style={{ color: iconColor }} className={`icon back`}></div>
          </>
        )}
        <span>{loading ? <KLoading /> : text}</span>
        {icon?.includes('next') && !loading && (
          <>
            <div className={` icon next`}></div>
          </>
        )}
      </button>
    </>
  );
};

export default KButton;
