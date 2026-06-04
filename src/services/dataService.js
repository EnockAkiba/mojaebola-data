import AsyncStorage from '@react-native-async-storage/async-storage';
import centers from '../data/centers.json';
import slides from '../data/slides.json';
import app from '../data/app.json';
import epidemic from '../data/epidemic.json';
import about from '../data/about.json';
import articles from "../data/articles.json";
import homeTrans from "../data/homeTrans.json";
import zonesRisque from "../data/zonesRisque.json";
import onBoarding from "../data/onBoarding.json";
import riskStats from '../data/riskStats.json';

const BASE_URL = 'https://raw.githubusercontent.com/EnockAkiba/mojaebola-app/refs/heads/main/src/data/';

const FILES = {
  articles:     `${BASE_URL}articles.json`,
  translations: `${BASE_URL}homeTrans.json`,
  centers:      `${BASE_URL}centers.json`,
  slides:       `${BASE_URL}slides.json`,
  app:          `${BASE_URL}app.json`,
  epidemic:     `${BASE_URL}epidemic.json`,
  about:        `${BASE_URL}about.json`,
  zonesRisque:   `${BASE_URL}zonesRisque.json`,
  riskStats:     `${BASE_URL}riskStats.json`,
  onBoarding:   `${BASE_URL}onBoarding.json`,
};

// Normalise la donnée selon la clé (évite les incohérences de format)
const normalize = (key, data) => {
  if (key === 'translations') return data?.translations ?? data;
  return data;
};

export const getData = async (key) => {
  try {
    const local = await AsyncStorage.getItem(key);

    if (local) {
      loadFromGitHub(key); // mise à jour silencieuse
      return JSON.parse(local);
    }

    // Première ouverture → fallback embarqué
    const fallbacks = {
      articles:     articles,
      translations: normalize('translations', homeTrans),
      centers:      centers,
      slides:       slides,
      app:          app,
      epidemic:     epidemic,
      about:        about,
      zonesRisque:  zonesRisque,
      riskStats:    riskStats,
      onBoarding:   onBoarding,
    };

    const fallback = fallbacks[key] ?? null;
    if (fallback) {
      await AsyncStorage.setItem(key, JSON.stringify(fallback));
    }

    loadFromGitHub(key);
    return fallback;
  } catch (error) {
    console.log('Erreur getData:', error);
    return null;
  }
};

const loadFromGitHub = async (key) => {
  if (!FILES[key]) return; // clé inconnue → on ignore

  try {
    const response = await fetch(FILES[key]);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const remoteData = await response.json();
    const normalized = normalize(key, remoteData);

    const local = await AsyncStorage.getItem(key);
    const localData = local ? JSON.parse(local) : null;

    if (!localData || remoteData.version !== localData.version) {
      await AsyncStorage.setItem(key, JSON.stringify(normalized));
      console.log(`[dataService] ${key} mis à jour depuis GitHub`);
    }
  } catch (error) {
    console.log('Erreur update GitHub:', error);
  }
};