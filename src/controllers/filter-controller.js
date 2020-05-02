import Filter from "../components/trip-filter.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getEventsByFilter} from "../utils/filter.js";
import {FILTER_TYPE} from "../const.js";


export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FILTER_TYPE.EVERYTHING;
    this._tripFiltersComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allEvents = this._pointsModel.getEventsAll();

    const filters = Object.values(FILTER_TYPE).map((filterType) => {
      return {
        name: filterType,
        count: getEventsByFilter(allEvents, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._tripFiltersComponent;

    this._tripFiltersComponent = new Filter(filters);
    this._tripFiltersComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._tripFiltersComponent, oldComponent);
    } else {
      render(container, this._tripFiltersComponent, RenderPosition.AFTEREND);
    }
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
