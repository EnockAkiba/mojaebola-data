// =========================
// Couleurs de l'application
// =========================
export const Colors = {
  primary: "#4c669f",          // couleur principale
  secondary: "#ffffff",        // blanc
  accent: "#5d85c8",           // bleu clair
  background: "#f5f5f5",       // fond général
  text: "#333333",             // texte sombre
  cardBackground: "#00000050",   // cartes/blocs           // couleur principale du texte
  placeholder: "#888",       // placeholder dans les inputs
  inputBorder: "#ddd",      // fond des cards
  danger: "#ff4d4f",         // messages d'erreur
  success: "#28a745",        // messages de succès
};

// export const Colors = {
//   primary: "#4c669f",          // couleur principale
//   secondary: "#ffffff",        // blanc
//   accent: "#5d85c8",           // bleu clair
//   background: "#f5f5f5",       // fond général
//   text: "#333333",             // texte sombre
//   cardBackground: "#ffffff",   // cartes/blocs
// };


// =========================
// Informations de l'application
// =========================

export const AppInfo = {
  name: "MojaRewards",
  version: "1.0.0",
  API_URL: "http://10.0.2.2:8000", // cohérent avec axios
  // API_URL: "http://127.0.0.1:8000", // cohérent avec axios

};
// =========================
// Messages globaux
// =========================
export const Messages = {
  loginSuccess: "Connexion réussie !",
  loginError: "Email ou mot de passe incorrect",
  registerSuccess: "Inscription réussie !",
  registerError: "Impossible de créer le compte",
  genericError: "Une erreur est survenue",
};

// =========================
// Styles globaux
// =========================
export const Styles = {
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
};
