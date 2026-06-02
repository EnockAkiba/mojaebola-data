import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Animated, { FadeInDown } from 'react-native-reanimated';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DarkTheme, LightTheme } from '../../config/Theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Bienvenue sur MojaEbola',
    description:
      'Signalez rapidement les cas suspects, protégez votre famille et participez à la lutte contre Ebola dans votre communauté.',
    image: require('../../assets/images/drapeauEbola.webp'),
    color: '#D64545',
    icon: 'shield-checkmark',
  },
  {
    id: '2',
    title: 'Surveillez les zones à risque',
    description:
      'Consultez les alertes sanitaires, les zones affectées et les centres Ebola proches de vous en temps réel.',
    image: require('../../assets/images/ZoneRisque.png'),
    color: '#F39C12',
    icon: 'map',
  },
  {
    id: '3',
    title: 'Informez et protégez votre communauté',
    description:
      'Découvrez les gestes essentiels, les mesures de prévention et les numéros d’urgence pour sauver des vies.',
    image: require('../../assets/images/Sensibilisation.jpg'),
    color: '#16A085',
    icon: 'medkit',
  },
];

export default function OnboardingScreen({  }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  const finishOnboarding = async () => {
    console.log("Fin de l'onboarding, stockage de l'info...");
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      await finishOnboarding();
    }
  };

  const handleSkip = async () => {
    await finishOnboarding();
    console.log("Onboarding passé, redirection vers l'app...");

  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageWrapper}>
          <Image source={item.image} style={styles.image} />
          <View style={[styles.overlay, { backgroundColor: `${item.color}55` }]} />
        </View>

        <Animated.View
          entering={FadeInDown.duration(700)}
          style={[styles.content, { backgroundColor: theme.colors.card }]}
        >
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={30} color="#fff" />
          </View>

          <Text style={[styles.title, { color: theme.colors.text }]}>
            {item.title}
          </Text>

          <Text style={[styles.description, { color: theme.colors.subText }]}>
            {item.description}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Passer</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  width: currentIndex === index ? 18 : 8,
                  backgroundColor: currentIndex === index ? '#D64545' : '#D1D5DB',
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  slide: {
    width,
    flex: 1,
  },

  imageWrapper: {
    height: '55%',
    position: 'relative',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    transform: [{ scale: 1.03 }],
  },

  content: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },

  button: {
    height: 58,
    backgroundColor: '#D64545',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#D64545',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 12,
    elevation: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 12,
  },

  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 40,
  },

  skipText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  dot: {
    height: 12,
    borderRadius: 20,
    marginRight: 10,
  },

});