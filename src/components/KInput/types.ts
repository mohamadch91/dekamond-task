import { ComponentType } from "react";

export interface KInputprops {
  placeholder: string;
  onChange: Function;
  desc?: string;
  error?: string | undefined | null;
  disable?: boolean | undefined;
  required?: boolean | undefined | null;
  type?: string | undefined;
  hasIcon?: boolean;
  hasAfterIcon?: boolean | null | undefined;
  afterIcon?: string | null | undefined;
  afterIconClick?: Function;
  afterComponent?: ComponentType<any> | any;
  hasAfterComponent?: boolean;
  value: string | number;
  price?: boolean;
  multiline?: boolean;
  onBlur?: any;
}