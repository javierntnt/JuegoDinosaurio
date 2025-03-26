let randomNumber = Math.floor(Math.random() * 1000) + 1;

function checkGuess() {
    const userGuess = Number(document.getElementById("guess").value);
    const feedback = document.getElementById("feedback");

    if (!userGuess || userGuess < 1 || userGuess > 1000) {
        feedback.textContent = "Por favor, introduce un número entre 1 y 1000.";
        feedback.style.color = "red";
        return;
    }

    if (userGuess === randomNumber) {
        feedback.textContent = "¡Felicidades! Adivinaste el número.";
        feedback.style.color = "green";
    } else if (userGuess < randomNumber) {
        feedback.textContent = "El número es más alto.";
        feedback.style.color = "orange";
    } else {
        feedback.textContent = "El número es más bajo.";
        feedback.style.color = "orange";
    }
}
