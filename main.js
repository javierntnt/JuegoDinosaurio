import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// Configuración Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwvvBsW6DCuIXMyz2bCffupVRXFdGZ6c0",
    authDomain: "dinosaurio-602da.firebaseapp.com",
    projectId: "dinosaurio-602da",
    storageBucket: "dinosaurio-602da.firebasestorage.app",
    messagingSenderId: "582643715619",
    appId: "1:582643715619:web:6ebb4dc144fe53af462b96"
  };

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

let randomNumber = Math.floor(Math.random() * 100) + 1;
let currentUsername = "";

// Función para registrar al usuario
function registerUser() {
    const username = document.getElementById("username").value;
    const registrationFeedback = document.getElementById("registrationFeedback");

    if (username.trim() === "") {
        registrationFeedback.textContent = "Por favor, escribe un nombre de usuario.";
        return;
    }

    currentUsername = username;
    registrationFeedback.textContent = `¡Bienvenido, ${username}!`;
    document.getElementById("displayUsername").textContent = username;

    // Guarda el usuario en Firebase
    firebase.database().ref(`users/${username}`).set({
        username: username,
        status: "registrado"
    });

    // Muestra el juego
    document.querySelector(".register-container").style.display = "none";
    document.querySelector(".game-container").style.display = "block";
}

// Función para verificar la respuesta del usuario
function checkGuess() {
    const userGuess = Number(document.getElementById("guess").value);
    const feedback = document.getElementById("feedback");

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        feedback.textContent = "Por favor, introduce un número entre 1 y 100.";
        return;
    }

    if (userGuess === randomNumber) {
        feedback.textContent = "¡Felicidades! Adivinaste el número.";
        feedback.style.color = "green";

        // Actualiza el registro de Firebase como ganador
        firebase.database().ref(`users/${currentUsername}`).update({
            result: "ganador"
        });

    } else if (userGuess < randomNumber) {
        feedback.textContent = "El número es más alto.";
        feedback.style.color = "orange";
    } else {
        feedback.textContent = "El número es más bajo.";
        feedback.style.color = "orange";
    }

    if (userGuess !== randomNumber) {
        // Actualiza el registro de Firebase como perdedor
        firebase.database().ref(`users/${currentUsername}`).update({
            result: "perdedor"
        });
    }
}

