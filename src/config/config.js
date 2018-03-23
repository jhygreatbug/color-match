import easyRound from './round/easy';
import normalRound from './round/normal';
import hardRound from './round/hard';
import expertRound from './round/expert';
import insaneRound from './round/insane';
const Config = {};

Config.debug = true;

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
    startColor: '',
    endColor: ''
  },
  'normal': {
    key: 'normal',
    name: '普通',
    startColor: '',
    endColor: ''
  },
  'hard': {
    key: 'hard',
    name: '困难',
    startColor: '',
    endColor: ''
  },
  'expert': {
    key: 'expert',
    name: '大师',
    startColor: '',
    endColor: ''
  },
  'insane': {
    key: 'insane',
    name: '疯狂',
    startColor: '',
    endColor: ''
  }
}

Config.displayRound = ['easy', 'normal', 'hard', 'expert'];

Config.specialRound = 'insane'

export default Config;
