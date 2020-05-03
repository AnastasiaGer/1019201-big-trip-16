const FILTER_NAMES = [`Everything`, `Future`, `Past`];
export const TABS_NAMES = [`Table`, `Stats`];

const generateArrs = (arr) => {
  return arr.map((item) => {
    return {
      name: item
    };
  });
};

export const generateFilters = () => {
  return generateArrs(FILTER_NAMES);
};

export const generateTabs = () => {
  return generateArrs(TABS_NAMES);
};
