import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import metaData from '@config/metaData';
import { BsFacebook, BsGithub, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';

const SNS_URL = {
  email: 'mailto:',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/in/',
  twitter: 'https://twitter.com/',
  facebook: 'https://facebook.com/',
  youtube: 'https://www.youtube.com/channel/',
};

type SnsIconWrapperProps = {
  href: string;
  size?: number;
};
const SnsIconWrapper = ({ href, size = 2.4, children }: PropsWithChildren<SnsIconWrapperProps>) => {
  return (
    <StyledLink href={href} $size={size} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledLink>
  );
};

const SnsInformation = () => {
  return (
    <SnsWrapper>
      {metaData.email && (
        <StyledLink href={`${SNS_URL.email}${metaData.email}`} $size={2.4}>
          <GrMail />
        </StyledLink>
      )}
      {metaData.sns.github && (
        <SnsIconWrapper href={`${SNS_URL.github}${metaData.sns.github}`}>
          <BsGithub />
        </SnsIconWrapper>
      )}
      {metaData.sns.linkedin && (
        <SnsIconWrapper href={`${SNS_URL.linkedin}${metaData.sns.linkedin}`}>
          <BsLinkedin />
        </SnsIconWrapper>
      )}
      {metaData.sns.twitter && (
        <SnsIconWrapper href={`${SNS_URL.twitter}${metaData.sns.twitter}`}>
          <BsTwitter />
        </SnsIconWrapper>
      )}
      {metaData.sns.facebook && (
        <SnsIconWrapper href={`${SNS_URL.facebook}${metaData.sns.facebook}`}>
          <BsFacebook />
        </SnsIconWrapper>
      )}
      {metaData.sns.youtube && (
        <SnsIconWrapper href={`${SNS_URL.youtube}${metaData.sns.youtube}`}>
          <BsYoutube />
        </SnsIconWrapper>
      )}
    </SnsWrapper>
  );
};

export default SnsInformation;

const SnsWrapper = styled.div`
  display: flex;
  margin-top: 1rem;

  & > *:not(:last-child) {
    margin-right: 0.7rem;
  }
`;

const StyledLink = styled.a<{ $size: number }>`
  cursor: pointer;
  > svg {
    width: ${({ $size }) => `${$size}rem`};
    height: ${({ $size }) => `${$size}rem`};
    color: var(--text-main);
  }
`;
