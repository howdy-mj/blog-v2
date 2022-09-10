import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    media: {
      miniMobile: string;
      mobile: string;
      tablet: string;
      pc: string;
      mobileAndTablet: string;
      desktopAndTablet: string;
      largeDesktop: string;
    };
  }
}
