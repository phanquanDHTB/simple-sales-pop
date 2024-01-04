import React, {useEffect, useState} from 'react';
import {Layout, Page, SettingToggle, TextStyle} from '@shopify/polaris';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const getData = async () => {
    const res = await fetch('https://localhost:3000/clientApi/notifications');
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Page title="Home" fullWidth>
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <TextStyle>App status is {enabled ? <b>enabled</b> : <b>disabled</b>}</TextStyle>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
