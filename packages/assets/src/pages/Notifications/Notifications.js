import React, {useEffect, useState} from 'react';
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
import useFetchApi from '../../hooks/api/useFetchApi';
import moment from 'moment';
import PageLoadingSkeleton from '../../components/PageLoadingSkeleton/PageLoadingSkeleton';

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

  const {fetchApi, data, loading} = useFetchApi({});

  // useEffect(() => {
  //   fetchApi('/notifications');
  // }, []);

  useEffect(() => {
    fetchApi(`/notifications?sort=${sortValue}`);
  }, [sortValue]);

  const renderItems = item => {
    const day = moment().diff(item.timeStamp, 'days');
    return (
      <ResourceItem id={item.id} key={item.id}>
        <Stack distribution="equalSpacing">
          <NotificationPopup
            firstName={item.firstName}
            city={item.city}
            country={item.country}
            productName={item.productName}
            timestamp={day === 0 ? 'today' : day === 1 ? 'a day ago' : day + ' days ago'}
            productImage={item.productImage}
          />
          <TextStyle>
            From {moment(item.timeStamp).format('MMMM DD')},
            <br />
            {moment(item.timeStamp).format('yyyy')}
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
          {loading ? (
            <PageLoadingSkeleton />
          ) : (
            <ResourceList
              selectable
              resourceName={resourceName}
              items={data}
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
          )}
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
