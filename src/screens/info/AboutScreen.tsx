import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getData } from '../../services/dataService';
import { DarkTheme, LightTheme } from '../../config/Theme';

export default function AboutScreen({ navigation }: any) {
  const [aboutData, setAboutData] = useState<any>(null);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getData('about');
        setAboutData(data);
      } catch (error) {
        console.log('Erreur chargement about:', error);
      }
    };

    load();
  }, []);

  if (!aboutData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 120 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
          <Text style={[styles.backText, { color: theme.colors.text }]}>Retour</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.colors.text }]}>À propos</Text>

        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Provenance des données</Text>
          <Text style={[styles.sectionText, { color: theme.colors.subText }]}>{aboutData.provenance}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.card }]}> 
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>À propos de moi</Text>
          <Text style={[styles.sectionText, { color: theme.colors.subText }]}>{aboutData.author.bio}</Text>
          <Text style={[styles.sectionText, { color: theme.colors.subText, marginTop: 12 }]}>{aboutData.author.note}</Text>
          <Text style={[styles.sectionText, { color: theme.colors.subText, marginTop: 8 }]}>{aboutData.author.changeHint}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.card }]}> 
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Mes informations</Text>
          <Text style={[styles.cardLabel, { color: theme.colors.text }]}>{aboutData.author.name}</Text>
          <Text style={[styles.cardLabel, { color: theme.colors.subText }]}>{aboutData.author.role}</Text>
          <Text style={[styles.contactText, { color: theme.colors.subText }]}>Contact : {aboutData.contact}</Text>
        </View>

        {aboutData.sources?.length ? (
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}> 
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sources officielles</Text>
            {aboutData.sources.map((source: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(source.url)}
                activeOpacity={0.7}
                style={styles.sourceItem}
              >
                <Text style={[styles.sourceName, { color: theme.colors.text }]}>{source.name}</Text>
                <Text style={[styles.sourceUrl, { color: theme.colors.primary }]}>{source.url}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        <Text style={[styles.footerText, { color: theme.colors.subText }]}>Dernière mise à jour : {aboutData.lastUpdate}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { marginLeft: 10, fontWeight: '700' },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 20 },
  card: { borderRadius: 24, padding: 20, marginBottom: 16, elevation: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 12 },
  sectionText: { fontSize: 15, lineHeight: 22 },
  sourceItem: { marginTop: 12 },
  sourceName: { fontSize: 15, fontWeight: '700' },
  sourceUrl: { fontSize: 13, marginTop: 4 },
  cardLabel: { fontSize: 16, fontWeight: '700', marginTop: 10 },
  contactText: { fontSize: 14, marginTop: 10 },
  footerText: { marginTop: 16, fontSize: 13, textAlign: 'center' },
});
