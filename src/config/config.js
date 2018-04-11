import easyRound from './round/easy';
import normalRound from './round/normal';
import hardRound from './round/hard';
import expertRound from './round/expert';
import insaneRound from './round/insane';
const Config = {};

Config.debug = true;

Config.punishmentCoefficient = 2;

Config.round = {
  'easy': easyRound,
  'normal': normalRound,
  'hard': hardRound,
  'expert': expertRound,
  'insane': insaneRound
};

Config.roundInfo = {
  'easy': {
    key: 'easy',
    name: '简单',
    startLevel: '1',
    count: 5,
    color: '#4d8bca'
  },
  'normal': {
    key: 'normal',
    name: '普通',
    startLevel: '1',
    count: 5,
    color: '#b27435'
  },
  'hard': {
    key: 'hard',
    name: '困难',
    startLevel: '1',
    count: 5,
    color: '#d85b5b'
  },
  'expert': {
    key: 'expert',
    name: '大师',
    startLevel: '1',
    count: 5,
    color: '#9e5fdc'
  },
  'insane': {
    key: 'insane',
    name: '疯狂',
    startLevel: '1',
    count: 5
  }
}

Config.displayRound = ['easy', 'normal', 'hard', 'expert'];

Config.specialRound = 'insane';

Config.bgColor = '#0b0218';

module.exports = Config;
