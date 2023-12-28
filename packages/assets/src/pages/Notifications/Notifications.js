import React, {useState} from 'react';
import {
  Page,
  ResourceList,
  ResourceItem,
  Pagination,
  Layout,
  Stack,
  TextStyle
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';

/**
 * /
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectedItem, setSelectedItem] = useState([]);
  const [sortValue, setSortValue] = useState('desc');
  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };
  const renderItems = item => {
    return (
      <ResourceItem id={item.id} key={item.id}>
        <Stack distribution="equalSpacing">
          <NotificationPopup />
          <TextStyle>
            From March 8,
            <br />
            2023
          </TextStyle>
        </Stack>
      </ResourceItem>
    );
  };
  return (
    <Page
      fullWidth={true}
      title="Notifications"
      subtitle="List of sales notifications from Shopify"
    >
      <Layout sectioned>
        <Layout.Section>
          <ResourceList
            selectable
            resourceName={resourceName}
            items={[{id: 1}, {id: 2}]}
            renderItem={renderItems}
            selectedItems={selectedItem}
            onSelectionChange={setSelectedItem}
            sortValue={sortValue}
            sortOptions={[
              {label: 'Newest update', value: 'desc'},
              {label: 'Oldest update', value: 'asc'}
            ]}
            onSortChange={selected => {
              setSortValue(selected);
            }}
          />
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
