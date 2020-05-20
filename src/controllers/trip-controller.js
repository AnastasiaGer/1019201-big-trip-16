import {render, RenderPosition, remove} from "../utils/render.js";
import {SORT_TYPE} from "../const.js";
import DayNumber from "../components/day-number.js";
import DaysList from "../components/trip-list.js";
import NoEvents from "../components/no-events.js";
import PointController, {Mode as PointControllerMode, EmptyEvent} from "./point-controller.js";
import Sorting from "../components/trip-sort.js";

const renderPoints = (events, container, onDataChange, onViewChange, isDefaultSorting = true) => {
  const pointControllers = [];

  const dates = isDefaultSorting
    ? [...new Set(events.map((elem) => new Date(elem.start).toDateString()))]
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting
      ? new DayNumber(date, dateIndex + 1)
      : new DayNumber();

    const dayElement = day.getElement();

    events.filter((event) => {
      return isDefaultSorting ? new Date(event.start).toDateString() === date : event;
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
  constructor(container, filterController, pointsModel, api) {
    this._container = container;
    this._filterController = filterController;
    this._pointsModel = pointsModel;
    this._api = api;

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

  hide() {
    this._daysContainer.hide();
    this._updatePoints();
  }

  show() {
    this._daysContainer.show();
    this._updatePoints();
  }

  getPoints() {
    return this._pointsModel.getPoints();
  }

  render() {
    const points = this._pointsModel.getPoints();

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
    if (this._pointsModel.getPointsAll().length <= 0) {
      render(this._container, this._noTasksComponent);
    } else {
      remove(this._noTasksComponent);
      this.render(this._daysContainer.getElement(), this._pointsModel.getPoints());
      if (this._pointsModel.getPoints().length === 0) {
        this._filterController.disableEmptyFilter(this._pointsModel.getActiveFilterType());
      }
    }
  }

  _onDataChange(pointController, oldData, newData) {

    if (oldData === EmptyEvent) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            this._pointsControllers = [].concat(pointController, this._pointsControllers);
            this._updatePoints();
          })
        .catch(() => {
          pointController.shake();
        });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updatePoints();
        })
        .catch(() => {
          pointController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);

          if (isSuccess) {
            pointController.render(pointModel, PointControllerMode.DEFAULT);
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    let isDefaultSorting = false;
    const points = this._pointsModel.getPoints();

    switch (sortType) {
      case SORT_TYPE.EVENT:
        sortedPoints = points.slice();
        isDefaultSorting = true;
        break;
      case SORT_TYPE.PRICE:
        sortedPoints = points.slice().sort((a, b) => b.price - a.price);
        break;
      case SORT_TYPE.TIME:
        sortedPoints = points.slice().sort((a, b) => (b.end - b.start) - (a.end - a.start));
        break;
    }

    this._removePoints();
    this._pointsControllers = renderPoints(sortedPoints, this._daysContainer, this._onDataChange, this._onViewChange, isDefaultSorting);
  }

  _onViewChange() {
    this._pointsControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
