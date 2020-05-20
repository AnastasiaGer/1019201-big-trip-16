import {FILTER_TYPE} from "./const";
import {generateTabs} from "./utils/common.js";
import {getEventsByFilter} from "./utils/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import API from "./api/index.js";
import FilterController from "./controllers/filter-controller.js";
import PointsModel from "./models/points.js";
import Provider from "./api/provider.js";
import Statistics from "./components/statistics.js";
import Store from "./api/store.js";
import TripController from "./controllers/trip-controller.js";
import TripInfoController from './controllers/trip-info.js';
import TripTabs, {TablItem} from "./components/trip-tabs.js";

const AUTHORIZATION = `Basic ghdbdfdfvfghmj=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


const tripInfoBlock = document.querySelector(`.trip-main`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);

const init = () => {

  const tabs = generateTabs();
  const tripTabsComponent = new TripTabs(tabs);
  const api = new API(END_POINT, AUTHORIZATION);
  const store = new Store(STORE_NAME, window.localStorage);
  const apiWithProvider = new Provider(api, store);
  const pointsModel = new PointsModel();
  const filterController = new FilterController(tripControls, pointsModel);
  const tripController = new TripController(tripEvents, filterController, pointsModel, apiWithProvider);


  render(tripControls, tripTabsComponent, RenderPosition.AFTERBEGIN);
  filterController.render();

  const tripInfoController = new TripInfoController(tripInfoBlock, pointsModel);
  tripInfoController.render();

  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
    tripController.createPoint();
  });

  const statisticsComponent = new Statistics(pointsModel);
  render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  statisticsComponent.hide();

  Promise.all([
    apiWithProvider.getPoints(),
    apiWithProvider.getDestinations(),
    apiWithProvider.getOffers()
  ]).then((res) => {
    pointsModel. setPoints(res[0]);
    Object.values(FILTER_TYPE).map((filter) => {
      const filteredPoints = getEventsByFilter(pointsModel.getPointsAll(), filter.toLowerCase());
      if (filteredPoints.length === 0) {
        return filterController.disableEmptyFilter(filter.toLowerCase());
      }
      return filterController.render();
    });
    tripController.render();
  });

  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`/sw.js`)
      .then(() => {
      }).catch(() => {
      });
  });

  window.addEventListener(`online`, () => {
    document.title = document.title.replace(` [offline]`, ``);

    apiWithProvider.sync();
  });

  window.addEventListener(`offline`, () => {
    document.title += ` [offline]`;
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
};

init();
