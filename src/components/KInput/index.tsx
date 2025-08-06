import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./kinput.module.scss";
import { KInputprops } from "./types";

// Change from FunctionComponent to a plain function and use forwardRef
const KInput = forwardRef<HTMLInputElement, KInputprops>(
  (
    { placeholder, onChange, desc, error, disable, required, value, onBlur },
    ref
  ) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const internalRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Expose the input to the parent
    useEffect(() => {
      if (typeof ref === "function") {
        ref(internalRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          internalRef.current;
      }
    }, [ref]);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          internalRef.current &&
          !internalRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsInputFocused(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <label
        className={`${styles["k-input"]} ${disable && styles["disable"]} ${
          error && error !== "" && styles["error"]
        } ${desc && desc !== "" && styles["desc"]} ${
          value && value !== "" ? styles["has-value"] : ""
        }`}
      >
        <input
          ref={internalRef}
          onFocus={() => setIsInputFocused(true)}
          disabled={disable}
          value={value}
          type="text"
          onChange={(e) => onChange()}
          onBlur={onBlur}
        />
        <span className={styles["place-holder"]}>
          {placeholder}
          <span className={styles["required"]}>{required && " *"}</span>
        </span>

        {error && error !== "" ? (
          <span className={styles["error-text"]}>{error}</span>
        ) : (
          <span className={styles.desc}>{desc}</span>
        )}
      </label>
    );
  }
);

export default KInput;
