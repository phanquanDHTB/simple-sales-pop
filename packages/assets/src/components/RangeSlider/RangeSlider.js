import React from 'react';
import {RangeSlider, Card, TextStyle} from '@shopify/polaris';
import PropsType from 'prop-types';

const RangeSliderCustom = ({
  value = 0,
  cardTitle = '',
  helpText = '',
  max = 100,
  isMaxWithHelpText = false,
  suffix = (
    <Card.Section
      flush
      title={
        <>
          <TextStyle variation="strong">{value}</TextStyle>
          <TextStyle variation="subdued">{` ${cardTitle}`}</TextStyle>
        </>
      }
    ></Card.Section>
  ),
  ...props
}) => {
  return (
    <RangeSlider
      value={value}
      suffix={suffix}
      max={max}
      helpText={isMaxWithHelpText ? helpText + max : helpText}
      {...props}
    />
  );
};

RangeSliderCustom.propTypes = {
  suffix: HTMLElement,
  value: PropsType.number,
  cardTitle: PropsType.string,
  helpText: PropsType.string,
  max: PropsType.number,
  isMaxWithHelpText: PropsType.bool
};

export default RangeSliderCustom;
