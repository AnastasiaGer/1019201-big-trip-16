const FILTER_NAMES = [
  `Everything`, `Future`, `Past`
];


const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
    };
  });
};


export {generateFilters};

