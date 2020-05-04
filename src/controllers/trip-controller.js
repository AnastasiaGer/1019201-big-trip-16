import {render, RenderPosition} from "../utils/render.js";
import Sorting from "../components/trip-sort.js";
import DaysList from "../components/trip-list.js";
import DayNumber from "../components/day-number.js";
import NoEvents from "../components/no-events.js";
import PointController, {Mode as PointControllerMode, EmptyEvent} from "./point-controller.js";
import {SORT_TYPE} from "../const.js";


const renderPoints = (events, container, onDataChange, onViewChange) => {
  const pointControllers = [];

  const dates = [...new Set(events.map((elem) => new Date(elem.start).toDateString()))];

  dates.forEach((date, dateIndex) => {
    const day = new DayNumber(date, dateIndex + 1);

    const dayElement = day.getElement();

    events.filter((event) => {
      return new Date(event.start).toDateString() === date;
    }).map((event) => {
      const pointController = new PointController(dayElement, onDataChange, onViewChange);
      pointController.render(event, PointControllerMode.DEFAULT);
      pointControllers.push(pointController);

      return pointController;
    });

    render(container.getElement(), day, RenderPosition.BEFOREEND);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._pointsControllers = [];
    this._noTasksComponent = new NoEvents();
    this._sortComponent = new Sorting();
    this._daysContainer = new DaysList();
    this._creatingPoint = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const points = this._pointsModel.getEvents();

    const container = this._container;

    if (points.length === 0) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
      render(container, this._daysContainer, RenderPosition.BEFOREEND);

      this._pointsControllers = renderPoints(points, this._daysContainer, this._onDataChange, this._onViewChange);
      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    }
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(this._container, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyEvent, PointControllerMode.CREATING);
    this._onViewChange();
  }

  _removePoints() {
    this._daysContainer.getElement().innerHTML = ``;
    this._pointsControllers.forEach((pointController) => pointController.destroy());
    this._pointsControllers = [];
  }

  _updatePoints() {
    this._removePoints();
    this._pointsControllers = renderPoints(this._pointsModel.getEvents(), this._daysContainer, this._onDataChange, this._onViewChange);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _onDataChange(pointController, oldData, newData) {

    if (oldData === EmptyEvent) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addEvent(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);

        this._pointsControllers = [].concat(pointController, this._pointsControllers);
        this._updatePoints();
      }
    } else if (newData === null) {
      this._pointsModel.removeEvent(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updateEvent(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];

    const points = this._pointsModel.getEvents();

    switch (sortType) {
      case SORT_TYPE.EVENT:
        sortedPoints = points.slice();
        break;
      case SORT_TYPE.PRICE:
        sortedPoints = points.slice().sort((a, b) => b.price - a.price);
        break;
      case SORT_TYPE.TIME:
        sortedPoints = points.slice().sort((a, b) => (b.end - b.start) - (a.end - a.start));
        break;
    }

    this._removePoints();
    this._pointsControllers = renderPoints(sortedPoints, this._daysContainer, this._onDataChange, this._onViewChange);
  }

  _onViewChange() {
    this._pointsControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
