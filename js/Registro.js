 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAp1mfpOhYf7_hZJvkm5S3ZviFU8coAfjM",
   authDomain: "javier-53961.firebaseapp.com",
   projectId: "javier-53961",
   storageBucket: "javier-53961.firebasestorage.app",
   messagingSenderId: "873416995492",
   appId: "1:873416995492:web:1f9eef8e37aee227c62c31"
 };
// Inicializar Firebase
 const app = firebase.initializeApp(firebaseConfig);
 const db = firebase.database();

 function startGame() {
     const playerName = document.getElementById('playerName').value;
     if (playerName) {
         // Guardar el nombre del jugador en la base de datos
         const playerRef = db.ref('players/' + playerName);
         playerRef.set({ score: 0 });

         // Redirigir al archivo HTML del juego
         window.location.href = 'juego.html';
     } else {
         alert("Por favor ingresa tu nombre");
     }
 }