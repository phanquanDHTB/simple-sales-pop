import React, {useEffect, useState} from 'react';
import {Tabs, Page, Button, Layout, Card, SkeletonBodyText} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import DisplaySettingTab from './DisplaySettingTab';
import TringgerSettingTab from './TringgerSettingTab';
import PageLoadingSkeleton from '../../components/PageLoadingSkeleton/PageLoadingSkeleton';

/**
 * @return {React.ReactElement}
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
      children: <DisplaySettingTab data={data} handleInputChange={handleInputChange} />
    },
    {
      id: 1,
      content: 'Trigger',
      children: <TringgerSettingTab data={data} handleInputChange={handleInputChange} />
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
          {loading ? (
            <SkeletonBodyText lines={5} />
          ) : (
            <NotificationPopup truncate={data.truncateProductName} hideTimeAgo={data.hideTimeAgo} />
          )}
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            {loading ? (
              <PageLoadingSkeleton />
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
