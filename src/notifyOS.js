const notifier = require('node-notifier');
const IPhoneFarmer = require('./IPhoneFarmer');

const isAvailable = availability => availability.pickupDisplay === 'available';

module.exports = {
  notify: (isFound, stores) => {
    if (!isFound) {
      console.log('Nothing found');
      return;
    }

    let message = '';

    stores.forEach(store => {
      const { partsAvailability } = store;
      Object.keys(partsAvailability).forEach(key => {
        const oneAvailability = partsAvailability[key];
        if (!isAvailable(oneAvailability)) return;
        // Else notify terminal
        const iPhone = IPhoneFarmer.parts[key];
        message += `\n${iPhone} found at ${store.storeName} store.`;
      });
    });

    console.log(message);

    notifier.notify({
      message,
      wait: true,
      sound: 'Glass'
    });
  }
};
