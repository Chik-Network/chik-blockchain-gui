import defaultsForPlotter from '../utils/defaultsForPlotter';
import optionsForPlotter from '../utils/optionsForPlotter';
import PlotterName from './PlotterName';

export default {
  displayName: 'Chik Proof of Space',
  options: optionsForPlotter(PlotterName.CHIKPOS),
  defaults: defaultsForPlotter(PlotterName.CHIKPOS),
  installInfo: { installed: true },
};
