// Importar Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZs4bcM6l4MjOiIjA1OqnyHmTyYhNGVMY",
    authDomain: "dinosaurioxd-1dd5a.firebaseapp.com",
    projectId: "dinosaurioxd-1dd5a",
    storageBucket: "dinosaurioxd-1dd5a.firebasestorage.app",
    messagingSenderId: "1093109909387",
    appId: "1:1093109909387:web:7494254b8fc7387990518e"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección en Firestore
const scoresCollection = collection(db, "gameScores");

// Variables globales
let isJumping = false;
let isGameRunning = false;
let score = 0;
let gameInterval;

// Obtener elementos del DOM
document.addEventListener("DOMContentLoaded", async () => {
    const startGameButton = document.getElementById("startGameButton");
    const jumpButton = document.getElementById("jumpButton");
    const playerNameInput = document.getElementById("playerName");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const highScoreDisplay = document.getElementById("highScore");
    const bestPlayerDisplay = document.getElementById("bestPlayer");
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");

    // Obtener el mejor puntaje al cargar
    await getHighScore();

    // **Iniciar juego**
    startGameButton.addEventListener("click", () => {
        if (isGameRunning) return; // Evita reiniciar el juego si ya está en curso

        let playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert("Ingresa tu nombre para jugar.");
            return;
        }

        // Reiniciar valores
        score = 0;
        isGameRunning = true;
        scoreDisplay.textContent = score;
        cactus.style.animation = "move 1.5s infinite linear";
        startGameButton.disabled = true; // Deshabilitar botón mientras se juega

        gameInterval = setInterval(() => {
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

            if (cactusLeft > 540 && cactusLeft < 580 && dinoTop < 40) {
                gameOver(playerName);
            } else {
                score++;
                scoreDisplay.textContent = score;
            }
        }, 100);
    });

    // **Función para terminar el juego**
    function gameOver(playerName) {
        clearInterval(gameInterval); // Detener el aumento del puntaje
        cactus.style.animation = "none"; // Detener la animación del cactus
        isGameRunning = false;
        startGameButton.disabled = false; // Habilitar el botón de inicio
        saveScore(playerName, score);
        alert(`¡Perdiste! Puntaje: ${score}`);
    }

    // **Saltar**
    function jump() {
        if (!isJumping) {
            isJumping = true;
            dino.classList.add("jump");
            setTimeout(() => {
                dino.classList.remove("jump");
                isJumping = false;
            }, 500);
        }
    }

    // **Eventos de salto**
    jumpButton.addEventListener("click", jump);
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            jump();
        }
    });

    // **Guardar puntaje en Firestore**
    async function saveScore(playerName, score) {
        try {
            await addDoc(scoresCollection, {
                name: playerName,
                score: score,
                date: new Date()
            });
            console.log("📌 Puntaje guardado en Firebase");
            await getHighScore(); // Actualizar el mejor puntaje
        } catch (error) {
            console.error("❌ Error guardando el puntaje:", error);
        }
    }

    // **Obtener el mejor puntaje**
    async function getHighScore() {
        try {
            const q = query(scoresCollection, orderBy("score", "desc"), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const bestScoreDoc = querySnapshot.docs[0].data();
                highScoreDisplay.textContent = bestScoreDoc.score;
                bestPlayerDisplay.textContent = bestScoreDoc.name;
            }
        } catch (error) {
            console.error("❌ Error obteniendo el mejor puntaje:", error);
        }
    }
});

