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
import Stock from './models/stock.js';


const AUTHORIZATION = `Basic jndfjndfjknnjk`;
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

  const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
  newEventButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filterController.setDefaultView();
    tripController.createPoint(newEventButton);
  });

  const statisticsComponent = new Statistics(pointsModel);
  render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  statisticsComponent.hide();

  const loadDestinations = () => {
    return apiWithProvider.getDestinations()
    .then((destinations) => {
      if (destinations) {
        Stock.setDestinations(destinations);
      }
      return destinations;
    })
    .catch(() => {
      apiWithProvider.onError(`Ooops, SPA can't fetch destination list :(`);
    });
  };

  const loadOffers = () => {
    return apiWithProvider.getOffers()
    .then((offers) => {
      if (offers) {
        Stock.setOffers(offers);
      }
      return offers;
    })
    .catch(() => {
      apiWithProvider.onError(`Ooops, SPA can't fetch offer list :(`);
    });
  };

  const loadInfo = Promise.all([loadDestinations(), loadOffers()]);

  loadInfo
  .then((result) => {
    if (result.every((el) => el !== undefined)) {
      apiWithProvider.getPoints()
      .then((points) => {
        if (points) {
          pointsModel.setPoints(points);
          tripInfoController.render();
          Object.values(FILTER_TYPE).map((filter) => {
            const filteredPoints = getEventsByFilter(pointsModel.getPointsAll(), filter.toLowerCase());
            if (filteredPoints.length === 0) {
              return filterController.disableEmptyFilter(filter.toLowerCase());
            }
            return filterController.render();
          });
          tripController.render();
        }
      });
    }
  })
  .then(apiWithProvider.onLoad);

  const onOffline = () => {
    document.title += ` [offline]`;
  };

  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`/sw.js`);
    if (!window.navigator.onLine) {
      onOffline();
    }
  });

  window.addEventListener(`online`, () => {
    document.title = document.title.replace(` [offline]`, ``);
    apiWithProvider.sync();
  });

  window.addEventListener(`offline`, onOffline);

  tripTabsComponent.setOnChange((item) => {
    filterController.setDefaultView();
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
