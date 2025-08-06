import {  FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './kinput.module.scss'
import { KInputprops } from './types';


const KInput: FunctionComponent<KInputprops> = ({
  placeholder,
  onChange,
  desc,
  error,
  disable,
  required,
  value,


  onBlur,
}) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



 

 

  return (
    <>
      <label
        className={`${styles["k-input"]} ${disable && styles['disable']} ${error && error != '' && styles['error']} ${desc && desc != '' && styles['desc']} ${
          value && value !== '' ? (styles['has-value']) : ''
        }  `}
      >
        <input
          ref={inputRef}
          onFocus={() => setIsInputFocused(true)}
          disabled={disable}
          value={ value}
          type={'text'}
          onChange={(e) => {
          onChange(e.target.value)
          }}
          onBlur={onBlur}
        />
        <span className={styles["place-holder"]}>
          {placeholder}
          <span className={styles["required"]}>{required && ' *'}</span>
        </span>
       
        
    

        {error && error != '' ? (
          <>
            <span className={styles["error-text"]}>
             
              {error}
            </span>
          </>
        ) : (
          <>
            <span className={styles.desc}>
             
              {desc}
            </span>
          </>
        )}
      </label>
    </>
  );
};

export default KInput;
