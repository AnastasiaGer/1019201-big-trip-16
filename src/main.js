import TripController from "./controllers/trip-controller.js";
import TripCost from "./components/trip-cost.js";
import TripTabs, {TablItem} from "./components/trip-tabs.js";
import PointsModel from "./models/points.js";
import TripInfo from "./components/trip-info.js";
import TripRoute from "./components/trip-route.js";
import {cardsList, datesList} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";
import FilterController from "./controllers/filter-controller.js";
import {generateTabs} from "./mock/filters-tabs.js";
import Statistics from "./components/statistics.js";
import API from "./api.js";

const api = new API();
const tripInfoBlock = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);


const init = () => {

  const tabs = generateTabs();

  const tripTabsComponent = new TripTabs(tabs);
  render(tripControls, tripTabsComponent, RenderPosition.AFTERBEGIN);

  const pointsModel = new PointsModel();

  const filterController = new FilterController(tripControls, pointsModel);
  filterController.render();

  const tripController = new TripController(tripEvents, pointsModel);

  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
    tripController.createPoint();
  });

  render(tripInfoBlock, new TripInfo(), RenderPosition.AFTERBEGIN);

  const tripInfoRoute = tripInfoBlock.querySelector(`.trip-main__trip-info`);

  render(tripInfoRoute, new TripRoute(datesList), RenderPosition.BEFOREEND); // ?
  render(tripInfoRoute, new TripCost(cardsList), RenderPosition.BEFOREEND); // ?

  const statisticsComponent = new Statistics(pointsModel);
  render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  statisticsComponent.hide();

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

  api.getEvents()
   .then((events) => {
     pointsModel.setEvents(events);
     tripController.render();
   });

};

init();
