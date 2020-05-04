import EventItem from "../components/event-item.js";
import EditEvent from "../components/edit-event.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import moment from "moment";
import {getRandomDate} from "../mock/event.js";


export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  CREATING: `creating`
};

export const EmptyEvent = {
  id: String(Math.floor(getRandomDate() + Math.random())),
  type: `Bus to`,
  city: ``,
  photos: [],
  description: ``,
  services: [],
  start: Math.min(getRandomDate(), getRandomDate()),
  end: Math.max(getRandomDate(), getRandomDate()),
  price: 0,
  isFavorite: false
};

const parseFormData = (formData) => {
  return {
    city: formData.get(`event-destination`),
    start: moment(formData.get(`event-start-time`), `DD/MM/YYYY HH:mm`),
    end: moment(formData.get(`event-end-time`), `DD/MM/YYYY HH:mm`),
    price: formData.get(`event-price`)
  };
};


export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._eventItem = null;
    this._editEvent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventComponent = new EventItem(event);
    this._eventEditComponent = new EditEvent(event);

    this._eventComponent.setClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData);

      this._onDataChange(this, event, Object.assign({}, event, data));
      this. _replaceEditToEvent();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._eventEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
      this._mode = Mode.EDIT;
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this. _replaceEditToEvent();
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.CREATING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        const container = document.querySelector(`.trip-events__trip-sort`);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(container, this._eventEditComponent, RenderPosition.AFTEREND);
        document.querySelector(`.event--edit`).classList.add(`trip-events__item`);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this. _replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;

  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.CREATING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this. _replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
