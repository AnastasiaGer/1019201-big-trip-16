export const actionByType = new Map([
  [`taxi`, `Taxi to`],
  [`bus`, `Bus to`],
  [`train`, `Train to`],
  [`ship`, `Ship to`],
  [`transport`, `Transport to`],
  [`drive`, `Drive to`],
  [`flight`, `Flight to`],
  [`check-in`, `Check-in in`],
  [`sightseeing`, `Sightseeing in`],
  [`restaurant`, `Restaurant in`]
]);

export const SORT_TYPE = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const FILTER_TYPE = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const EVENT_TYPE = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`,
};

export const TRAVEL_TRANSPORT = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

export const TRAVEL_ACTIVITY = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];
