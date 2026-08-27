/* ==================================================
   DEUTSCH. — INTERACTIVE LEARNING ENGINE
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


const savedData =
  localStorage.getItem("deutschProgress");


if (savedData) {

  userData =
    JSON.parse(savedData);

}


function saveProgress() {

  localStorage.setItem(
    "deutschProgress",
    JSON.stringify(userData)
  );

}


/* ==================================================
   LESSON DATA
================================================== */

const greetingsLesson = [

  {

    type: "TRANSLATE",

    question:
      'What does "Hallo" mean?',

    audio:
      "Hallo",

    answers: [

      "Hello",

      "Good night",

      "Thank you",

      "Goodbye"

    ],

    correct: 0,

    explanation:
      'Hallo means "Hello" in German.'

  },


  {

    type: "TRANSLATE",

    question:
      'What does "Guten Morgen" mean?',

    audio:
      "Guten Morgen",

    answers: [

      "Good evening",

      "Good morning",

      "Good night",

      "Goodbye"

    ],

    correct: 1,

    explanation:
      'Guten Morgen means "Good morning".'

  },


  {

    type: "CHOOSE",

    question:
      'Which one means "Good evening"?',

    audio:
      "Guten Abend",

    answers: [

      "Guten Morgen",

      "Gute Nacht",

      "Guten Abend",

      "Hallo"

    ],

    correct: 2,

    explanation:
      'Guten Abend means "Good evening".'

  },


  {

    type: "CHOOSE",

    question:
      'Which one means "Good night"?',

    audio:
      "Gute Nacht",

    answers: [

      "Guten Morgen",

      "Gute Nacht",

      "Guten Abend",

      "Danke"

    ],

    correct: 1,

    explanation:
      'Gute Nacht means "Good night".'

  },


  {

    type: "TRANSLATE",

    question:
      'How do you say "Hello" in German?',

    audio:
      "Hallo",

    answers: [

      "Danke",

      "Tschüss",

      "Hallo",

      "Bitte"

    ],

    correct: 2,

    explanation:
      'Hallo is the most common German word for "Hello".'

  }

];


let currentQuestion = 0;

let currentScore = 0;

let currentXP = 0;


/* ==================================================
   START LEARNING
================================================== */

function startLearning() {

  document
    .getElementById("home")
    .classList.add("hidden");


  document
    .getElementById("features")
    .classList.add("hidden");


  document
    .getElementById("levels")
    .classList.add("hidden");


  document
    .querySelector(".challenge-section")
    .classList.add("hidden");


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
    .classList.remove("hidden");


  document
    .getElementById("levels")
    .classList.remove("hidden");


  document
    .querySelector(".challenge-section")
    .classList.remove("hidden");


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


  showMessage(
    level +
    " will be available soon 🇩🇪"
  );

}


/* ==================================================
   DASHBOARD
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
    percentage + "% complete";


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
    function(lesson,index) {

      const number =
        index + 1;


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

    !userData.completedLessons
      .includes(number - 1)

  ) {

    showMessage(
      "Complete the previous lesson first 🔒"
    );

    return;

  }


  if (number === 1) {

    startLesson();

    return;

  }


  showMessage(
    "This lesson is coming soon 🇩🇪"
  );

}


/* ==================================================
   START LESSON
================================================== */

function startLesson() {

  currentQuestion = 0;

  currentScore = 0;

  currentXP = 0;


  document
    .getElementById("dashboard")
    .classList.add("hidden");


  document
    .getElementById("lessonPlayer")
    .classList.remove("hidden");


  document
    .getElementById("resultScreen")
    .classList.add("hidden");


  document
    .getElementById("lessonXP")
    .textContent =
    "0";


  loadQuestion();

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* ==================================================
   LOAD QUESTION
================================================== */

function loadQuestion() {

  const question =
    greetingsLesson[currentQuestion];


  document
    .getElementById("questionType")
    .textContent =
    question.type;


  document
    .getElementById("questionText")
    .textContent =
    question.question;


  document
    .getElementById("questionNumber")
    .textContent =
    currentQuestion + 1;


  document
    .getElementById("totalQuestions")
    .textContent =
    greetingsLesson.length;


  const percentage =

    ((currentQuestion + 1)
    / greetingsLesson.length) * 100;


  document
    .getElementById("lessonProgress")
    .style.width =
    percentage + "%";


  const grid =
    document.getElementById(
      "answerGrid"
    );


  grid.innerHTML = "";


  question.answers.forEach(

    function(answer,index) {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer-option";


      button.textContent =
        answer;


      button.onclick =
        function() {

          selectAnswer(
            index,
            button
          );

        };


      grid.appendChild(
        button
      );

    }

  );


  document
    .getElementById("feedback")
    .classList.add("hidden");


  document
    .getElementById("nextButton")
    .classList.add("hidden");

}


/* ==================================================
   SELECT ANSWER
================================================== */

function selectAnswer(
  selected,
  button
) {

  const question =
    greetingsLesson[currentQuestion];


  const buttons =
    document.querySelectorAll(
      ".answer-option"
    );


  buttons.forEach(
    function(btn) {

      btn.disabled = true;

    }
  );


  const correct =
    selected === question.correct;


  if (correct) {

    button.classList.add(
      "correct"
    );


    currentScore++;

    currentXP += 10;


    document
      .getElementById("lessonXP")
      .textContent =
      currentXP;


    document
      .getElementById("feedbackIcon")
      .textContent =
      "✓";


    document
      .getElementById("feedbackTitle")
      .textContent =
      "Correct! 🎉";


    document
      .getElementById("feedbackText")
      .textContent =
      question.explanation;


  }

  else {

    button.classList.add(
      "wrong"
    );


    buttons[
      question.correct
    ].classList.add(
      "correct"
    );


    document
      .getElementById("feedbackIcon")
      .textContent =
      "✕";


    document
      .getElementById("feedbackTitle")
      .textContent =
      "Not quite";


    document
      .getElementById("feedbackText")
      .textContent =
      question.explanation;

  }


  document
    .getElementById("feedback")
    .classList.remove(
      "hidden"
    );


  document
    .getElementById("nextButton")
    .classList.remove(
      "hidden"
    );

}


/* ==================================================
   NEXT QUESTION
================================================== */

function nextQuestion() {

  currentQuestion++;


  if (
    currentQuestion >=
    greetingsLesson.length
  ) {

    finishLesson();

    return;

  }


  loadQuestion();

}


/* ==================================================
   FINISH LESSON
================================================== */

function finishLesson() {

  const lessonNumber = 1;


  if (
    !userData.completedLessons
      .includes(lessonNumber)
  ) {

    userData.completedLessons.push(
      lessonNumber
    );

    userData.completed++;

    userData.xp += currentXP;

    saveProgress();

  }


  document
    .getElementById("lessonPlayer")
    .classList.add("hidden");


  document
    .getElementById("resultScreen")
    .classList.remove("hidden");


  document
    .getElementById("finalScore")
    .textContent =

    currentScore +
    "/" +
    greetingsLesson.length;


  document
    .getElementById("finalXP")
    .textContent =

    "+" +
    currentXP +
    " XP";


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* ==================================================
   RETURN DASHBOARD
================================================== */

function returnToDashboard() {

  document
    .getElementById("resultScreen")
    .classList.add("hidden");


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
   RESTART
================================================== */

function restartLesson() {

  document
    .getElementById("resultScreen")
    .classList.add("hidden");


  startLesson();

}


/* ==================================================
   CLOSE LESSON
================================================== */

function closeLesson() {

  document
    .getElementById("lessonPlayer")
    .classList.add("hidden");


  document
    .getElementById("dashboard")
    .classList.remove("hidden");


  updateDashboard();

}


/* ==================================================
   AUDIO
================================================== */

function playCurrentAudio() {

  const question =
    greetingsLesson[currentQuestion];


  speakGerman(
    question.audio
  );

}


function speakGerman(text) {

  if (
    !("speechSynthesis" in window)
  ) {

    showMessage(
      "Speech is not supported by your browser."
    );

    return;

  }


  window.speechSynthesis.cancel();


  const speech =
    new SpeechSynthesisUtterance(
      text
    );


  speech.lang =
    "de-DE";


  speech.rate =
    0.8;


  window.speechSynthesis.speak(
    speech
  );

}


/* ==================================================
   PREVIEW ANSWER
================================================== */

function previewAnswer(
  button,
  correct
) {

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

    showMessage(
      "Correct! 🎉"
    );

  }

  else {

    button.classList.add(
      "wrong"
    );

    showMessage(
      "Try the A1 course to learn more!"
    );

  }

}


/* ==================================================
   LEVEL TEST
================================================== */

function levelTest() {

  showMessage(
    "Full placement test coming in the next part 🇩🇪"
  );

}


/* ==================================================
   DAILY CHALLENGE
================================================== */

function dailyChallenge() {

  const answer =

    prompt(

      "🔥 DAILY CHALLENGE\n\n" +

      'What does "Danke" mean?\n\n' +

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
   MESSAGE
================================================== */

function showMessage(message) {

  const old =
    document.querySelector(
      ".toast"
    );


  if (old) {

    old.remove();

  }


  const toast =
    document.createElement(
      "div"
    );


  toast.className =
    "toast";


  toast.textContent =
    message;


  toast.style.position =
    "fixed";


  toast.style.bottom =
    "25px";


  toast.style.left =
    "50%";


  toast.style.transform =
    "translateX(-50%)";


  toast.style.padding =
    "13px 20px";


  toast.style.background =
    "#171717";


  toast.style.color =
    "white";


  toast.style.borderRadius =
    "10px";


  toast.style.fontSize =
    "13px";


  toast.style.fontWeight =
    "600";


  toast.style.zIndex =
    "9999";


  document.body.appendChild(
    toast
  );


  setTimeout(

    function() {

      toast.remove();

    },

    2500

  );

}
