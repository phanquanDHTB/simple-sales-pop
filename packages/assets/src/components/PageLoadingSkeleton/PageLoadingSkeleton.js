import React from 'react';
import {SkeletonBodyText, SkeletonPage} from '@shopify/polaris';
import PropsTypes from 'prop-types';

const PageLoadingSkeleton = ({lines = 20}) => {
  return (
    <SkeletonPage>
      <SkeletonBodyText lines={lines} />
    </SkeletonPage>
  );
};

PageLoadingSkeleton.propTypes = {
  lines: PropsTypes.number
};

export default PageLoadingSkeleton;
