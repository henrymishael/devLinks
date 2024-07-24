// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// export async function signUp(email, password) {
//   const response = await fetch(`localhost:3000/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     throw new Error("Signup failed");
//   }

//   return response.json();
// }
const firebaseConfig = {
  apiKey: "AIzaSyCPQ4NJy47z0D_o25JmXv9svqaXFrjlfDA",
  authDomain: "devlink-6d3e2.firebaseapp.com",
  projectId: "devlink-6d3e2",
  storageBucket: "devlink-6d3e2.appspot.com",
  messagingSenderId: "245568697977",
  appId: "1:245568697977:web:5c36bb542794681fda46a8",
  measurementId: "G-YWK0NC5S9X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
