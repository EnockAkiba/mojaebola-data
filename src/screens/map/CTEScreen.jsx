import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  FlatList,
  Linking,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Location from 'expo-location';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  DarkTheme,
  LightTheme,
} from '../../config/Theme';

const CTE_DATA = [
  {
    id: '1',
    name: 'CTE Bunia',
    city: 'Bunia',
    address: 'Avenue Kindu, Bunia',
    latitude: 1.5641,
    longitude: 30.1914,
    phone: '+243000000',
    open: true,
  },

  {
    id: '2',
    name: 'CTE Goma',
    city: 'Goma',
    address: 'Quartier Himbi, Goma',
    latitude: -1.6596,
    longitude: 29.2194,
    phone: '+243000000',
    open: true,
  },

  {
    id: '3',
    name: 'Hôpital Général Bunia',
    city: 'Bunia',
    address: "Avenue de l'Hôpital",
    latitude: 1.558,
    longitude: 30.185,
    phone: '+243000000',
    open: false,
  },
];

export default function CTEScreen({
  navigation,
}: any) {
  const scheme = useColorScheme();

  const theme =
    scheme === 'dark'
      ? DarkTheme
      : LightTheme;

  const mapRef = useRef<MapView>(null);

  const [viewMode, setViewMode] =
    useState<'list' | 'map'>('list');

  const [userLocation, setUserLocation] =
    useState<any>(null);

  const [permissionDenied, setPermissionDenied] =
    useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setPermissionDenied(true);
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({});

      setUserLocation(location.coords);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1);
  };

  const openDirections = (
    latitude: number,
    longitude: number
  ) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.openURL(url);
  };

  const callCenter = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderCTECard = ({ item }: any) => {
    const distance =
      userLocation
        ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            item.latitude,
            item.longitude
          )
        : '--';

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor:
              scheme === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : '#E5E7EB',
          },
        ]}
      >
        <View style={styles.cardTop}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="medical"
              size={22}
              color="#FFFFFF"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.cteName,
                { color: theme.colors.text },
              ]}
            >
              {item.name}
            </Text>

            <Text
              style={[
                styles.cteAddress,
                {
                  color: theme.colors.subText,
                },
              ]}
            >
              {item.city} — {item.address}
            </Text>
          </View>
        </View>

        <View style={styles.badgesRow}>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>
              {distance} km de vous
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: item.open
                  ? '#16A085'
                  : '#D64545',
              },
            ]}
          >
            <Text style={styles.statusText}>
              {item.open
                ? 'Ouvert 24h/24'
                : 'Fermé'}
            </Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.routeButton}
            onPress={() =>
              openDirections(
                item.latitude,
                item.longitude
              )
            }
          >
            <Ionicons
              name="navigate"
              size={16}
              color="#FFFFFF"
            />

            <Text style={styles.routeText}>
              Itinéraire
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.callButton}
            onPress={() =>
              callCenter(item.phone)
            }
          >
            <Ionicons
              name="call"
              size={16}
              color="#FFFFFF"
            />

            <Text style={styles.callText}>
              Appeler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIllustration}>
        <Ionicons
          name="location"
          size={60}
          color="#D64545"
        />
      </View>

      <Text
        style={[
          styles.emptyTitle,
          { color: theme.colors.text },
        ]}
      >
        Activez votre GPS pour voir les centres proches
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.enableButton}
        onPress={getLocation}
      >
        <Text style={styles.enableText}>
          Activer la localisation
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.colors.background,
        },
      ]}
    >
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Centres de traitement
        </Text>

        <View style={{ width: 42 }} />
      </View>

      {/* SUBTITLE */}
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.subText },
        ]}
      >
        Trouvez le centre Ebola le plus proche de vous
      </Text>

      {/* TOGGLE */}
      <View
        style={[
          styles.toggleContainer,
          {
            backgroundColor: theme.colors.card,
            borderColor:
              scheme === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : '#E5E7EB',
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'list' &&
              styles.toggleButtonActive,
          ]}
          onPress={() => setViewMode('list')}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color:
                  viewMode === 'list'
                    ? '#FFFFFF'
                    : theme.colors.text,
              },
            ]}
          >
            Vue liste
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'map' &&
              styles.toggleButtonActive,
          ]}
          onPress={() => setViewMode('map')}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color:
                  viewMode === 'map'
                    ? '#FFFFFF'
                    : theme.colors.text,
              },
            ]}
          >
            Vue carte
          </Text>
        </TouchableOpacity>
      </View>

      {/* EMPTY STATE */}
      {permissionDenied ? (
        renderEmptyState()
      ) : viewMode === 'list' ? (
        <FlatList
          data={CTE_DATA}
          keyExtractor={item => item.id}
          renderItem={renderCTECard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
            paddingTop: 10,
          }}
        />
      ) : (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude:
              userLocation?.latitude || 1.5641,

            longitude:
              userLocation?.longitude || 30.1914,

            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
        >
          {CTE_DATA.map(cte => (
            <Marker
              key={cte.id}
              coordinate={{
                latitude: cte.latitude,
                longitude: cte.longitude,
              }}
              title={cte.name}
              description={cte.address}
            >
              <View style={styles.marker}>
                <Ionicons
                  name="medical"
                  size={18}
                  color="#FFFFFF"
                />
              </View>
            </Marker>
          ))}
        </MapView>
      )}

      {/* STICKY BANNER */}
      <View style={styles.banner}>
        <Ionicons
          name="warning"
          size={18}
          color="#FFFFFF"
        />

        <Text style={styles.bannerText}>
          Urgence Ebola — 0800 XXX XXX —
          Gratuit 24h/24
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 90,
    backgroundColor: '#D64545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 18,
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 22,
  },

  toggleContainer: {
    marginHorizontal: 20,
    height: 58,
    borderRadius: 18,
    flexDirection: 'row',
    padding: 6,
    borderWidth: 1,
    marginBottom: 18,
  },

  toggleButton: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  toggleButtonActive: {
    backgroundColor: '#D64545',
  },

  toggleText: {
    fontWeight: '800',
    fontSize: 13,
  },

  card: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
  },

  cardTop: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#D64545',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  cteName: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },

  cteAddress: {
    fontSize: 12,
    lineHeight: 20,
  },

  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  distanceBadge: {
    backgroundColor: '#2980B9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
  },

  distanceText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },

  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },

  statusText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },

  actionsRow: {
    flexDirection: 'row',
  },

  routeButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#2980B9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },

  routeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginLeft: 8,
  },

  callButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#16A085',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  callText: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginLeft: 8,
  },

  map: {
    flex: 1,
  },

  marker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#D64545',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyIllustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE6E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  emptyTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 24,
  },

  enableButton: {
    backgroundColor: '#D64545',
    height: 54,
    paddingHorizontal: 28,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  enableText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  banner: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 58,
    backgroundColor: '#D64545',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 18,
    elevation: 8,
  },

  bannerText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    marginLeft: 10,
  },
});