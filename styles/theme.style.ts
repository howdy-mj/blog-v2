import { DefaultTheme } from 'styled-components';

const BREAKPOINT = Object.freeze({
  MIN_MOBILE: 375,
  MIN_TABLET: 700,
  MIN_PC: 1400,
});

const theme: DefaultTheme = {
  media: {
    miniMobile: `@media (max-width: ${BREAKPOINT.MIN_MOBILE - 1}px)`,
    mobile: `@media (max-width: ${BREAKPOINT.MIN_TABLET - 1}px)`,
    tablet: `@media (${BREAKPOINT.MIN_TABLET}px <= width <= ${BREAKPOINT.MIN_PC - 1}px)`,
    pc: `@media (min-width: ${BREAKPOINT.MIN_PC}px)`,
    mobileAndTablet: `@media (0px <= width <= ${BREAKPOINT.MIN_TABLET}px)`,
    desktopAndTablet: `@media (${BREAKPOINT.MIN_TABLET + 1}px <= width <= ${BREAKPOINT.MIN_PC}px)`,
    largeDesktop: `@media (min-width: ${BREAKPOINT.MIN_PC + 1}px)`,
  },
};

export default theme;
