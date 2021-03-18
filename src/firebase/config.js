const firebaseConfig = {

  // apiKey: process.env.react_app_firebase_api_key,
  // authDomain: process.env.react_app_firebase_auth_domain,
  // projectId: process.env.react_app_firebase_project_id,
  // storageBucket: process.env.react_app_firebase_storage_bucket,
  // messagingSenderId: process.env.react_app_firebase_messaging_sender_id,
  // appId: process.env.react_app_firebase_app_id,
  // measurementId: process.env.react_app_firebase_measurement_id

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

};

export {firebaseConfig};