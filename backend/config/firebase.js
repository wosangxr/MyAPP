// ── Firebase Admin SDK Configuration ──
const admin = require("firebase-admin");

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Private key มาจาก env อาจมี escaped newlines
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
};

// Initialize เฉพาะเมื่อ config พร้อม
if (
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "YOUR_FIREBASE_PROJECT_ID"
) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  console.log("✅ Firebase Admin initialized");
} else {
  // Fallback — ถ้ามี service account JSON file
  try {
    const serviceAccount = require("../firebase-service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized (from JSON file)");
  } catch {
    console.log(
      "⚠️  Firebase Admin not configured — auth verification will be skipped"
    );
  }
}

module.exports = admin;
