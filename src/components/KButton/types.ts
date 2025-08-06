import { ReactNode } from "react";

export interface KButtonProps {
  text: string;
  onClick: Function;
  color: ButtonColors | string;
  disable: boolean ;
  icon?: ButtonIcons | undefined | null | string;
  size: ButtonSizes | string;
  customStyle?: { [key: string]: string | number };
  loading?: boolean;
  iconJSX?: ReactNode;
  iconColor?: string;
  className?: string;
  id?:string
}

export enum ButtonColors{
    P ='primary',
    T ='tint',
    O ='outline',
    PL ='plain'
}

export enum ButtonSizes {
  L='l',
  M='m',
  S= 's'
}

export enum ButtonIcons {
  N= 'next',
   B ='back',
  NB ='next back',
}