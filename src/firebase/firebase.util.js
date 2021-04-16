import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOpq1oBu-9R4iESH3TRrq-MYGZAT0byk0",
  authDomain: "testproject-1178e.firebaseapp.com",
  projectId: "testproject-1178e",
  storageBucket: "testproject-1178e.appspot.com",
  messagingSenderId: "631454635312",
  appId: "1:631454635312:web:99f2e17d52fe0ea432e4f5",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export default firebase;
