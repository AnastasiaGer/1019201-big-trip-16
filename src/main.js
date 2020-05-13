import TripController from "./controllers/trip-controller.js";
// import TripCost from "./components/trip-cost.js";
import TripTabs, {TablItem} from "./components/trip-tabs.js";
import PointsModel from "./models/points.js";
import TripInfoController from './controllers/trip-info.js';
// import TripRoute from "./components/trip-route.js";
// import {cardsList, datesList} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";
import FilterController from "./controllers/filter-controller.js";
import {generateTabs} from "./mock/filters-tabs.js";
import Statistics from "./components/statistics.js";
import API from "./api.js";

const AUTHORIZATION = `Basic nkfdkjndfnjkdfbiuh=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;


const tripInfoBlock = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
// const tripInfoRoute = tripInfoBlock.querySelector(`.trip-main__trip-info`);

const init = () => {

  const tabs = generateTabs();
  const tripTabsComponent = new TripTabs(tabs);
  const api = new API(END_POINT, AUTHORIZATION);
  const pointsModel = new PointsModel();
  const filterController = new FilterController(tripControls, pointsModel);
  const tripController = new TripController(tripEvents, pointsModel, api);


  render(tripControls, tripTabsComponent, RenderPosition.AFTERBEGIN);
  filterController.render();

  const tripInfoController = new TripInfoController(tripInfoBlock, pointsModel);
  tripInfoController.render();

  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
    tripController.createPoint();
  });

  // render(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);
  // render(tripInfoRoute, new TripRoute(datesList), RenderPosition.BEFOREEND); // ?
  // render(tripInfoRoute, new TripCost(cardsList), RenderPosition.BEFOREEND); // ?

  const statisticsComponent = new Statistics(pointsModel);
  render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  statisticsComponent.hide();

  Promise.all([
    api.getPoints(),
    api.getDestinations(),
    api.getOffers()
  ]).then((res) => {
    pointsModel.setEvents(res[0]);
    tripController.render();
  });

  tripTabsComponent.setOnChange((item) => {
    switch (item) {
      case TablItem.TABLE:
        tripTabsComponent.setActiveItem(TablItem.TABLE);
        tripController._sortComponent.show();
        tripController.show();
        statisticsComponent.hide();
        break;
      case TablItem.STATS:
        tripTabsComponent.setActiveItem(TablItem.STATS);
        tripController._sortComponent.hide();
        tripController.hide();
        statisticsComponent.show();
        break;
    }
  });

  api.getPoints()
   .then((points) => {
     pointsModel.setEvents(points);
     tripController.render();
   });

};

init();
