import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';

import { pages } from '@constants/routes';
import useScroll from '@hooks/useScroll';
import useTheme from '@hooks/useTheme';

export const GNB_HEIGHT = 6.5;

const findActivePage = (pathname: string, pageName: string) => {
  const _pageName = pageName.toLowerCase();
  if (pathname === '/' || pathname.includes('page') || pathname === '/[...slug]') {
    return _pageName === 'blog';
  }
  return pathname.includes(_pageName);
};

/**
 * @deprecated 'components/Navigation' 사용하기
 */
const Navigation = () => {
  const hasScrolled = useScroll();
  const { pathname } = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [showMiniNav, setShowMiniNav] = useState(false);

  return (
    <Container hasScrolled={hasScrolled}>
      <NavWrapper>
        <NavList>
          {pages
            .filter((page) => page.isActive)
            .map((page) => {
              return (
                <NavItem key={page.name} isActive={findActivePage(pathname, page.name)}>
                  <Link href={page.link}>{page.name}</Link>
                </NavItem>
              );
            })}
          <ThemeMode onClick={toggleTheme}>
            {theme === 'light' ? <StyledSun /> : <StyledMoon />}
          </ThemeMode>
        </NavList>
      </NavWrapper>

      <MiniNavWrapper>
        <StyleHamburger onClick={() => setShowMiniNav(!showMiniNav)} />
        {showMiniNav && (
          <MiniNavList>
            {pages
              .filter((page) => page.isActive)
              .map((page) => {
                return (
                  <MiniNavItem key={page.name} isActive={findActivePage(pathname, page.name)}>
                    <Link href={page.link}>{page.name}</Link>
                  </MiniNavItem>
                );
              })}
          </MiniNavList>
        )}
        <MiniNavThemeMode onClick={toggleTheme}>
          {theme === 'light' ? <StyledSun /> : <StyledMoon />}
        </MiniNavThemeMode>
      </MiniNavWrapper>
    </Container>
  );
};

export default Navigation;

const Container = styled.nav<{ hasScrolled: boolean }>`
  position: sticky;
  top: 0;
  height: ${GNB_HEIGHT}rem;
  width: 100%;
  border-bottom: 1px solid var(--border2);
  z-index: 10;

  ${({ hasScrolled }) =>
    hasScrolled &&
    css`
      backdrop-filter: blur(8px);
    `}
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 70rem;
  height: 100%;
  margin: 0 auto;

  ${(p) => p.theme.media.mobile} {
    padding: 0 2rem;
  }

  ${(p) => p.theme.media.tablet} {
    padding: 0 3rem;
    max-width: 90rem;
  }

  ${(p) => p.theme.media.pc} {
    max-width: 100rem;
  }

  ${(p) => p.theme.media.miniMobile} {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > li {
    font-weight: 500;
    margin: 0 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const NavItem = styled.li<{ isActive: boolean }>`
  color: ${(p) => p.isActive && `var(--text-primary)`};
`;

const ThemeMode = styled.div`
  border: 1px solid var(--border2);
  border-radius: 50%;
`;

const iconStyle = css`
  display: block;
  cursor: pointer;
  font-size: 3rem;
  padding: 0.5rem;
`;

const StyledSun = styled(FiSun)`
  ${iconStyle};
`;

const StyledMoon = styled(FiMoon)`
  ${iconStyle};
`;

const MiniNavWrapper = styled.div`
  display: none;
  ${(p) => p.theme.media.miniMobile} {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding-right: 1rem;
  }
`;

const MiniNavList = styled.div`
  position: absolute;
  top: 5rem;
  background-color: var(--bg-primary);
  width: 10rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.4rem 1.2rem;
  border-radius: 0.6rem;
`;

const MiniNavItem = styled(NavList)<{ isActive: boolean }>`
  flex-direction: column;
  color: ${(p) => p.isActive && `var(--text-primary)`};
  background-color: ${(p) => p.isActive && `var(--hover1)`};
  padding: 1rem;
`;

const MiniNavThemeMode = styled.div``;

const StyleHamburger = styled(FiMenu)`
  ${iconStyle};
`;
