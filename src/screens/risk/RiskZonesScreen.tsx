import React, { useState } from 'react';

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
import { DarkTheme, LightTheme } from '../../config/Theme';

// ─── DONNÉES RÉELLES (Sources : CDC, OMS, Africa CDC — 30 mai 2026) ───────────

// ZONES ROUGES — Cas confirmés en laboratoire
const RED_ZONES = [
  // Ituri — Épicentre
  { lat: 1.8534, lng: 30.0419, radius: 9000, label: '🔴 Mongbwalu — Épicentre (Ituri)' },
  { lat: 1.7200, lng: 30.0700, radius: 7000, label: '🔴 Rwampara — Cas confirmés (Ituri)' },
  { lat: 1.5641, lng: 30.1914, radius: 10000, label: '🔴 Bunia — Zone rouge (Ituri)' },
  // Nord-Kivu
  { lat: -1.6596, lng: 29.2194, radius: 8000, label: '🔴 Goma — Cas confirmé (Nord-Kivu)' },
  { lat: -0.1336, lng: 29.2438, radius: 6000, label: '🔴 Butembo — Cas suspects (Nord-Kivu)' },
  // Sud-Kivu
  { lat: -2.5067, lng: 28.8600, radius: 7000, label: '🔴 Bukavu — Cas importé (Sud-Kivu)' },
];

// ZONES ORANGES — Sous surveillance / cas suspects
const ORANGE_ZONES = [
  { lat: 1.9500, lng: 30.3000, radius: 12000, label: '🟠 Djugu — Zone sous surveillance (Ituri)' },
  { lat: 1.3000, lng: 30.5000, radius: 8000, label: '🟠 Iga Barrière — Zone orange (Ituri)' },
  { lat: 0.0580, lng: 29.4607, radius: 9000, label: '🟠 Lubero — Surveillance (Nord-Kivu)' },
  { lat: -1.9400, lng: 29.0000, radius: 7000, label: '🟠 Masisi — Surveillance (Nord-Kivu)' },
  // Ouganda
  { lat: 0.3136, lng: 32.5811, radius: 15000, label: '🟠 Kampala — 9 cas confirmés (Ouganda)' },
];

// CENTRES DE TRAITEMENT EBOLA (CTE)
const HEALTH_CENTERS = [
  { lat: 1.5641, lng: 30.1914, label: 'CTE Bunia', tel: '08214419595' },
  { lat: -1.6596, lng: 29.2194, label: 'CTE Goma', tel: '08214419595' },
  { lat: -0.1336, lng: 29.2438, label: 'CTE Butembo', tel: '08214419595' },
  { lat: -2.5067, lng: 28.8600, label: 'CTE Bukavu', tel: '08214419595' },
];

// ─── HTML LEAFLET ─────────────────────────────────────────────────────────────

const mapHTML = `
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
    var redZones = ${JSON.stringify(RED_ZONES)};
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
    var orangeZones = ${JSON.stringify(ORANGE_ZONES)};
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
    var centers = ${JSON.stringify(HEALTH_CENTERS)};
    centers.forEach(function(c) {
      var icon = L.divIcon({
        html: '<div style="background:#16A085;width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>',
        className: '',
        iconAnchor: [7, 7]
      });
      L.marker([c.lat, c.lng], { icon: icon })
        .addTo(map)
        .bindPopup('<b>🏥 ' + c.label + '</b><br>Tel: ' + c.tel);
    });

    // ── Géolocalisation navigateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;
          var myIcon = L.divIcon({
            html: '<div style="background:#2980B9;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>',
            className: '',
            iconAnchor: [8, 8]
          });
          L.marker([lat, lng], { icon: myIcon })
            .addTo(map)
            .bindPopup('<b>📍 Ma position</b>');
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

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

export default function RiskZonesScreen({ navigation }: any) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  const [loadingMap, setLoadingMap] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const webViewRef = React.useRef<any>(null);

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
          onLoadEnd={() => setLoadingMap(false)}
          onMessage={handleMessage}
        />

        {loadingMap && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#D64545" />
            <Text style={styles.loaderText}>Chargement de la carte...</Text>
          </View>
        )}

        {/* STATS OVERLAY — en haut de la carte */}
        <View style={styles.statsOverlay}>
          <View style={styles.statBadge}>
            <Text style={styles.statValue}>1 020+</Text>
            <Text style={styles.statLabel}>Cas totaux</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: '#8E44AD' }]}>
            <Text style={styles.statValue}>234</Text>
            <Text style={styles.statLabel}>Décès</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: '#2980B9' }]}>
            <Text style={styles.statValue}>3 prov.</Text>
            <Text style={styles.statLabel}>+ Ouganda</Text>
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
    ...StyleSheet.absoluteFillObject,
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
});
