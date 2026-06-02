import AsyncStorage from '@react-native-async-storage/async-storage';
import { articles } from '../data/articles.json';
import { translations } from '../data/translations.json';
import { centers } from '../data/centers.json';
import { slides } from '../data/slides.json';
import { app } from '../data/app.json';
import { epidemic } from '../data/epidemic.json';
import { about } from '../data/about.json';

const BASE_URL = 'https://raw.githubusercontent.com/EnockAkiba/mojaebola-data/refs/heads/main/';


const FILES = {
    articles: `${BASE_URL}/articles.json`,
    translations: `${BASE_URL}/translations.json`,
    centers: `${BASE_URL}/centers.json`,
    slides: `${BASE_URL}/slides.json`,
    app: `${BASE_URL}/app.json`,
    epidemic: `${BASE_URL}/epidemic.json`,
    about: `${BASE_URL}/about.json`,
};


export const getData = async (key) => {
    try {
        const local = await AsyncStorage.getItem(key);

        // 1. Si données locales existent
        if (local) {
            loadFromGitHub(key); // update background
            return JSON.parse(local);
        }

        // 2. Si première ouverture → utiliser OFFLINE EMBARQUÉ
        let fallback = null;

        if (key === 'articles') fallback = articles;
        if (key === 'translations') fallback = translations;
        if (key === 'centers') fallback = centers;
        if (key === 'slides') fallback = slides;
        if (key === 'app') fallback = app;
        if (key === 'epidemic') fallback = epidemic;
        if (key === 'about') fallback = about;

        // Sauvegarde immédiate en local
        await AsyncStorage.setItem(key, JSON.stringify(fallback));

        // update background
        loadFromGitHub(key);

        return fallback;
    } catch (error) {
        console.log('Erreur getData:', error);
        return null;
    }
};



const fetchFromGitHub = async (key) => {
    try {
        const response = await fetch(FILES[key]);
        const data = await response.json();

        await AsyncStorage.setItem(key, JSON.stringify(data));

        return data;
    } catch (error) {
        console.log('Erreur GitHub:', error);
        return null;
    }
};


const loadFromGitHub = async (key) => {
    try {
        const response = await fetch(FILES[key]);
        const remoteData = await response.json();

        const local = await AsyncStorage.getItem(key);
        const localData = local ? JSON.parse(local) : null;

        if (!localData || remoteData.version !== localData.version) {
            await AsyncStorage.setItem(key, JSON.stringify(remoteData));
            console.log(`${key} mis à jour`);
        }
    } catch (error) {
        console.log('Erreur update GitHub:', error);
    }
};