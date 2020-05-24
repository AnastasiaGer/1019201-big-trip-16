import {FILTER_TYPE} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import Filter from "../components/trip-filter.js";
const disabledStyle = `pointer-events: none; cursor: default;`;

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

    const filters = Object.values(FILTER_TYPE).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._tripFiltersComponent;

    this._tripFiltersComponent = new Filter(filters);
    this._tripFiltersComponent.setFilterChangeHandler(this._onFilterChange);

    Object.values(FILTER_TYPE).map((filterType) => {
      if (!this._pointsModel.getPoints(filterType).length) {
        this._tripFiltersComponent.switchFilterAvailability(filterType, true, disabledStyle);
      }
    });

    if (oldComponent) {
      replace(this._tripFiltersComponent, oldComponent);
    } else {
      render(container, this._tripFiltersComponent, RenderPosition.AFTERBEGIN);
    }
  }

  setDefaultFilter() {
    this._pointsModel.setFilter(FILTER_TYPE.EVERYTHING);
    this._tripFiltersComponent.setActiveItem(FILTER_TYPE.EVERYTHING);
  }

  disableEmptyFilter(currentFilter, isDisabled) {
    this._tripFiltersComponent. switchFilterAvailability(currentFilter, isDisabled, disabledStyle);
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;

  }

  _onDataChange() {
    this.render();
  }
}
