import React, { useEffect, useMemo, useState } from 'react';

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import Ionicons from '@react-native-vector-icons/ionicons';
import { getData } from '../../services/dataService';
import { DarkTheme, LightTheme } from '../../config/Theme';

// ─── HTML LEAFLET GENERATOR ───────────────────────────────────────────────────

function generateMapHTML(redZones = [], orangeZones = [], healthCenters = []): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { height: 100%; width: 100%; }
    .leaflet-control-zoom { display: none; }
    .leaflet-popup-content-wrapper {
      border-radius: 12px;
      font-family: -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    .leaflet-popup-tip { display: none; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>

    var map = L.map('map', { zoomControl: false }).setView([0.5, 29.8], 7);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // ── Zones rouges
    var redZones = ${JSON.stringify(redZones)};
    redZones.forEach(function(z) {
      L.circle([z.lat, z.lng], {
        radius: z.radius,
        color: '#C0392B',
        fillColor: '#E74C3C',
        fillOpacity: 0.3,
        weight: 2
      }).addTo(map).bindPopup(z.label);
    });

    // ── Zones oranges
    var orangeZones = ${JSON.stringify(orangeZones)};
    orangeZones.forEach(function(z) {
      L.circle([z.lat, z.lng], {
        radius: z.radius,
        color: '#D68910',
        fillColor: '#F39C12',
        fillOpacity: 0.22,
        weight: 2
      }).addTo(map).bindPopup(z.label);
    });

    // ── Centres de traitement
    var centers = ${JSON.stringify(healthCenters)};
    centers.forEach(function(c) {
      var icon = L.divIcon({
        html: '<div style="background:#16A085;width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4)"><\\/div>',
        className: '',
        iconAnchor: [7, 7]
      });
      L.marker([c.lat, c.lng], { icon: icon })
        .addTo(map)
        .bindPopup('<b>🏥 ' + c.label + '<\\/b><br>Tel: ' + c.tel);
    });

    // ── Géolocalisation navigateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;
          var myIcon = L.divIcon({
            html: '<div style="background:#2980B9;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5)"><\\/div>',
            className: '',
            iconAnchor: [8, 8]
          });
          L.marker([lat, lng], { icon: myIcon })
            .addTo(map)
            .bindPopup('<b>📍 Ma position<\\/b>');
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: 'location', lat: lat, lng: lng })
            );
          }
        },
        function() {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }

    // ── Fonction appelée depuis RN pour centrer sur l'utilisateur
    function centerOnUser(lat, lng) {
      map.setView([lat, lng], 13);
    }

  </script>
</body>
</html>
`;
}

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

export default function RiskZonesScreen({ navigation }: any) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  const [loadingMap, setLoadingMap] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const [webViewError, setWebViewError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [zonesData, setZonesData] = useState<any>(null);
  const [statsData, setStatsData] = useState<any>(null);
  const webViewRef = React.useRef<any>(null);

  // Charger les zones de risque et les statistiques associées
  useEffect(() => {
    const loadData = async () => {
      try {
        const [zones, stats] = await Promise.all([
          getData('zonesRisque'),
          getData('riskStats'),
        ]);

        setZonesData(zones);
        setStatsData(stats);
        console.log('[RiskZones] données chargées:', {
          zones: zones && Object.keys(zones).length ? 'ok' : 'vide',
          stats: stats && Object.keys(stats).length ? 'ok' : 'vide',
        });
      } catch (error) {
        console.log('Erreur chargement zones/statistiques:', error);
      } finally {
        setLoadingData(false);
      }
    };
    loadData();
  }, []);

  // Générer le HTML avec les données chargées
  const mapHTML = useMemo(() => {
    if (!zonesData) return generateMapHTML();
    return generateMapHTML(
      zonesData.RED_ZONES || [],
      zonesData.ORANGE_ZONES || [],
      zonesData.HEALTH_CENTERS || []
    );
  }, [zonesData]);

  useEffect(() => {
    console.log('[RiskZones] zonesData change —', zonesData ? Object.keys(zonesData) : zonesData);
    console.log('[RiskZones] mapHTML length:', mapHTML ? mapHTML.length : 0);
  }, [zonesData, mapHTML]);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'location') {
        setUserLocation({ latitude: data.lat, longitude: data.lng });
      }
    } catch (_) { }
  };

  const centerOnUser = () => {
    if (!userLocation || !webViewRef.current) return;
    webViewRef.current.injectJavaScript(
      `centerOnUser(${userLocation.latitude}, ${userLocation.longitude}); true;`
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <StatusBar barStyle="light-content" backgroundColor="#D64545" />

      {/* MAP — plein écran */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          style={styles.map}
          javaScriptEnabled
          domStorageEnabled
          geolocationEnabled
          mixedContentMode="always"
          onLoadStart={() => {
            setLoadingMap(true);
            setWebViewLoaded(false);
            setWebViewError(null);
          }}
          onLoadEnd={() => {
            setLoadingMap(false);
            setWebViewLoaded(true);
          }}
          onError={(e) => {
            console.log('[RiskZones] WebView error:', e.nativeEvent);
            setWebViewError(e.nativeEvent.description || 'Erreur WebView');
          }}
          onHttpError={(e) => {
            console.log('[RiskZones] WebView httpError:', e.nativeEvent);
            setWebViewError(`HTTP ${e.nativeEvent.statusCode}`);
          }}
          onMessage={handleMessage}
        />

        {loadingMap && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#D64545" />
            <Text style={styles.loaderText}>Chargement de la carte...</Text>
          </View>
        )}

        {!loadingData && webViewError && (
          <View style={styles.debugBanner}>
            <Text style={styles.debugText}>WebView error: {webViewError}</Text>
          </View>
        )}

        {!loadingData && !zonesData && (
          <View style={styles.debugBanner}>
            <Text style={styles.debugText}>Aucune donnée de zone trouvée.</Text>
          </View>
        )}

        {/* STATS OVERLAY — en haut de la carte */}
        <View style={styles.statsOverlay}>
          <View style={styles.statBadge}>
            <Text style={styles.statValue}>{statsData?.totalCases ?? '1 120+'}</Text>
            <Text style={styles.statLabel}>Cas totaux</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: '#8E44AD' }]}>
            <Text style={styles.statValue}>{statsData?.deaths ?? '250'}</Text>
            <Text style={styles.statLabel}>Décès</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: '#2980B9' }]}>
            <Text style={styles.statValue}>{statsData?.provincesAffected ? `${statsData.provincesAffected} prov.` : '3 prov.'}</Text>
            <Text style={styles.statLabel}>{statsData?.highlight ?? '+ Ouganda'}</Text>
          </View>
        </View>

        {/* FAB Ma position */}
        {userLocation && (
          <TouchableOpacity style={styles.fab} onPress={centerOnUser} activeOpacity={0.9}>
            <Ionicons name="locate" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* LÉGENDE */}
      <View style={[styles.legendContainer, { backgroundColor: theme.colors.card }]}>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#D64545' }]} />
            <Text style={[styles.legendText, { color: theme.colors.text }]}>Zone rouge — Évitez absolument</Text>
          </View>
        </View>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F39C12' }]} />
            <Text style={[styles.legendText, { color: theme.colors.text }]}>Zone orange — Surveillance active</Text>
          </View>
        </View>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#16A085' }]} />
            <Text style={[styles.legendText, { color: theme.colors.text }]}>Centre de traitement Ebola (CTE)</Text>
          </View>
        </View>
        <Text style={[styles.legendSource, { color: theme.colors.subText }]}>
          Sources : CDC · OMS · Africa CDC 
          {/* — Mis à jour le 30 mai 2026 */}
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  mapContainer: { flex: 1, position: 'relative' },
  map: { flex: 1 },

  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  loaderText: {
    marginTop: 14, fontSize: 14,
    fontWeight: '700', color: '#111827',
  },

  // Stats overlay sur la carte
  statsOverlay: {
    position: 'absolute',
    top: 16, left: 16, right: 16,
    flexDirection: 'row',
    gap: 8,
    pointerEvents: 'none',
  },
  statBadge: {
    flex: 1,
    backgroundColor: '#D64545',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  statValue: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  statLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '600', marginTop: 2 },

  // Bouton ma position
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 52, height: 52,
    borderRadius: 26,
    backgroundColor: '#2980B9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },

  // Légende
  legendContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -6 },
    shadowRadius: 12,
    elevation: 10,
  },
  legendRow: { marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 14, height: 14, borderRadius: 7, marginRight: 10 },
  legendText: { fontSize: 13, fontWeight: '600' },
  legendSource: { fontSize: 10, textAlign: 'center', marginTop: 8 },
  debugBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 30,
  },
  debugText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
