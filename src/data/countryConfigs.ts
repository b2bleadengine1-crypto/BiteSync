/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CountryInfo {
  countryKey: string;
  countryName: string;
  flag: string;
  region: string;
  culturalNote: string;
}

export const COUNTRY_INFO_MAP: Record<string, CountryInfo> = {
  Portuguese: {
    countryKey: 'Portuguese',
    countryName: 'Portugal',
    flag: '🇵🇹',
    region: 'Península Ibérica & Ilhas',
    culturalNote: 'Herança canónica mediterrânica e atlântica: azeite, alho, louro e marisco.'
  },
  Italian: {
    countryKey: 'Italian',
    countryName: 'Itália',
    flag: '🇮🇹',
    region: 'Mediterrâneo',
    culturalNote: 'Tradição artesanal de massas frescas, pomodoro, manjericão e queijos curados.'
  },
  French: {
    countryKey: 'French',
    countryName: 'França',
    flag: '🇫🇷',
    region: 'Europa Ocidental',
    culturalNote: 'Alta cozinha clássica, manteiga artesanal, roux e reduções aveludadas.'
  },
  British: {
    countryKey: 'British',
    countryName: 'Reino Unido',
    flag: '🇬🇧',
    region: 'Ilhas Britânicas',
    culturalNote: 'Conforto rústico de tartes quentes, assados dominicais e caçarolas de forno.'
  },
  Spanish: {
    countryKey: 'Spanish',
    countryName: 'Espanha',
    flag: '🇪🇸',
    region: 'Península Ibérica',
    culturalNote: 'Tapas autênticas, açafrão, pimentão e arrozes em paellera.'
  },
  Greek: {
    countryKey: 'Greek',
    countryName: 'Grécia',
    flag: '🇬🇷',
    region: 'Mediterrâneo Oriental',
    culturalNote: 'Azeite de oliveira milenar, queijo feta, orégãos selvagens e citrinos.'
  },
  Japanese: {
    countryKey: 'Japanese',
    countryName: 'Japão',
    flag: '🇯🇵',
    region: 'Ásia Oriental',
    culturalNote: 'Precisão umami, fermentações naturais, dashi e mestria de corte.'
  },
  Mexican: {
    countryKey: 'Mexican',
    countryName: 'México',
    flag: '🇲🇽',
    region: 'América Central',
    culturalNote: 'Tradição ancestral de milho, chiles defumados, coentros e especiarias vibrantes.'
  },
  Indian: {
    countryKey: 'Indian',
    countryName: 'Índia',
    flag: '🇮🇳',
    region: 'Sul da Ásia',
    culturalNote: 'Alquimia milenar de masalas, curcuma, cardamomo e leguminosas ricas.'
  },
  Default: {
    countryKey: 'Default',
    countryName: 'Global',
    flag: '🌍',
    region: 'Cozinha Internacional',
    culturalNote: 'Compêndio de técnicas universais e sabores do mundo.'
  }
};

export function detectCountryInfo(area?: string, tags: string[] = [], title: string = ''): CountryInfo {
  const combined = `${area || ''} ${tags.join(' ')} ${title}`.toLowerCase();

  if (combined.includes('portug') || combined.includes('alentej') || combined.includes('minho') || combined.includes('açores') || combined.includes('madeira')) {
    return COUNTRY_INFO_MAP.Portuguese;
  }
  if (combined.includes('ital')) return COUNTRY_INFO_MAP.Italian;
  if (combined.includes('fren') || combined.includes('franc')) return COUNTRY_INFO_MAP.French;
  if (combined.includes('brit') || combined.includes('ingla') || combined.includes('irish')) return COUNTRY_INFO_MAP.British;
  if (combined.includes('span') || combined.includes('espan')) return COUNTRY_INFO_MAP.Spanish;
  if (combined.includes('greek') || combined.includes('grec')) return COUNTRY_INFO_MAP.Greek;
  if (combined.includes('japan') || combined.includes('jap')) return COUNTRY_INFO_MAP.Japanese;
  if (combined.includes('mexic')) return COUNTRY_INFO_MAP.Mexican;
  if (combined.includes('indi')) return COUNTRY_INFO_MAP.Indian;

  return COUNTRY_INFO_MAP.Default;
}
