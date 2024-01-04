import {Card, Checkbox, FormLayout, TextStyle} from '@shopify/polaris';
import React from 'react';
import DesktopPositionInput from '../../components/DesktopPositionInput/DesktopPositionInput';
import RangeSliderCustom from '../../components/RangeSlider';

/**
 *
 * @return {React.ReactElement}
 */
const DisplaySettingTab = ({data, handleInputChange}) => {
  return (
    <Card.Section>
      <FormLayout>
        <FormLayout.Group>
          <TextStyle variation={'strong'}>APPEARANCE</TextStyle>
        </FormLayout.Group>
        <FormLayout.Group>
          <DesktopPositionInput
            onChange={e => handleInputChange('positions', e)}
            value={data.positions}
            label="Desktop position"
            helpText={'The display position of the pop on your website.'}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <Checkbox
            checked={data.hideTimeAgo}
            label="Hide time ago"
            onChange={e => handleInputChange('hideTimeAgo', e)}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <Checkbox
            helpText={`If your productname is long for one line, it will be truncated to 'Product na...'`}
            label="Truncate content text"
            checked={data.truncateProductName}
            onChange={e => handleInputChange('truncateProductName', e)}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <TextStyle variation={'strong'}>TIMING</TextStyle>
        </FormLayout.Group>
        <FormLayout.Group>
          <RangeSliderCustom
            value={data.displayDuration}
            cardTitle={` second(s)`}
            label="Display duration"
            helpText="How long each pop will display on your page."
            onChange={e => handleInputChange('displayDuration', e)}
          />
          <RangeSliderCustom
            cardTitle={` second(s)`}
            label="Time before the first pop"
            helpText="The time delay time before first notification."
            value={data.firstDelay}
            onChange={e => handleInputChange('firstDelay', e)}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <RangeSliderCustom
            label="Gap time between to pops"
            helpText="The time interval between to popup notification."
            value={data.popsInterval}
            onChange={e => handleInputChange('popsInterval', e)}
            cardTitle={` second(s)`}
          />
          <RangeSliderCustom
            label="Maximum of popup"
            max={80}
            value={data.maxPopsDisplay}
            onChange={e => handleInputChange('maxPopsDisplay', e)}
            cardTitle={` pop(s)`}
            helpText="The maximum number of popups are allowed to show after page loading. Maximum
                number is "
            isMaxWithHelpText
          />
        </FormLayout.Group>
      </FormLayout>
    </Card.Section>
  );
};

DisplaySettingTab.propTypes = {
  data: {},
  handleInputChange: () => {}
};

export default DisplaySettingTab;
