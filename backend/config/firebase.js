// ── Firebase Admin SDK Configuration ──
const admin = require("firebase-admin");

// Helper: Fix common issues with Private Key formatting
function formatPrivateKey(key) {
  if (!key) return undefined;
  
  // Replace literal '\n' with actual newline characters
  let formattedKey = key.replace(/\\n/g, "\n");
  
  // If user pasted just the base64 string without PEM headers, add them automatically
  if (!formattedKey.includes("-----BEGIN PRIVATE KEY-----")) {
    // Split into 64-character lines if it's a single long string, otherwise keep it
    const keyBody = formattedKey.replace(/\s+/g, ""); // remove any accidental spaces/newlines
    const lines = keyBody.match(/.{1,64}/g) || [];
    formattedKey = `-----BEGIN PRIVATE KEY-----\n${lines.join("\n")}\n-----END PRIVATE KEY-----\n`;
  }
  
  return formattedKey;
}

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
};

try {
  // Initialize เฉพาะเมื่อ config พร้อม
  if (
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== "YOUR_FIREBASE_PROJECT_ID"
  ) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
    console.log("✅ Firebase Admin initialized (from env variables)");
  } else {
    // Fallback — ถ้ามี service account JSON file
    const serviceAccount = require("../firebase-service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized (from JSON file)");
  }
} catch (error) {
  console.error("❌ Firebase Admin initialization failed:", error.message);
  console.log("⚠️  Server will continue to run, but Auth verification will fail.");
}

module.exports = admin;
