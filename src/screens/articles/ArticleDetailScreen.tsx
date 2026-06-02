import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  Share,
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

export default function ArticleDetailScreen({ route, navigation }: any) {
  const { article } = route.params;
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  const content: string =
    article.contents?.[article.language ?? 'Français'] ??
    article.contents?.['Français'] ??
    article.preview ??
    '';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.preview}\n\nTéléchargez MojaEbola pour en savoir plus.`,
      });
    } catch (_) {}
  };

  // Render paragraphs — lines starting with emoji/bullet get special style
  const renderContent = () => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.trim() === '') {
        return <View key={index} style={{ height: 10 }} />;
      }

      // Section headers (bold lines ending with ':')
      const isSectionHeader =
        line.trim().endsWith(':') && line.trim().length < 60 && !line.startsWith('•');

      // Bullet items
      const isBullet = line.trim().startsWith('•');

      // Emoji lines (icons)
      const startsWithEmoji = /^[🔴✅❌⚠️📞📍📦📊🏥⚔️⛏️🏘️📡💰💉👨‍⚕️❤️🔬💬🦠🙏]/.test(line.trim());

      if (isSectionHeader) {
        return (
          <Text key={index} style={[styles.sectionHeader, { color: article.color }]}>
            {line}
          </Text>
        );
      }
      if (isBullet) {
        return (
          <View key={index} style={styles.bulletRow}>
            <View style={[styles.bulletDot, { backgroundColor: article.color }]} />
            <Text style={[styles.bulletText, { color: theme.colors.text }]}>
              {line.replace(/^•\s*/, '')}
            </Text>
          </View>
        );
      }
      if (startsWithEmoji) {
        return (
          <Text key={index} style={[styles.emojiLine, { color: theme.colors.text }]}>
            {line}
          </Text>
        );
      }

      return (
        <Text key={index} style={[styles.bodyText, { color: theme.colors.text }]}>
          {line}
        </Text>
      );
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: article.color }]}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HERO */}
        <View style={[styles.hero, { backgroundColor: article.color }]}>
          <View style={styles.heroIcon}>
            <Ionicons name={article.icon} size={38} color="#FFFFFF" />
          </View>
          <View style={[styles.categoryPill, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
            <Text style={styles.categoryPillText}>{article.category}</Text>
          </View>
          <Text style={styles.heroTitle}>{article.title}</Text>
          <Text style={styles.heroPreview}>{article.preview}</Text>
          <View style={styles.readTimePill}>
            <Ionicons name="time-outline" size={12} color={article.color} />
            <Text style={[styles.readTimeText, { color: article.color }]}>
              {article.readTime} de lecture
            </Text>
          </View>
        </View>

        {/* CONTENU */}
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>

        {/* CTA URGENCE */}
        <View style={[styles.ctaCard, { borderColor: `${article.color}40`, backgroundColor: `${article.color}10` }]}>
          <Ionicons name="call" size={22} color={article.color} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.ctaTitle, { color: article.color }]}>Numéro d'urgence Ebola</Text>
            <Text style={[styles.ctaSub, { color: theme.colors.subText }]}>Gratuit — 24h/24 — 7j/7</Text>
          </View>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: article.color }]}
            onPress={() => Linking.openURL('tel:08214419595')}
          >
            <Text style={styles.ctaButtonText}>08214419595</Text>
          </TouchableOpacity>
        </View>

        {/* PARTAGER */}
        <TouchableOpacity
          style={[styles.shareRow, {
            backgroundColor: theme.colors.card,
            borderColor: scheme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E5E7EB',
          }]}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Ionicons name="share-social-outline" size={20} color={theme.colors.subText} />
          <Text style={[styles.shareText, { color: theme.colors.subText }]}>
            Partager cet article avec vos proches
          </Text>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.subText} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  shareButton: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },

  // Hero
  hero: {
    paddingHorizontal: 24, paddingTop: 28, paddingBottom: 36,
  },
  heroIcon: {
    width: 68, height: 68, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 18,
  },
  categoryPill: {
    alignSelf: 'flex-start', paddingHorizontal: 14,
    paddingVertical: 6, borderRadius: 30, marginBottom: 14,
  },
  categoryPillText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  heroTitle: {
    color: '#FFFFFF', fontSize: 22, fontWeight: '900',
    lineHeight: 32, marginBottom: 14,
  },
  heroPreview: {
    color: 'rgba(255,255,255,0.85)', fontSize: 14,
    lineHeight: 24, marginBottom: 18,
  },
  readTimePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-start', backgroundColor: '#FFFFFF',
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 30,
  },
  readTimeText: { fontSize: 12, fontWeight: '700' },

  // Content
  contentContainer: { paddingHorizontal: 22, paddingTop: 28 },
  sectionHeader: {
    fontSize: 15, fontWeight: '800', marginTop: 22, marginBottom: 10,
  },
  bulletRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    marginBottom: 8, paddingRight: 10,
  },
  bulletDot: {
    width: 6, height: 6, borderRadius: 3,
    marginTop: 8, marginRight: 12, flexShrink: 0,
  },
  bulletText: { fontSize: 14, lineHeight: 24, flex: 1 },
  emojiLine: {
    fontSize: 14, fontWeight: '700', lineHeight: 24,
    marginTop: 16, marginBottom: 6,
  },
  bodyText: { fontSize: 14, lineHeight: 26, marginBottom: 4 },

  // CTA
  ctaCard: {
    marginHorizontal: 20, marginTop: 32,
    borderRadius: 20, borderWidth: 1,
    padding: 18, flexDirection: 'row', alignItems: 'center',
  },
  ctaTitle: { fontSize: 14, fontWeight: '800' },
  ctaSub: { fontSize: 12, marginTop: 2 },
  ctaButton: {
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 14,
  },
  ctaButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },

  // Share
  shareRow: {
    marginHorizontal: 20, marginTop: 14, marginBottom: 10,
    borderRadius: 16, borderWidth: 1, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  shareText: { flex: 1, fontSize: 13, fontWeight: '600' },
});