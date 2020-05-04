import {render, RenderPosition, remove} from "../utils/render.js";
import Sorting from "../components/trip-sort.js";
import DaysList from "../components/trip-list.js";
import DayNumber from "../components/day-number.js";
import NoEvents from "../components/no-events.js";
import {EVENTS_AMOUNT} from "../mock/event.js";
import PointController, {Mode as PointControllerMode, EmptyEvent} from "./point-controller.js";
import {SORT_TYPE} from "../const.js";


const getSortedEvents = (events, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SORT_TYPE.TIME:
      sortedEvents = showingEvents.sort((a, b) => b.end - b.start - (a.end - a.start));
      break;
    case SORT_TYPE.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SORT_TYPE.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents.slice(from, to);
};
const generateDays = (events) => {
  return [...new Set(events.map((item) => new Date(item.start).toDateString()))].sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
};

const renderTripDay = (container, events, day, index, onDataChange, onViewChange) => {
  const tripDay = new DayNumber(index + 1, day);
  const tripDayElement = tripDay.getElement();
  const eventsList = tripDayElement.querySelector(`.trip-events__list`);

  const pointController = renderEvents(eventsList, events, onDataChange, onViewChange);
  render(container, tripDay, RenderPosition.BEFOREEND);

  return pointController;
};

const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);

    pointController.render(event, PointControllerMode.DEFAULT);
    return pointController;
  });
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
    this._tripSortComponent = new Sorting();
    this._noEventsComponent = new NoEvents();
    this._dayListComponent = new DaysList();
    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

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

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._creatingEvent = new PointController(this._container, this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyEvent, PointControllerMode.CREATING);
    this._onViewChange();
  }

  _removeEvents() {
    this._dayListComponent.getElement().innerHTML = ``;
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _renderEvents(container, events) {
    const newPoints = renderEventsList(container, events, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }

  _renderTripDay(container, events) {
    const newPoints = renderTripDay(container, events, this._onDataChange, this._onViewChange);
    this._showedPointControllers = newPoints;
  }

  _updateEvents(count) {
    this._removeEvents();
    this._renderEvents(this._pointsModel.getEvents().slice(0, count));
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        pointController.destroy();
        this._updateEvents(this._showingEventsCount);
      } else {
        this._pointsModel.addEvent(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);

        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
        this._showingEventsCount = this._showedPointControllers.length;
      }
    } else if (newData === null) {
      this._pointsModel.removeEvent(oldData.id);
      this._updateEvents(this._showingEventsCount);
    } else {
      const isSuccess = this._pointsModel.updateEvent(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
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

    if (sortType === SORT_TYPE.EVENT) {
      this._removeEvents();
      this._renderEvents(dayList, sortedEvents);
    } else {
      this._removeEvents();
      this._renderTripDay(dayList, sortedEvents);
    }
  }

  _onFilterChange() {
    this._updateEvents(EVENTS_AMOUNT);
  }
}
