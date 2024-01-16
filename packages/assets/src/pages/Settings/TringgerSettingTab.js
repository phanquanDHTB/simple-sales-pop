import React from 'react';
import {Select, FormLayout, Card} from '@shopify/polaris';
import TextFieldCustom from '../../components/TextField/TextField';

/**
 *
 * @return {React.ReactElement}
 */
const TringgerSettingTab = ({data, handleInputChange}) => {
  return (
    <Card.Section>
      <FormLayout>
        <Select
          label="Pages Restriction"
          value={data.allowShow}
          options={[
            {
              value: 'all',
              label: 'All pages'
            },
            {
              value: 'specific',
              label: 'Specific pages'
            }
          ]}
          onChange={e => handleInputChange('allowShow', e)}
        />
        {data.allowShow === 'specific' && (
          <TextFieldCustom
            inputMode="url"
            label="Included pages"
            helpText="Pages URLs to show the pop-up (separated by new lines)"
            value={data.includedUrls}
            onChange={e => handleInputChange('includedUrls', e)}
            multiline
          />
        )}
        <TextFieldCustom
          label="Excluded pages"
          helpText="Pages URLs NOT to show the pop-up (separated by new lines)"
          value={data.excludedUrls}
          onChange={e => handleInputChange('excludedUrls', e)}
          multiline
        />
      </FormLayout>
    </Card.Section>
  );
};

TringgerSettingTab.propTypes = {
  data: {},
  handleInputChange: () => {}
};

export default TringgerSettingTab;
