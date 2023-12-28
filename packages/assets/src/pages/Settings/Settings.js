import React, {useEffect, useState} from 'react';
import {
  Tabs,
  Page,
  Button,
  TextStyle,
  Checkbox,
  Layout,
  Card,
  RangeSlider,
  Stack,
  Select,
  TextField,
  SkeletonBodyText
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DesktopPositionInput from '../../components/DesktopPositionInput/DesktopPositionInput';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);

  const {fetchApi, data, setData, loading} = useFetchApi({});

  const {editing, handleEdit} = useEditApi({url: '/settings'});

  const handleInputChange = (key, value) => setData(prev => ({...prev, [key]: value}));

  useEffect(() => {
    fetchApi('/settings');
  }, []);

  const tabs = [
    {
      id: 0,
      content: 'Display',
      accessibilityLabel: 'All customers',
      children: (
        <Layout>
          <Layout.Section></Layout.Section>
          <Layout.Section>
            <TextStyle variation={'strong'}>APPEARANCE</TextStyle>
          </Layout.Section>
          <Layout.Section>
            <DesktopPositionInput
              onChange={e => handleInputChange('positions', e)}
              value={data.positions}
              label="Desktop position"
              helpText={'The display position of the pop on your website.'}
            />
          </Layout.Section>
          <Layout.Section>
            <Checkbox
              checked={data.hideTimeAgo}
              label="Hide time ago"
              onChange={e => handleInputChange('hideTimeAgo', e)}
            />
          </Layout.Section>
          <Layout.Section>
            <Checkbox
              helpText={`If your productname is long for one line, it will be truncated to 'Product na...'`}
              label="Truncate content text"
              checked={data.truncateProductName}
              onChange={e => handleInputChange('truncateProductName', e)}
            />
          </Layout.Section>
          <Layout.Section>
            <TextStyle variation={'strong'}>TIMING</TextStyle>
          </Layout.Section>
          <Layout.Section>
            <Stack distribution="fillEvenly">
              <RangeSlider
                label="Display duration"
                helpText="How long each pop will display on your page."
                suffix={
                  <Card sectioned>
                    <TextStyle variation="strong">{data.displayDuration}</TextStyle>
                    <TextStyle variation="subdued">{` second(s)`}</TextStyle>
                  </Card>
                }
                value={data.displayDuration}
                onChange={e => handleInputChange('displayDuration', e)}
              />
              <RangeSlider
                label="Time before the first pop"
                helpText="The time delay time before first notification."
                suffix={
                  <Card sectioned>
                    <TextStyle variation="strong">{data.firstDelay}</TextStyle>
                    <TextStyle variation="subdued">{` second(s)`}</TextStyle>
                  </Card>
                }
                value={data.firstDelay}
                onChange={e => handleInputChange('firstDelay', e)}
              />
            </Stack>
          </Layout.Section>
          <Layout.Section>
            <Stack distribution="fillEvenly">
              <RangeSlider
                label="Gap time between to pops"
                helpText="The time interval between to popup notification."
                suffix={
                  <Card sectioned>
                    <TextStyle variation="strong">{data.popsInterval}</TextStyle>
                    <TextStyle variation="subdued">{` second(s)`}</TextStyle>
                  </Card>
                }
                value={data.popsInterval}
                onChange={e => handleInputChange('popsInterval', e)}
              />
              <RangeSlider
                label="Maximum of popup"
                helpText={
                  <>
                    <TextStyle>The maximum number of popups are allowed to show after</TextStyle>
                    <br />
                    <TextStyle>page loading. Maximum number is 80.</TextStyle>
                  </>
                }
                suffix={
                  <Card sectioned>
                    <TextStyle variation="strong">{data.maxPopsDisplay}</TextStyle>
                    <TextStyle variation="subdued">{` pop(s)`}</TextStyle>
                  </Card>
                }
                max={80}
                value={data.maxPopsDisplay}
                onChange={e => handleInputChange('maxPopsDisplay', e)}
              />
            </Stack>
          </Layout.Section>
        </Layout>
      )
    },
    {
      id: 1,
      content: 'Trigger',
      children: (
        <Layout>
          <Layout.Section></Layout.Section>
          <Layout.Section>
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
          </Layout.Section>
          {data.allowShow === 'specific' && (
            <Layout.Section>
              <TextField
                inputMode="url"
                label="Included pages"
                helpText="Pages URLs to show the pop-up (separated by new lines)"
                value={data.includedUrls}
                onChange={e => handleInputChange('includedUrls', e)}
                multiline
              />
            </Layout.Section>
          )}
          <Layout.Section>
            <TextField
              label="Excluded pages"
              helpText="Pages URLs NOT to show the pop-up (separated by new lines)"
              value={data.excludedUrls}
              onChange={e => handleInputChange('excludedUrls', e)}
              multiline
            />
          </Layout.Section>
        </Layout>
      )
    }
  ];

  return (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={
        <Button
          primary
          loading={editing}
          onClick={() => {
            handleEdit(data);
          }}
        >
          Save
        </Button>
      }
      fullWidth
    >
      <Layout>
        <Layout.Section oneThird>
          {loading ? <SkeletonBodyText /> : <NotificationPopup />}
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            {loading ? (
              <>
                <SkeletonBodyText />
                <SkeletonBodyText />
                <SkeletonBodyText />
                <SkeletonBodyText />
                <SkeletonBodyText />
                <SkeletonBodyText />
                <SkeletonBodyText />
                <SkeletonBodyText />
              </>
            ) : (
              <Tabs tabs={tabs} selected={selected} onSelect={setSelected}>
                {tabs[selected].children}
              </Tabs>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
