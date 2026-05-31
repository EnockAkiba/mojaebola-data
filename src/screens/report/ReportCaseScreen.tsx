import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, DarkTheme } from '../../config/Theme';

export type ReportCaseScreenProps = {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
};

const symptoms = [
  { id: 'fever', label: 'Fièvre élevée' },
  { id: 'bleeding', label: 'Saignements' },
  { id: 'vomiting', label: 'Vomissements' },
  { id: 'diarrhea', label: 'Diarrhée' },
  { id: 'fatigue', label: 'Fatigue intense' },
  { id: 'headache', label: 'Maux de tête' },
];

const ContactOptions = ['Oui', 'Non', 'Je ne sais pas'];

export default function ReportCaseScreen({ navigation }: ReportCaseScreenProps) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  const [patientName, setPatientName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [contactExposure, setContactExposure] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'pending' | 'success' | 'denied'>('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    captureLocation();
  }, []);

  const captureLocation = async () => {
    try {
      // Simulated GPS capture
      const mockLat = -1.57551;
      const mockLong = 29.20349;
      setLatitude(mockLat);
      setLongitude(mockLong);
      setGpsStatus('success');
    } catch (error) {
      setGpsStatus('denied');
      console.error('GPS Error:', error);
    }
  };

  const toggleSymptom = (symptomId: string) => {
    const updated = new Set(selectedSymptoms);
    if (updated.has(symptomId)) {
      updated.delete(symptomId);
    } else {
      updated.add(symptomId);
    }
    setSelectedSymptoms(updated);
  };

  const validateForm = (): boolean => {
    if (!location.trim()) {
      Alert.alert('Erreur', 'Le quartier/village est obligatoire.');
      return false;
    }
    if (selectedSymptoms.size === 0) {
      Alert.alert('Erreur', 'Sélectionnez au moins un symptôme.');
      return false;
    }
    if (!contactExposure) {
      Alert.alert('Erreur', 'Veuillez répondre à la question de contact.');
      return false;
    }
    return true;
  };

  const submitReport = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const reportData = {
      patientName: patientName || 'Anonyme',
      location,
      phoneNumber: phoneNumber || '',
      symptoms: Array.from(selectedSymptoms),
      contactExposure,
      latitude,
      longitude,
      timestamp: new Date().toISOString(),
    };

    try {
      // Simulate API call
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });

      // Store in AsyncStorage for offline support
      const existingReports = await AsyncStorage.getItem('reports');
      const reports = existingReports ? JSON.parse(existingReports) : [];
      reports.push(reportData);
      await AsyncStorage.setItem('reports', JSON.stringify(reports));

      setIsLoading(false);
      setShowSuccess(true);

      // Reset form
      setTimeout(() => {
        setPatientName('');
        setLocation('');
        setPhoneNumber('');
        setSelectedSymptoms(new Set());
        setContactExposure(null);
        setShowSuccess(false);
        navigation?.goBack();
      }, 2500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erreur', 'Impossible d\'envoyer le signalement. Réessayez.');
      console.error('Submit Error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#D64545" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#D64545' }]}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Signaler un cas suspect</Text>
      </View>

      {/* Subtitle Banner */}
      <View style={[styles.subtitleBanner, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.subtitleText, { color: theme.colors.text }]}>
          ✓ Aucun compte requis — Signalement anonyme possible
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* Patient Name */}
          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Nom du patient (optionnel)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                },
              ]}
              placeholder="Anonyme si vide"
              placeholderTextColor={theme.colors.subText}
              value={patientName}
              onChangeText={setPatientName}
            />
          </View>

          {/* Location */}
          <View style={styles.section}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Quartier / Village
              </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                },
              ]}
              placeholder="Ex: Quartier Lumumba"
              placeholderTextColor={theme.colors.subText}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Phone Number */}
          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Numéro de téléphone (optionnel)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                },
              ]}
              placeholder="Pour être recontacté"
              placeholderTextColor={theme.colors.subText}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* Symptoms Checklist */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Symptômes observés
            </Text>
            <View style={styles.symptomsGrid}>
              {symptoms.map((symptom, idx) => (
                <Pressable
                  key={symptom.id}
                  style={[
                    styles.symptomRow,
                    {
                      marginBottom: idx >= symptoms.length - 2 ? 0 : 16,
                      width: '48%',
                      marginRight: idx % 2 === 0 ? '4%' : 0,
                    },
                  ]}
                  onPress={() => toggleSymptom(symptom.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: selectedSymptoms.has(symptom.id)
                          ? '#D64545'
                          : 'transparent',
                        borderColor: selectedSymptoms.has(symptom.id)
                          ? '#D64545'
                          : theme.colors.border,
                      },
                    ]}
                  >
                    {selectedSymptoms.has(symptom.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={[styles.symptomLabel, { color: theme.colors.text }]}>
                    {symptom.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Contact Exposure */}
          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Contact avec un cas confirmé ?
            </Text>
            <View style={styles.pillButtons}>
              {ContactOptions.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.pillButton,
                    {
                      backgroundColor:
                        contactExposure === option ? '#D64545' : 'transparent',
                      borderColor:
                        contactExposure === option ? '#D64545' : theme.colors.border,
                    },
                  ]}
                  onPress={() => setContactExposure(option)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      {
                        color:
                          contactExposure === option ? '#FFFFFF' : theme.colors.text,
                      },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* GPS Status */}
          {gpsStatus === 'success' && latitude && longitude && (
            <View style={[styles.gpsCard, { backgroundColor: '#E8F8F5' }]}>
              <Text style={styles.gpsSuccess}>
                ✓ Position capturée — {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </Text>
            </View>
          )}

          {gpsStatus === 'denied' && (
            <View style={[styles.gpsCard, { backgroundColor: '#FEF5E7' }]}>
              <Text style={[styles.gpsWarning, { color: '#D68910' }]}>
                ⚠ Position non capturée — vous pouvez entrer manuellement
              </Text>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: '#D64545', opacity: isLoading ? 0.6 : 1 },
            ]}
            onPress={submitReport}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Envoyer le signalement</Text>
            )}
          </TouchableOpacity>

          <Text style={[styles.disclaimer, { color: theme.colors.subText }]}>
            Vos données sont protégées et confidentielles
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.card },
            ]}
          >
            <View style={styles.successIcon}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
            <Text
              style={[
                styles.modalTitle,
                { color: theme.colors.text },
              ]}
            >
              Signalement envoyé !
            </Text>
            <Text
              style={[
                styles.modalText,
                { color: theme.colors.subText },
              ]}
            >
              Merci. Les équipes de santé ont été notifiées.
            </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
  },
  subtitleBanner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  required: {
    color: '#D64545',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  symptomLabel: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  pillButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  pillButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  gpsCard: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  gpsSuccess: {
    fontSize: 13,
    fontWeight: '600',
    color: '#16A085',
    lineHeight: 18,
  },
  gpsWarning: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#16A085',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkIcon: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
});
