import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import { getData } from '../../services/dataService';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LightTheme, DarkTheme } from '../../config/Theme';

export type PublicHomeScreenProps = {
  navigation?: {
    navigate: (screen: string) => void;
  };
};


function openEmergencyLine() {
  const phone = '08214419595';

  Linking.openURL(`tel:${phone}`).catch(() => {
    Alert.alert(
      'Erreur',
      "Impossible d'effectuer l'appel."
    );
  });
}
const languageOptions = ['FR', 'SW', 'LG'];
export default function PublicHomeScreen({
  navigation,
}: PublicHomeScreenProps) {
  const [language, setLanguage] = useState('FR');
  const [translationsData, setTranslationsData] = useState(null);
  const scheme = useColorScheme();

  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  const t =
  translationsData?.[language] ??
  translationsData?.FR ??
  {};
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getData('translations');
        setTranslationsData(data);
      } catch (e) {
        console.log('Erreur chargement translations:', e);
      }
    };

    load();
  }, []);
  const handleNavigate = (screen: string) => {
    navigation?.navigate?.(screen);
  };
  const actionCards = useMemo(
    () => [
      {
        key: 'report',
        title: t.report,
        subtitle: t.reportDesc,
        color: '#D64545',
        icon: 'warning',
        screen: 'ReportCaseScreen',
      },

      {
        key: 'risk',
        title: t.risk,
        subtitle: t.riskDesc,
        color: '#F39C12',
        icon: 'location',
        screen: 'RiskZonesScreen',
      },

      {
        key: 'info',
        title: t.info,
        subtitle: t.infoDesc,
        color: '#2980B9',
        icon: 'book',
        screen: 'InfoScreen',
      },

      {
        key: 'ctes',
        title: t.centers,
        subtitle: t.centersDesc,
        color: '#16A085',
        icon: 'medkit',
        screen: 'CTEScreen',
      },
    ],
    [language, t]
  );
  if (!translationsData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>
          Chargement...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.colors.background,
        },
      ]}
    >
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        {/* HERO */}
        <View
          style={[
            styles.heroSection,
            {
              backgroundColor:
                theme.colors.hero,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.welcomeText}>
                {t.welcome}
              </Text>

              <Text style={styles.appTitle}>
                {t.appTitle}
              </Text>
            </View>

            <View style={styles.logoContainer}>
              <Ionicons
                name="shield-checkmark"
                size={34}
                color="#FFFFFF"
              />
            </View>
          </View>

          <Text style={styles.heroDescription}>
            {t.heroDescription}
          </Text>

          {/* LANGUAGES */}
          <View style={styles.languageContainer}>
            {languageOptions.map(option => {
              const active =
                option === language;

              return (
                <Pressable
                  key={option}
                  onPress={() =>
                    setLanguage(option)
                  }
                  style={[
                    styles.languageButton,
                    active &&
                    styles.languageButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.languageText,
                      active &&
                      styles.languageTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ALERT */}
        <View
          style={[
            styles.alertCard,
            {
              backgroundColor:
                theme.colors.card,
            },
          ]}
        >
          <View style={styles.alertBadge}>
            <Text
              style={styles.alertBadgeText}
            >
              {t.alert}
            </Text>
          </View>

          <Text
            style={[
              styles.alertTitle,
              { color: theme.colors.text },
            ]}
          >
            {t.epidemicTitle}
          </Text>

          <Text
            style={[
              styles.alertDescription,
              {
                color:
                  theme.colors.subText,
              },
            ]}
          >
            {t.epidemicDescription}
          </Text>

          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={openEmergencyLine}
          >
            <Ionicons
              name="call"
              size={18}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.emergencyButtonText
              }
            >
              {t.call}
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECTION */}
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text },
            ]}
          >
            {t.services}
          </Text>

          <Text
            style={[
              styles.sectionSubtitle,
              {
                color:
                  theme.colors.subText,
              },
            ]}
          >
            {t.servicesDescription}
          </Text>
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {actionCards.map(card => (
            <TouchableOpacity
              key={card.key}
              activeOpacity={0.85}
              style={[
                styles.cardWrapper,
                {
                  backgroundColor:
                    theme.colors.card,
                },
              ]}
              onPress={() =>
                handleNavigate(card.screen)
              }
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      card.color,
                  },
                ]}
              >
                <Ionicons
                  name={card.icon}
                  size={28}
                  color="#FFFFFF"
                />
              </View>

              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.colors.text,
                  },
                ]}
              >
                {card.title}
              </Text>

              <Text
                style={[
                  styles.cardSubtitle,
                  {
                    color:
                      theme.colors.subText,
                  },
                ]}
              >
                {card.subtitle}
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color={
                  theme.colors.subText
                }
                style={{ marginTop: 14 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <Pressable
              onPress={() =>
                handleNavigate(
                  'LoginScreen'
                )
              }
            >
              <Text style={styles.footerLink}>
                {t.healthAgent}
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                handleNavigate('AboutScreen')
              }
            >
              <Text style={styles.footerLink}>
                À propos
              </Text>
            </Pressable>
          </View>

          <Text style={styles.footerText}>
            Version 1.0.0 · MojaTech
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    paddingBottom: 40,
  },

  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  welcomeText: {
    color: '#9FB3C8',
    fontSize: 14,
    marginBottom: 8,
  },

  appTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor:
      'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroDescription: {
    color: '#D8E1EA',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 24,
  },

  languageContainer: {
    flexDirection: 'row',
    marginTop: 28,
  },

  languageButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor:
      'rgba(255,255,255,0.08)',
  },

  languageButtonActive: {
    backgroundColor: '#FFFFFF',
  },

  languageText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  languageTextActive: {
    color: '#0D1B2A',
  },

  alertCard: {
    marginHorizontal: 22,
    marginTop: -24,
    borderRadius: 28,
    padding: 24,
    elevation: 5,
  },

  alertBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE6E3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    marginBottom: 16,
  },

  alertBadgeText: {
    color: '#D64545',
    fontWeight: '800',
    fontSize: 11,
  },

  alertTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  alertDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 22,
  },

  emergencyButton: {
    backgroundColor: '#D64545',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },

  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 10,
  },

  sectionHeader: {
    marginTop: 34,
    paddingHorizontal: 24,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  cardWrapper: {
    width: '47.5%',
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
    minHeight: 190,
    elevation: 4,
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },

  cardSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },

  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },

  footerLink: {
    color: '#0D1B2A',
    fontWeight: '800',
    fontSize: 15,
  },

  footerText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});