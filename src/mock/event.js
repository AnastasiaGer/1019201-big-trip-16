// Создаст пустые моки для events. Передаст event на вход функции генерации разметки точек

import {getRandomArrayItem, getRandomIntegerNumber} from "../utils/common.js";

const EVENTS_AMOUNT = 20;
const NUMBER_WEEK_DAYS = 7;
const NUMBER_HOURS = 24;
const TIME_FORMAT = 1000;
const MINUTES_PER_HOUR = 60;

export const TYPES = [
  [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`
  ],
  [
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ]
];

export const CITIES = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Berlin`,
  `Moscow`,
];

const SERVICES = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 30
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5
  }
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const getRandomPhotos = () => {
  const photos = [];

  for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

const getRandomDescription = () => {
  return DESCRIPTIONS
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, 3))
    .join(` `)
    .trim();
};

const getRandomServices = () => {
  const currentServices = [];

  for (let i = 0; i < getRandomIntegerNumber(0, 4); i++) {
    currentServices.push(SERVICES[i]);
  }

  return currentServices;
};

const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * NUMBER_WEEK_DAYS) * NUMBER_HOURS * getRandomIntegerNumber(0, MINUTES_PER_HOUR) * MINUTES_PER_HOUR * TIME_FORMAT
  );
};

const getRouteTypesArray = () => {
  const routeTransportsArray = TYPES[0];
  const routeActivitiesArray = TYPES[1];
  const routeTypesArray = routeTransportsArray.concat(routeActivitiesArray);

  return routeTypesArray;
};

// Генерирует моки для event
const generateEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  // Сформирует поля моков event
  return {
    type: getRandomArrayItem(getRouteTypesArray()),
    city: getRandomArrayItem(CITIES),
    photos: getRandomPhotos(),
    description: getRandomDescription(),
    services: getRandomServices(),
    start: Math.min(startDate, endDate),
    end: Math.max(startDate, endDate),
    price: getRandomIntegerNumber(10, 100)
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateEvent())
    .sort(
        (current, next) => current.start - next.start
    );
};

export const cardsList = generateEvents(EVENTS_AMOUNT);

export const datesList = [
  ...new Set(cardsList.map((elem) => new Date(elem.start).toDateString()))
];
