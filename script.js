/* ==================================================
   DEUTSCH. — INTERACTIVE SYSTEM
================================================== */


/* ==================================================
   USER DATA
================================================== */

let userData = {

  xp: 0,

  streak: 1,

  completed: 0,

  completedLessons: []

};


/* Load saved progress */

const savedData =
  localStorage.getItem("deutschProgress");


if (savedData) {

  userData =
    JSON.parse(savedData);

}


/* Save progress */

function saveProgress() {

  localStorage.setItem(
    "deutschProgress",
    JSON.stringify(userData)
  );

}


/* ==================================================
   START LEARNING
================================================== */

function startLearning() {

  document
    .getElementById("home")
    .classList.add("hidden");

  document
    .getElementById("features")
    ?.classList.add("hidden");

  document
    .getElementById("levels")
    ?.classList.add("hidden");

  document
    .querySelector(".challenge-section")
    ?.classList.add("hidden");

  document
    .getElementById("dashboard")
    .classList.remove("hidden");

  updateDashboard();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==================================================
   BACK HOME
================================================== */

function backHome() {

  document
    .getElementById("dashboard")
    .classList.add("hidden");

  document
    .getElementById("home")
    .classList.remove("hidden");

  document
    .getElementById("features")
    ?.classList.remove("hidden");

  document
    .getElementById("levels")
    ?.classList.remove("hidden");

  document
    .querySelector(".challenge-section")
    ?.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==================================================
   LEVEL SELECTION
================================================== */

function selectLevel(level) {

  if (level === "A1") {

    startLearning();

    return;

  }


  alert(

    level +
    " course is coming soon! 🇩🇪"

  );

}


/* ==================================================
   DASHBOARD UPDATE
================================================== */

function updateDashboard() {

  document
    .getElementById("xpValue")
    .textContent =
    userData.xp;


  document
    .getElementById("streakValue")
    .textContent =
    userData.streak;


  document
    .getElementById("completedValue")
    .textContent =

    userData.completed +
    " / 6";


  const percentage =

    Math.round(
      (userData.completed / 6) * 100
    );


  document
    .getElementById("progressValue")
    .textContent =
    percentage + "%";


  document
    .getElementById("progressText")
    .textContent =

    percentage +
    "% complete";


  document
    .getElementById("courseProgress")
    .style.width =

    percentage + "%";


  updateLessonStates();

}


/* ==================================================
   LESSON STATES
================================================== */

function updateLessonStates() {

  const lessons =
    document.querySelectorAll(
      ".course-lesson"
    );


  lessons.forEach(
    function(lesson, index) {

      const number = index + 1;


      const status =
        lesson.querySelector(
          ".lesson-status"
        );


      if (
        userData.completedLessons
          .includes(number)
      ) {

        status.textContent =
          "✓ DONE";

        status.classList.remove(
          "locked"
        );

      }

      else if (
        number === 1 ||
        userData.completedLessons
          .includes(number - 1)
      ) {

        status.textContent =
          "START";

        status.classList.remove(
          "locked"
        );

      }

      else {

        status.textContent =
          "LOCKED";

        status.classList.add(
          "locked"
        );

      }

    }
  );

}


/* ==================================================
   OPEN LESSON
================================================== */

function openLesson(number) {

  if (
    number > 1 &&
    !userData.completedLessons.includes(
      number - 1
    )
  ) {

    showMessage(
      "Complete the previous lesson first 🔒"
    );

    return;

  }


  if (number === 1) {

    startLessonOne();

    return;

  }


  showMessage(
    "Lesson " +
    number +
    " will be added soon! 🇩🇪"
  );

}


/* ==================================================
   LESSON ONE
================================================== */

function startLessonOne() {

  const lesson =

    prompt(

      "🇩🇪 LESSON 01 — GREETINGS\n\n" +

      "What does \"Guten Morgen\" mean?\n\n" +

      "A) Good morning\n" +

      "B) Good night\n" +

      "C) Goodbye\n\n" +

      "Type A, B or C:"
    );


  if (!lesson) return;


  if (
    lesson.toUpperCase() === "A"
  ) {

    completeLesson(1);

  }

  else {

    showMessage(
      "Not quite! Guten Morgen = Good morning."
    );

  }

}


/* ==================================================
   COMPLETE LESSON
================================================== */

function completeLesson(number) {

  if (
    !userData.completedLessons.includes(
      number
    )
  ) {

    userData.completedLessons.push(
      number
    );

    userData.completed++;

    userData.xp += 20;

    saveProgress();

  }


  updateDashboard();


  showMessage(
    "Lesson complete! +20 XP 🎉"
  );

}


/* ==================================================
   SPEECH
================================================== */

function speakGerman(text) {

  if (
    !("speechSynthesis" in window)
  ) {

    alert(
      "Your browser does not support speech synthesis."
    );

    return;

  }


  const speech =
    new SpeechSynthesisUtterance(text);


  speech.lang = "de-DE";

  speech.rate = 0.85;


  window.speechSynthesis.speak(
    speech
  );

}


/* ==================================================
   PREVIEW ANSWERS
================================================== */

function answer(button, correct) {

  const buttons =
    document.querySelectorAll(
      ".answers button"
    );


  buttons.forEach(
    function(btn) {

      btn.disabled = true;

    }
  );


  if (correct) {

    button.classList.add(
      "correct"
    );

    button.textContent =
      "✓ I am Rahul.";

    showMessage(
      "Correct! 🎉"
    );

  }

  else {

    button.classList.add(
      "wrong"
    );

    showMessage(
      "Not quite. Try again in the course!"
    );

  }

}


/* ==================================================
   LEVEL TEST
================================================== */

function levelTest() {

  alert(

    "🇩🇪 German Level Test\n\n" +

    "This will become a complete\n" +

    "interactive placement test.\n\n" +

    "Coming in Part 3!"

  );

}


/* ==================================================
   DAILY CHALLENGE
================================================== */

function dailyChallenge() {

  const answer =

    prompt(

      "🔥 DAILY CHALLENGE\n\n" +

      "Translate:\n\n" +

      "\"Danke\"\n\n" +

      "A) Hello\n" +

      "B) Thank you\n" +

      "C) Goodbye\n\n" +

      "Type A, B or C:"
    );


  if (!answer) return;


  if (
    answer.toUpperCase() === "B"
  ) {

    userData.xp += 10;

    saveProgress();

    updateDashboard();

    showMessage(
      "Correct! +10 XP 🔥"
    );

  }

  else {

    showMessage(
      "Danke = Thank you 🇩🇪"
    );

  }

}


/* ==================================================
   FEEDBACK MESSAGE
================================================== */

function showMessage(message) {

  const old =
    document.querySelector(
      ".feedback"
    );


  if (old) {

    old.remove();

  }


  const feedback =
    document.createElement(
      "div"
    );


  feedback.className =
    "feedback";


  feedback.textContent =
    message;


  feedback.style.position =
    "fixed";


  feedback.style.bottom =
    "25px";


  feedback.style.left =
    "50%";


  feedback.style.transform =
    "translateX(-50%)";


  feedback.style.padding =
    "13px 20px";


  feedback.style.background =
    "#171717";


  feedback.style.color =
    "white";


  feedback.style.borderRadius =
    "10px";


  feedback.style.fontSize =
    "13px";


  feedback.style.fontWeight =
    "600";


  feedback.style.zIndex =
    "999";


  document.body.appendChild(
    feedback
  );


  setTimeout(
    function() {

      feedback.remove();

    },
    2500
  );

}


/* ==================================================
   INITIALIZE
================================================== */

console.log(
  "🇩🇪 Deutsch. Interactive Learning Platform loaded."
);
