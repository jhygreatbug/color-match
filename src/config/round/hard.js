export default {
  '1': {
    // step: 10
    row: 4,
    col: 4,
    colors: [],
    similar: 80,
    time: 60,
    next: '2'
  },
  '2': {
    // step: 10
    row: 5,
    col: 4,
    colors: [],
    similar: 100,
    time: 60,
    prev: '1',
    next: '3'
  },
  '3': {
    // step: 10
    row: 5,
    col: 4,
    colors: [],
    similar: 100,
    time: 60,
    prev: '2',
    next: '4'
  },
  '4': {
    // step: 8
    row: 5,
    col: 4,
    colors: [],
    similar: 80,
    time: 60,
    prev: '3',
    next: '5'
  },
  '5': {
    // step: 8
    row: 6,
    col: 4,
    colors: [],
    similar: 96,
    time: 60,
    prev: '4'
  }
};
