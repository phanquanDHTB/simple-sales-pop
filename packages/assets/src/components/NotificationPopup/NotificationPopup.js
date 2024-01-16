import React from 'react';
import PropsTypes from 'prop-types';
import {TickSmallMinor} from '@shopify/polaris-icons';
import {Icon} from '@shopify/polaris';
import './NoticationPopup.scss';

const NotificationPopup = ({
  hideTimeAgo = false,
  truncate = false,
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIMJERv-pk3PirIW9k9tQaaHyQIk7FZokSwvHNs2u4mqMGDKa2m79&usqp=CAE&s'
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle ${truncate && 'truncate'}`}>
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {!hideTimeAgo && timestamp}
                <div className="uni-blue">
                  <Icon color="primary" source={TickSmallMinor} />
                  <span>by Avada</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropsTypes.string,
  city: PropsTypes.string,
  country: PropsTypes.string,
  productName: PropsTypes.string,
  timestamp: PropsTypes.string,
  productImage: PropsTypes.string,
  truncate: PropsTypes.bool,
  hideTimeAgo: PropsTypes.bool
};

export default NotificationPopup;
