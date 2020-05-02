import {render, RenderPosition} from "./utils/render.js";
import {cardsList, datesList} from "./mock/event.js";
import {MENU_NAMES} from "./mock/menu.js";
import {FILTERS} from "./mock/filter.js";
import TripTabs from "./components/trip-tabs.js";
import Filter from "./components/trip-filter.js";
import TripController from "./controllers/trip-controller.js";
import TripInfo from "./components/trip-info.js";
import TripRoute from "./components/trip-route.js";
import TripCost from "./components/trip-cost.js";

const citiesList = [
  ...new Set(cardsList.map((elem) => elem.city))
];
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const tripInfoBlock = document.querySelector(`.trip-main`);

const init = () => {
  render(tripControls, new TripTabs(MENU_NAMES), RenderPosition.AFTERBEGIN);
  render(tripControls, new Filter(FILTERS), RenderPosition.BEFOREEND);

  const tripController = new TripController(tripEvents);

  tripController.render(cardsList);

  render(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);

  const tripInfoRoute = tripInfoBlock.querySelector(`.trip-main__trip-info`);

  render(tripInfoRoute, new TripRoute(citiesList, datesList), RenderPosition.BEFOREEND);
  render(tripInfoRoute, new TripCost(cardsList), RenderPosition.BEFOREEND);
};

init();

