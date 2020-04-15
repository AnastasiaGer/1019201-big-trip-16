const DAYS_COUNT = 3;

const getCitiesRout = (cities) => {
  if (cities.length <= DAYS_COUNT) {
    return cities.map((city) => city).join(` &mdash; `);
  } else {
    return (cities[0] + ` &mdash;` + ` &hellip; ` + `&mdash; ` + cities[cities.length - 1]).toString();
  }
};

const getTripDates = (dates) => {
  return (dates[0].slice(4, 10) + `&nbsp;&mdash;&nbsp;` + dates[dates.length - 1].slice(8, 10)).toString();
};

export const createTripRouteTemplate = (cities, dates) => {
  const createCitiesRout = getCitiesRout(cities);
  const createTripDates = getTripDates(dates);

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createCitiesRout()}</h1>
      <p class="trip-info__dates">${createTripDates()}</p>
    </div>`;
};
