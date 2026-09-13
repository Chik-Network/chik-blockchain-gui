import type { ThemeAssets, ThemeVariantId } from '@chik-network/core';

import chikAudioSmall from '../assets/theme/chik/audio-small.svg';
import chikChikBlack from '../assets/theme/chik/chik-black.svg';
import chikChik from '../assets/theme/chik/chik.svg';
import chikChikCircle from '../assets/theme/chik/chik_circle.svg';
import chikDocumentSmall from '../assets/theme/chik/document-small.svg';
import chikModelSmall from '../assets/theme/chik/model-small.svg';
import chikOfferFileIcon from '../assets/theme/chik/offerFileIcon.svg';
import chikUnknownSmall from '../assets/theme/chik/unknown-small.svg';
import chikVideoSmall from '../assets/theme/chik/video-small.svg';
import chikWalletConnectToChik from '../assets/theme/chik/walletConnectToChik.svg';
import classicAudioSmall from '../assets/theme/classic/audio-small.svg';
import classicChikBlack from '../assets/theme/classic/chik-black.svg';
import classicChik from '../assets/theme/classic/chik.svg';
import classicChikCircle from '../assets/theme/classic/chik_circle.svg';
import classicDocumentSmall from '../assets/theme/classic/document-small.svg';
import classicModelSmall from '../assets/theme/classic/model-small.svg';
import classicOfferFileIcon from '../assets/theme/classic/offerFileIcon.svg';
import classicUnknownSmall from '../assets/theme/classic/unknown-small.svg';
import classicVideoSmall from '../assets/theme/classic/video-small.svg';
import classicWalletConnectToChik from '../assets/theme/classic/walletConnectToChik.svg';
import fieldAudioSmall from '../assets/theme/field/audio-small.svg';
import fieldChikBlack from '../assets/theme/field/chik-black.svg';
import fieldChik from '../assets/theme/field/chik.svg';
import fieldChikCircle from '../assets/theme/field/chik_circle.svg';
import fieldDocumentSmall from '../assets/theme/field/document-small.svg';
import fieldModelSmall from '../assets/theme/field/model-small.svg';
import fieldOfferFileIcon from '../assets/theme/field/offerFileIcon.svg';
import fieldUnknownSmall from '../assets/theme/field/unknown-small.svg';
import fieldVideoSmall from '../assets/theme/field/video-small.svg';
import fieldWalletConnectToChik from '../assets/theme/field/walletConnectToChik.svg';

/** Static per-variant SVG modules (whitelist only — no runtime loading from user input). */
export const GUI_THEME_ASSETS: Record<ThemeVariantId, ThemeAssets> = {
  classic: {
    chikCircle: classicChikCircle,
    chikWordmark: classicChik,
    chikWordmarkBlack: classicChikBlack,
    audioSmall: classicAudioSmall,
    documentSmall: classicDocumentSmall,
    modelSmall: classicModelSmall,
    unknownSmall: classicUnknownSmall,
    videoSmall: classicVideoSmall,
    offerFileIcon: classicOfferFileIcon,
    walletConnectToChik: classicWalletConnectToChik,
  },
  field: {
    chikCircle: fieldChikCircle,
    chikWordmark: fieldChik,
    chikWordmarkBlack: fieldChikBlack,
    audioSmall: fieldAudioSmall,
    documentSmall: fieldDocumentSmall,
    modelSmall: fieldModelSmall,
    unknownSmall: fieldUnknownSmall,
    videoSmall: fieldVideoSmall,
    offerFileIcon: fieldOfferFileIcon,
    walletConnectToChik: fieldWalletConnectToChik,
  },
  chik: {
    chikCircle: chikChikCircle,
    chikWordmark: chikChik,
    chikWordmarkBlack: chikChikBlack,
    audioSmall: chikAudioSmall,
    documentSmall: chikDocumentSmall,
    modelSmall: chikModelSmall,
    unknownSmall: chikUnknownSmall,
    videoSmall: chikVideoSmall,
    offerFileIcon: chikOfferFileIcon,
    walletConnectToChik: chikWalletConnectToChik,
  },
};
