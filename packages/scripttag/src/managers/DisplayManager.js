import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import {delay} from '../helpers/delay';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications.slice(0, settings.maxPopsDisplay);
    this.settings = settings;
    this.insertContainer();

    await delay(this.settings.firstDelay);

    for (const notification of notifications) {
      await this.displayPopup(notification);
    }
  }

  async displayPopup(notification) {
    this.display({notification});
    await delay(this.settings.displayDuration);
    this.fadeOut();
    await delay(this.settings.popsInterval - this.settings.displayDuration);
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    render(<></>, container);
  }

  display({notification}) {
    const container = document.querySelector('#Avada-SalePop');
    render(
      <NotificationPopup
        {...notification}
        relativeDate={notification.timeStamp}
        truncate={this.settings.truncateProductName}
        position={this.settings.positions}
      />,
      container
    );
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}
