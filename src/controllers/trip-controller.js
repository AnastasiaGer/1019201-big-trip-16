import {render, RenderPosition, remove} from "../utils/render.js";
import Sorting, {SortType} from "../components/trip-sort.js";
import DaysList from "../components/trip-list.js";
import DayNumber from "../components/day-number.js";
import NoEvents from "../components/no-events.js";
import {SORT_OPTIONS} from "../mock/sort.js";
import {EVENTS_AMOUNT} from "../mock/event.js";
import PointController from "./point-controller.js";


const getSortedEvents = (events, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => b.time - a.time);
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents.slice(from, to);
};

const generateDays = (events) => {
  return [...new Set(events.map((item) => new Date(item.start).toDateString()))].sort((a, b) => {
    return new Date(a).getDate() - new Date(b).getDate();
  });
};

const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);

    pointController.render(event);
    return pointController;
  });
};

const renderTripDay = (container, events, day, index, onDataChange, onViewChange) => {
  const tripDay = day ? new DayNumber(index + 1, day) : new DayNumber();
  const tripDayElement = tripDay.getElement();
  const eventsList = tripDayElement.querySelector(`.trip-events__list`);

  const pointController = renderEvents(eventsList, events, onDataChange, onViewChange);

  render(container, tripDay, RenderPosition.BEFOREEND);

  return pointController;
};

const renderEventsList = (container, events, onDataChange, onViewChange) => {
  let points = [];
  const eventsDates = generateDays(events);

  eventsDates.forEach((day, index) => {
    const dayEvents = events.filter((event) => {
      return day === new Date(event.start).toDateString();
    });

    points = points.concat(renderTripDay(container, dayEvents, day, index, onDataChange, onViewChange));
  });

  return points;
};

export default class TripController {
  constructor(container, pointsModel) {

    this._container = container;
    this._pointsModel = pointsModel;

    this._showedPointControllers = [];
    this._showingEventsCount = EVENTS_AMOUNT;
    this._tripSortComponent = new Sorting(SORT_OPTIONS);
    this._noEventsComponent = new NoEvents();
    this._dayListComponent = new DaysList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    const events = this._pointsModel.getEvents();

    this._dates = generateDays(events);

    render(this._container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayList = this._container.querySelector(`.trip-days`);


    if (events.length === 0) {
      remove(this._tripSortComponent);
      render(dayList, this._noEventsComponent, RenderPosition.BEFOREEND);

      return;
    }

    this._renderEvents(dayList, events.slice(0, this._showingEventsCount));
  }

  _removeEvents() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
    const dayList = this._container.querySelector(`.trip-days`);
    dayList.innerHTML = ``;
  }

  _renderEvents(container, events) {
    const newPoints = renderEventsList(container, events, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }

  _renderTripDay(container, events) {
    const newPoints = renderTripDay(container, events, this._onViewChange);
    this._showedPointControllers = newPoints;
  }

  _onDataChange(pointController, oldData, newData) {
    const isSuccess = this._pointsModel.updateEvent(oldData.id, newData);

    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((item) => item.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingEventsCount = EVENTS_AMOUNT;
    const tripEventsElement = document.querySelector(`.trip-events`);
    const dayList = tripEventsElement.querySelector(`.trip-days`);

    const sortedEvents = getSortedEvents(this._pointsModel.getEvents(), sortType, 0, this._showingEventsCount);

    dayList.innerHTML = ``;

    if (sortType === SortType.EVENT) {
      this._removeEvents();
      this._renderEvents(dayList, sortedEvents);
    } else {
      this._removeEvents();
      this._renderTripDay(dayList, sortedEvents);
    }
  }
}
