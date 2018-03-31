export default {
  '1': {
    // step: 15
    row: 4,
    col: 2,
    colors: [],
    similar: 60,
    limitTime: 10,
    next: '2'
  },
  '2': {
    // step: 15
    row: 4,
    col: 3,
    colors: [],
    similar: 90,
    limitTime: 16,
    prev: '1',
    next: '3'
  },
  '3': {
    // step: 15
    row: 4,
    col: 4,
    colors: [],
    similar: 120,
    limitTime: 20,
    prev: '2',
    next: '4'
  },
  '4': {
    // step: 12
    row: 4,
    col: 4,
    colors: [],
    similar: 96,
    limitTime: 20,
    prev: '3',
    next: '5'
  },
  '5': {
    // step: 12
    row: 5,
    col: 4,
    colors: [],
    similar: 120,
    limitTime: 20,
    prev: '4'
  }
};
