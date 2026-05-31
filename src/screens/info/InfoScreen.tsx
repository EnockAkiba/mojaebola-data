import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { DarkTheme, LightTheme } from '../../config/Theme';

import { articles } from "../../data/articles";
import { translations } from '../../data/translations';

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

const LANGUAGES = ['Français', 'Kiswahili', 'Lingala'];
const FILTERS = ['Tous', 'Symptômes', 'Prévention', 'Traitement', 'Situation'];

// ─── TRADUCTIONS UI ───────────────────────────────────────────────────────────



// ─── ARTICLES COMPLETS ────────────────────────────────────────────────────────



// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

export default function InfoScreen({ navigation }: any) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  const [selectedLanguage, setSelectedLanguage] = useState('Français');
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  const t = translations[selectedLanguage];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      if (selectedFilter === 'Tous') return true;
      return article.category === selectedFilter;
    });
  }, [selectedFilter]);

  const renderArticle = ({ item }: any) => {
    const title = item.titles[selectedLanguage] ?? item.titles['Français'];
    const preview = item.previews[selectedLanguage] ?? item.previews['Français'];

    return (
      <TouchableOpacity
        activeOpacity={0.82}
        style={[
          styles.articleCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: scheme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E5E7EB',
          },
        ]}
        onPress={() =>
          navigation.navigate('ArticleDetailScreen', {
            article: { ...item, title, preview, language: selectedLanguage },
          })
        }
      >
        <View style={[styles.leftBorder, { backgroundColor: item.color }]} />
        <View style={styles.articleContent}>
          <View style={[styles.categoryBadge, { backgroundColor: `${item.color}20` }]}>
            <Ionicons name={item.icon} size={11} color={item.color} style={{ marginRight: 5 }} />
            <Text style={[styles.categoryText, { color: item.color }]}>{item.category}</Text>
          </View>
          <Text style={[styles.articleTitle, { color: theme.colors.text }]}>{title}</Text>
          <Text numberOfLines={2} style={[styles.articlePreview, { color: theme.colors.subText }]}>
            {preview}
          </Text>
          <Text style={[styles.readTime, { color: theme.colors.subText }]}>
            {item.readTime} de lecture
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.subText} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />

      <FlatList
        data={filteredArticles}
        keyExtractor={item => item.id}
        renderItem={renderArticle}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* LANGUES */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.languageContainer}
            >
              {LANGUAGES.map(language => {
                const active = selectedLanguage === language;
                return (
                  <TouchableOpacity
                    key={language}
                    activeOpacity={0.85}
                    style={[
                      styles.languageButton,
                      {
                        backgroundColor: active ? '#D64545' : theme.colors.card,
                        borderColor: scheme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E5E7EB',
                      },
                    ]}
                    onPress={() => {
                      setSelectedLanguage(language);
                      setSelectedFilter('Tous');
                    }}
                  >
                    <Text style={[styles.languageText, { color: active ? '#FFFFFF' : theme.colors.text }]}>
                      {language}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* STATS */}
            <View style={[styles.statsCard, {
              backgroundColor: theme.colors.card,
              borderColor: scheme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E5E7EB',
            }]}>
              <Text style={[styles.statsTitle, { color: theme.colors.text }]}>{t.statsTitle}</Text>
              <View style={styles.statsRow}>
                {t.stats.map((s: any, i: number) => (
                  <View key={i} style={styles.statItem}>
                    <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.subText }]}>{s.label}</Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.statsSource, { color: theme.colors.subText }]}>{t.source}</Text>
            </View>

            {/* FILTRES */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContainer}
            >
              {t.filters.map((filter: string, index: number) => {
                const originalFilter = FILTERS[index];
                const active = selectedFilter === originalFilter;
                return (
                  <TouchableOpacity
                    key={filter}
                    activeOpacity={0.85}
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor: active ? '#D64545' : theme.colors.card,
                        borderColor: scheme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E5E7EB',
                      },
                    ]}
                    onPress={() => setSelectedFilter(originalFilter)}
                  >
                    <Text style={[styles.filterText, { color: active ? '#FFFFFF' : theme.colors.text }]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* ALERTE */}
            <View style={styles.alertCard}>
              <View style={styles.alertTop}>
                <Ionicons name="megaphone" size={18} color="#FFFFFF" />
                <View style={styles.alertBadge}>
                  <Text style={styles.alertBadgeText}>{t.alertBadge}</Text>
                </View>
              </View>
              <Text style={styles.alertTitle}>{t.alertTitle}</Text>
              <Text style={styles.alertDescription}>{t.alertText}</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.who.int/fr/emergencies/disease-outbreak-news')}>
                <Text style={styles.readMore}>{t.readMore} →</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionLabel, { color: theme.colors.subText }]}>
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
            </Text>
          </>
        }
      />

      {/* URGENCE STICKY */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.emergencyButton}
        onPress={() => Linking.openURL('tel:08214419595')}
      >
        <Ionicons name="call" size={18} color="#FFFFFF" />
        <Text style={styles.emergencyText}>{t.emergency}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  languageContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4 },
  languageButton: {
    paddingHorizontal: 18, paddingVertical: 12,
    borderRadius: 30, marginRight: 12, borderWidth: 1,
  },
  languageText: { fontWeight: '700', fontSize: 13 },

  statsCard: {
    marginHorizontal: 20, marginTop: 18,
    borderRadius: 20, padding: 18, borderWidth: 1,
  },
  statsTitle: { fontSize: 13, fontWeight: '700', marginBottom: 14 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 26, fontWeight: '900' },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 4, textAlign: 'center', maxWidth: 80 },
  statsSource: { fontSize: 10, marginTop: 14, textAlign: 'center' },

  filtersContainer: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 },
  filterButton: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 30, marginRight: 12, borderWidth: 1,
  },
  filterText: { fontWeight: '700', fontSize: 13 },

  alertCard: {
    marginHorizontal: 20, marginTop: 18,
    backgroundColor: '#E67E22', borderRadius: 24,
    padding: 20, marginBottom: 10,
  },
  alertTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  alertBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  alertBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  alertTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 8 },
  alertDescription: { color: '#FFF7E8', fontSize: 13, lineHeight: 22, marginBottom: 16 },
  readMore: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },

  sectionLabel: {
    fontSize: 12, fontWeight: '700',
    marginHorizontal: 20, marginTop: 18, marginBottom: 12,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },

  articleCard: {
    marginHorizontal: 20, marginBottom: 14,
    borderRadius: 22, padding: 18, borderWidth: 1,
    flexDirection: 'row', alignItems: 'center',
  },
  leftBorder: { width: 5, borderRadius: 10, alignSelf: 'stretch', marginRight: 16 },
  articleContent: { flex: 1 },
  categoryBadge: {
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-start', paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 30, marginBottom: 10,
  },
  categoryText: { fontWeight: '800', fontSize: 11 },
  articleTitle: { fontSize: 14, fontWeight: '800', lineHeight: 22, marginBottom: 8 },
  articlePreview: { fontSize: 12, lineHeight: 20, marginBottom: 10 },
  readTime: { fontSize: 11, fontWeight: '700' },

  emergencyButton: {
    position: 'absolute', bottom: 20, left: 20, right: 20,
    height: 58, backgroundColor: '#D64545', borderRadius: 18,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 }, shadowRadius: 18, elevation: 8, gap: 10,
  },
  emergencyText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
});
