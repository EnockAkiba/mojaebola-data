import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert, Image, Linking, Modal, Pressable, ScrollView, StatusBar,
  StyleSheet, Text, TouchableOpacity, useColorScheme, View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { getData } from '../../services/dataService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LightTheme, DarkTheme } from '../../config/Theme';

export type PublicHomeScreenProps = {
  navigation?: { navigate: (screen: string) => void };
};

// ✅ Type sorti du composant
type ActionCard = {
  key: string;
  title: string;
  subtitle: string;
  color: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  screen: string;
};

const languageOptions = [
  { value: 'FR', label: 'FR' },
  { value: 'SW', label: 'SW' },
  { value: 'LG', label: 'LG' },
];

function openEmergencyLine() {
  Linking.openURL('tel:0821419595').catch(() =>
    Alert.alert('Erreur', "Impossible d'effectuer l'appel.")
  );
}

export default function PublicHomeScreen({ navigation }: PublicHomeScreenProps) {
  const [language, setLanguage] = useState('FR');
  const [translationsData, setTranslationsData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState(false); // ✅ gestion d'erreur
  const [showDevModal, setShowDevModal] = useState(false);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  // ✅ t mémoïsé
  const t = useMemo(
    () => translationsData?.[language] ?? translationsData?.['FR'] ?? {},
    [translationsData, language]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getData('translations');
        setTranslationsData(data);
      } catch (e) {
        console.log('Erreur chargement translations:', e);
        setError(true); // ✅ informe l'utilisateur
      }
    };
    load();
  }, []);

  // ✅ dépendance simplifiée
  const actionCards = useMemo<ActionCard[]>(() => [
    { key: 'report', title: t.report, subtitle: t.reportDesc, color: '#D64545', icon: 'warning', screen: 'ReportCaseScreen' },
    { key: 'risk',   title: t.risk,   subtitle: t.riskDesc,   color: '#F39C12', icon: 'location', screen: 'RiskZonesScreen' },
    { key: 'info',   title: t.info,   subtitle: t.infoDesc,   color: '#2980B9', icon: 'book',     screen: 'InfoScreen' },
    { key: 'ctes',   title: t.centers, subtitle: t.centersDesc, color: '#16A085', icon: 'medkit', screen: 'CTEScreen' },
  ], [t]);

  const handleNavigate = (screen: string) => {
    // Afficher le modal pour les fonctionnalités en développement
    setShowDevModal(true);
  };

  // ✅ écran d'erreur
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 50, color: '#D64545' }}>
          Erreur de chargement. Vérifiez votre connexion.
        </Text>
      </SafeAreaView>
    );
  }

  if (!translationsData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

        {/* HERO */}
        <View style={[styles.heroSection, { backgroundColor: theme.colors.hero }]}>
          <View style={styles.topRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.welcomeText}>{t.welcome}</Text>
              <Text style={styles.appTitle}>{t.appTitle}</Text>
            </View>
            <View style={styles.logoContainer}>
              <Ionicons name="shield-checkmark" size={34} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.heroDescription}>{t.heroDescription}</Text>
          <View style={styles.languageContainer}>
            {languageOptions.map(option => {
              const active = option.value === language;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => setLanguage(option.value)}
                  style={[styles.languageButton, active && styles.languageButtonActive]}
                >
                  <Text style={[styles.languageText, active && styles.languageTextActive]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ALERT */}
        <View style={[styles.alertCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>{t.alert}</Text>
          </View>
          <Text style={[styles.alertTitle, { color: theme.colors.text }]}>{t.epidemicTitle}</Text>
          <Text style={[styles.alertDescription, { color: theme.colors.subText }]}>{t.epidemicDescription}</Text>
          <TouchableOpacity style={styles.emergencyButton} onPress={openEmergencyLine}>
            <Ionicons name="call" size={18} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>{t.call}</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t.services}</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.subText }]}>{t.servicesDescription}</Text>
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {actionCards.map(card => (
            <TouchableOpacity
              key={card.key}
              activeOpacity={0.85}
              style={[styles.cardWrapper, { backgroundColor: theme.colors.card }]}
              onPress={() => handleNavigate(card.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                <Ionicons name={card.icon} size={28} color="#FFFFFF" />
              </View>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{card.title}</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.subText }]}>{card.subtitle}</Text>
              <Ionicons name="arrow-forward" size={18} color={theme.colors.subText} style={{ marginTop: 14 }} />
            </TouchableOpacity>
          ))}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <Pressable onPress={() => handleNavigate('LoginScreen')}>
              {/* ✅ couleur du thème */}
              <Text style={[styles.footerLink, { color: theme.colors.text }]}>{t.healthAgent}</Text>
            </Pressable>
            <Pressable onPress={() => handleNavigate('AboutScreen')}>
              {/* ✅ traduit */}
              <Text style={[styles.footerLink, { color: theme.colors.text }]}>{t.about ?? 'À propos'}</Text>
            </Pressable>
          </View>
          <Text style={styles.footerText}>Version 1.0.0 · MojaTech</Text>
        </View>

      </ScrollView>

      {/* MODAL DÉVELOPPEMENT EN COURS */}
      <Modal
        visible={showDevModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDevModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            {/* LOGO MOJATECH */}
            <View style={styles.modalIconContainer}>
              <Image 
                source={require('../../assets/images/mtlogo.png')} 
                style={styles.modalLogo}
                resizeMode="contain"
              />
            </View>

            {/* TITRE */}
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              En cours de développement
            </Text>

            {/* DESCRIPTION */}
            <Text style={[styles.modalDescription, { color: theme.colors.subText }]}>
              Cette fonctionnalité sera disponible prochainement. Nous travaillons dur pour vous offrir la meilleure expérience.
            </Text>

            {/* BOUTON FERMER */}
            <Pressable
              onPress={() => setShowDevModal(false)}
              style={({ pressed }) => [
                styles.modalButton,
                { backgroundColor: theme.colors.primary || '#2980B9', opacity: pressed ? 0.8 : 1 }
              ]}
            >
              <Text style={styles.modalButtonText}>Compris</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
  },

  modalContent: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 28,
    alignItems: 'center',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },

  modalIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(41, 128, 185, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },

  modalLogo: {
    width: 70,
    height: 70,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  modalDescription: {
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 36,
  },

  modalButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
});