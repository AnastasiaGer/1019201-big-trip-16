import {FILTER_TYPE} from "../const.js";

export const getFutureEvents = (events, date) => {
  return events.filter((event) => {
    const eventDate = event.start;

    if (eventDate < date) {
      return false;
    }

    return event;
  });
};

export const getPastEvents = (events, date) => {
  return events.filter((event) => {
    const eventDate = event.start;

    if (eventDate > date) {
      return false;
    }

    return event;
  });
};

export const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date().getTime();

  switch (filterType) {
    case FILTER_TYPE.EVERYTHING:
      return events;
    case FILTER_TYPE.FUTURE:
      return getFutureEvents(events, nowDate);
    case FILTER_TYPE.PAST:
      return getPastEvents(events, nowDate);
  }

  return events;
};
