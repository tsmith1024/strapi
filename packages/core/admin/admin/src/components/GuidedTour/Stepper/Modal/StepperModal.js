import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { pxToRem } from '@strapi/helper-plugin';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import Content from '../../GuidedTourModal/Content';
import StepLine from '../StepLine';
import StepNumber from '../StepNumber';

const Header = styled(Flex)``;
const MainContent = styled(Flex)``;
const HeaderSection = styled(Flex)``;
const LeftSideMainContent = styled(Flex)``;
const General = styled(Box)``;
// const Footer = styled(Box)``;
const Title = styled(Box)``;
const SmallWidth = styled(Flex)``;

const StepNumberWithPadding = ({ number, last }) => (
  <Box paddingTop={2} paddingBottom={last ? undefined : 2}>
    <StepNumber number={number} />
  </Box>
);

const StepperModal = ({ title, content, cta, onCTA }) => {
  const { formatMessage } = useIntl();

  const twoSteps = false;

  return (
    <Stack size={5}>
      <div>
        <Header alignItems="stretch">
          <SmallWidth justifyContent="center" width={pxToRem(30)}>
            <StepLine minHeight={pxToRem(24)} />
          </SmallWidth>
          <Title>
            title
          </Title>
        </Header>
        <General>
          <HeaderSection>
            <SmallWidth width={pxToRem(30)}>
              <StepNumberWithPadding number={2} />
            </SmallWidth>
            <Title>
              <Typography variant="alpha" fontWeight="bold" textColor="neutral800" as="h3" id="title">
                {formatMessage(title)}
              </Typography>
            </Title>
          </HeaderSection>
          <MainContent alignItems="stretch">
            <LeftSideMainContent direction="column" width={pxToRem(30)}>
              <StepLine />
              {twoSteps && <StepNumberWithPadding number={2} last />}
            </LeftSideMainContent>
            <Box>
              <Content {...content} />
              <Button onClick={onCTA}>{formatMessage(cta.title)}</Button>
            </Box>
          </MainContent>
        </General>
        {/* <Footer>
          <SmallWidth width={pxToRem(30)}>
            <StepLine minHeight={pxToRem(64)} />
          </SmallWidth>
        </Footer> */}
      </div>
    </Stack>
  );
};

StepperModal.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
  cta: PropTypes.shape({
    target: PropTypes.string,
    title: PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onCTA: PropTypes.func.isRequired,
  title: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
};

export default StepperModal;
