import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvuKr2l-fHsGcK-hIvR_7bdVIXLVP_BwE",
  authDomain: "expense-tracker-54d22.firebaseapp.com",
  projectId: "expense-tracker-54d22",
  storageBucket: "expense-tracker-54d22.firebasestorage.app",
  messagingSenderId: "580241328172",
  appId: "1:580241328172:web:c0195e8478a7d70be4e989"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;