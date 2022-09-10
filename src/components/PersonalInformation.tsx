import React from 'react';
import Image from 'next/image';
import metaData from '@config/metaData';
import styled from 'styled-components';
import { Text } from '@components/Typography.style';
import SnsInformation from '@components/SnsInformation';

const PersonalInformation = () => {
  return (
    <InfoWrapper>
      <BasicInformation>
        <ImageWrapper>
          <Image
            src={metaData.logoImage ? metaData.logoImage : '/images/logo.png'}
            alt="logo"
            layout="fill"
            sizes="5rem"
            objectFit="contain"
            priority={true}
          />
        </ImageWrapper>

        <div>
          {metaData.name && <NameText>{metaData.name}</NameText>}
          {metaData.description && (
            <DescriptionWrapper>
              <Text>{metaData.description}</Text>
            </DescriptionWrapper>
          )}
          <SnsInformation />
        </div>
      </BasicInformation>
    </InfoWrapper>
  );
};

export default PersonalInformation;

const InfoWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const BasicInformation = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-right: 2rem;
`;

const NameText = styled.h1`
  font-size: 2rem;
`;

const DescriptionWrapper = styled.div`
  color: var(--text-description);
`;
