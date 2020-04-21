import {renderElement, RenderPosition} from "./utils/render.js";
import {cardsList, datesList} from "./mock/event.js";
import {MENU_NAMES} from "./mock/menu.js";
import {FILTERS} from "./mock/filter.js";
import SiteMenu from "./components/trip-menu.js";
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
  renderElement(tripControls, new SiteMenu(MENU_NAMES), RenderPosition.AFTERBEGIN);
  renderElement(tripControls, new Filter(FILTERS), RenderPosition.BEFOREEND);

  const tripController = new TripController(tripEvents);

  tripController.render(cardsList);

  renderElement(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);

  const tripInfoRoute = tripInfoBlock.querySelector(`.trip-main__trip-info`);

  renderElement(tripInfoRoute, new TripRoute(citiesList, datesList), RenderPosition.BEFOREEND);
  renderElement(tripInfoRoute, new TripCost(cardsList), RenderPosition.BEFOREEND);
};

init();

