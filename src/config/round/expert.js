export default {
  '1': {
    // step: 10
    row: 5,
    col: 4,
    colors: [],
    similar: 100,
    limitTime: 40,
    next: '2'
  },
  '2': {
    // step: 8
    row: 5,
    col: 4,
    colors: [],
    similar: 80,
    limitTime: 40,
    prev: '1',
    next: '3'
  },
  '3': {
    // step: 8
    row: 6,
    col: 4,
    colors: [],
    similar: 96,
    limitTime: 48,
    prev: '2',
    next: '4'
  },
  '4': {
    // step: 7
    row: 6,
    col: 4,
    colors: [],
    similar: 84,
    limitTime: 48,
    prev: '3',
    next: '5'
  },
  '5': {
    // step: 7
    row: 6,
    col: 5,
    colors: [],
    similar: 105,
    limitTime: 60,
    prev: '4'
  }
};
