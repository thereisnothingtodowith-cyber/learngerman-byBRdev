/* =========================================
   DEUTSCH. — INTERACTIVE JAVASCRIPT
========================================= */


/* =========================================
   START LEARNING
========================================= */

function startLearning() {

  document
    .getElementById("levels")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================
   LEVEL TEST
========================================= */

function levelTest() {

  alert(
    "🇩🇪 Level Test\n\n" +
    "This interactive test will help you find your German level.\n\n" +
    "Coming in the next version!"
  );

}


/* =========================================
   GERMAN PRONUNCIATION
========================================= */

function speakGerman() {

  const text = "Ich bin Rahul.";

  if ("speechSynthesis" in window) {

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "de-DE";

    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);

  } else {

    alert(
      "Your browser does not support German pronunciation."
    );

  }

}


/* =========================================
   ANSWER SYSTEM
========================================= */

function answer(button, correct) {

  const buttons =
    document.querySelectorAll(".answers button");

  buttons.forEach(function(btn) {

    btn.disabled = true;

  });


  if (correct) {

    button.classList.add("correct");

    button.innerHTML =
      "✓ I am Rahul.";

    showMessage(
      "Correct! +20 XP 🎉"
    );

  } else {

    button.classList.add("wrong");

    showMessage(
      "Not quite! Try another lesson."
    );

  }

}


/* =========================================
   MESSAGE
========================================= */

function showMessage(message) {

  const existing =
    document.querySelector(".feedback");

  if (existing) {

    existing.remove();

  }


  const feedback =
    document.createElement("div");

  feedback.className = "feedback";

  feedback.textContent = message;

  feedback.style.position = "fixed";
  feedback.style.bottom = "25px";
  feedback.style.left = "50%";
  feedback.style.transform = "translateX(-50%)";
  feedback.style.padding = "13px 20px";
  feedback.style.background = "#171717";
  feedback.style.color = "white";
  feedback.style.borderRadius = "10px";
  feedback.style.fontSize = "13px";
  feedback.style.fontWeight = "600";
  feedback.style.zIndex = "999";


  document.body.appendChild(feedback);


  setTimeout(function() {

    feedback.remove();

  }, 2500);

}


/* =========================================
   LEVEL SELECTION
========================================= */

function selectLevel(level) {

  if (level === "A1") {

    alert(
      "🇩🇪 A1 Beginner\n\n" +
      "Perfect starting point!\n\n" +
      "Your interactive A1 course will appear here."
    );

  }

  if (level === "A2") {

    alert(
      "🇩🇪 A2 Elementary\n\n" +
      "Build on your German foundation."
    );

  }

  if (level === "B1") {

    alert(
      "🇩🇪 B1 Intermediate\n\n" +
      "Get ready for real-world German."
    );

  }

}


/* =========================================
   DAILY CHALLENGE
========================================= */

function dailyChallenge() {

  const challenge =
    "🇩🇪 Daily Challenge\n\n" +
    "Translate:\n\n" +
    "Guten Morgen!\n\n" +
    "A) Good morning\n" +
    "B) Good night\n" +
    "C) Good evening";


  const answer =
    prompt(challenge + "\n\nType A, B or C:");


  if (!answer) return;


  if (answer.toUpperCase() === "A") {

    showMessage(
      "Correct! +10 XP 🔥"
    );

  } else {

    showMessage(
      "Almost! Guten Morgen = Good morning."
    );

  }

}


/* =========================================
   INITIAL PAGE MESSAGE
========================================= */

console.log(
  "🇩🇪 Deutsch. — Interactive German Learning Platform"
);
