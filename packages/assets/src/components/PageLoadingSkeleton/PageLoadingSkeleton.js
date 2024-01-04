import React from 'react';
import {SkeletonBodyText, SkeletonPage} from '@shopify/polaris';

const PageLoadingSkeleton = () => {
  return (
    <SkeletonPage>
      <SkeletonBodyText />
      <SkeletonBodyText />
      <SkeletonBodyText />
    </SkeletonPage>
  );
};

export default PageLoadingSkeleton;
