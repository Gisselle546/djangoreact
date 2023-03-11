import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        name: 'light' | 'dark'
        fonts: {
            family: string
        }
        spacing: typeof spacing
        color: typeof color
        borderRadius: typeof borderRadius
        boxShadow: typeof boxShadow
        typography: typeof typography
    }
}

const baseColors = {
    white: '#FFFFFF',
    black: '#202020',
    differentBlack: '#2C2C2C',
    grey: {
      base: '#909090',
      light1: '#A6A6A6',
      light2: '#BCBCBC',
      light3: '#D2D2D2',
      light4: '#E9E9E9',
      light5: '#F5F6F7',
      light6: '#F9F9F9',
      dark1: '#797979',
      dark2: '#636363',
      dark3: '#4D4D4D',
      dark4: '#363636',
      dark5: '#2C2C2C',
      dark6: '#202020',
   },
   blue:{
    base: '#B1DDE4',
    light1: '#B9E0E7',
    light2: '#C1E4E9',
    light3: '#C8E7EC',
    light4: '#D0EBEF',
    light5: '#D8EEF2',
    dark1: '#9FC7CD',
    dark2: '#8EB1B6',
    dark3: '#7C9BA0',
    dark4: '#6A8589',
    dark5: '#596f72',
   },
   red:{
    base:'#801120',
    light1:'#AD172B',
    dark1: '#5eDCL7',
    dark2: '7A101E'
   }
}

const spaceUnit = 1

const borderRadius = {
  xs: '4px',
  s: '8px',
  m: '16px',
  l: '24px',
  xl: '32px',
  xxl: '40px',
  round: '50%',
}

const spacing = {
  xxs: `${0.25 * spaceUnit}em`,
  xs: `${0.5 * spaceUnit}em`,
  s: `${spaceUnit}em`,
  m: `${1.25 * spaceUnit}em`,
  l: `${2 * spaceUnit}em`,
  xl: `${3.25 * spaceUnit}em`,
  xxl: `${5.25 * spaceUnit}em`,
}

const boxShadow = {
    card: '0px 14px 26px 0px rgba(0, 0, 0, 0.08)',
    inner: 'inset 0 3px 0 0 rgba(0, 0, 0, 0.05)',
    outerBorder: `0 0 0 1px ${baseColors.blue.dark2}, 0 0 0 4px ${baseColors.blue.light5}`,
  }

const typography = {
    fontSize: {
      body: '1.125rem',
      bodyS: '1rem',
      bodyXS: '0.9rem',
      bodyXXS: '0.72rem',
      heading1: '2.74rem',
      heading2: '2.19rem',
      heading3: '1.75rem',
      heading4: '1.4rem',
    },
    fontWeight: {
      black: '900',
      bold: '700',
      medium: '500',
      regular: '400',
    },
  }

  const color = {
    accentText: baseColors.black,
    badgeBackground: baseColors.grey.light4,
    badgeText: baseColors.grey.dark2,
    buttonClear: 'transparent',
    buttonClearHover: baseColors.grey.light5,
    buttonPrimary: baseColors.grey.dark6,
    buttonPrimaryHover: baseColors.grey.dark5, // recheck
    buttonSecondary: baseColors.red.base,
    buttonSecondaryHover: baseColors.red.dark1, // recheck
    buttonText: baseColors.white,
    screenBackground: baseColors.white,
    sidebarHeader: baseColors.grey.dark4,
  }

  export const lightTheme: DefaultTheme = {
    borderRadius,
    boxShadow,
    color,
    fonts: {
      family: 'NunitoSans, sans-serif',
    },
    name: 'light',
    spacing,
    typography,
  }

  export const darkTheme: DefaultTheme = {
    ...lightTheme,
    boxShadow: {
      ...boxShadow,
      outerBorder: `0 0 0 2px ${baseColors.blue.dark5}, 0 0 0 4px ${baseColors.blue.base}`,
    },
    color:{
     ...lightTheme.color,
      screenBackground: baseColors.grey.dark6,
      badgeBackground: baseColors.grey.dark4,
      badgeText: baseColors.grey.light1,
      buttonClearHover: baseColors.grey.dark4, // recheck
      buttonPrimary: baseColors.red.base,
      buttonPrimaryHover: baseColors.red.dark1, // recheck
      buttonSecondary: baseColors.red.base,
      buttonText: baseColors.blue.base,
      sidebarHeader: baseColors.grey.dark4
  
     },
     name:'dark'
  }