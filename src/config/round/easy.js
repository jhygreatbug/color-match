export default {
  '1': {
    // step: 30
    row: 3,
    col: 2,
    colors: [],
    similar: 100,
    time: 60,
    next: '2'
  },
  '2': {
    // step: 25
    row: 4,
    col: 2,
    colors: [],
    similar: 100,
    time: 60,
    prev: '1',
    next: '3'
  },
  '3': {
    // step: 20
    row: 4,
    col: 2,
    colors: [],
    similar: 80,
    time: 60,
    prev: '2',
    next: '4'
  },
  '4': {
    // step: 20
    row: 4,
    col: 3,
    colors: [],
    similar: 120,
    time: 60,
    prev: '3',
    next: '5'
  },
  '5': {
    // step: 16
    row: 4,
    col: 3,
    colors: [],
    similar: 96,
    time: 60,
    prev: '4'
  }
};
