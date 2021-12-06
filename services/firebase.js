import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyD_hOxlvQmPm1RLwHRFtiDfQpmupKNB8tY",
  authDomain: "movies-8f7d2.firebaseapp.com",
  projectId: "movies-8f7d2",
  storageBucket: "movies-8f7d2.appspot.com",
  messagingSenderId: "672307070763",
  appId: "1:672307070763:web:19eb544b410fd20d5e676e"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


const getAll = () => {
      return database
}



export default{
  getAll
}