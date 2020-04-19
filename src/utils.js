const MINUTES_PER_HOUR = 60;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const formatDate = (date, isLong) => {
  const dateYear = date.getFullYear();
  const dateMonth = (`0` + date.getMonth()).slice(-2);
  const dateDay = (`0` + date.getDate()).slice(-2);

  return isLong ? `${dateYear}-${dateMonth}-${dateDay}` : `${dateDay}/${dateMonth}/${dateYear.toString().slice(-2)}`;
};

export const formatTime = (hours, minutes) => {
  return `${hours}:${(`0` + minutes).slice(-2)}`;
};

export const getDuration = (time) => {
  return time.getHours() * MINUTES_PER_HOUR + time.getMinutes();
};
