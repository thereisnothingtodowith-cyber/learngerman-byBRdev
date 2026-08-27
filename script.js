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
/* ==================================================
   PART 4 — LESSON 2
   INTRODUCING YOURSELF
================================================== */


const introducingLesson = [

  {
    type: "TRANSLATE",

    question:
      'What does "Ich bin Rahul." mean?',

    audio:
      "Ich bin Rahul.",

    answers: [
      "I am Rahul.",
      "My name is Germany.",
      "I live in Germany.",
      "I speak German."
    ],

    correct: 0,

    explanation:
      '"Ich bin Rahul" means "I am Rahul."'
  },


  {
    type: "TRANSLATE",

    question:
      'What does "Ich heiße Rahul." mean?',

    audio:
      "Ich heiße Rahul.",

    answers: [
      "I am 17 years old.",
      "My name is Rahul.",
      "I live in India.",
      "I like German."
    ],

    correct: 1,

    explanation:
      '"Ich heiße Rahul" means "My name is Rahul."'
  },


  {
    type: "CHOOSE",

    question:
      'How do you say "My name is Rahul" in German?',

    audio:
      "Ich heiße Rahul.",

    answers: [
      "Ich komme Rahul.",
      "Ich bin Deutschland.",
      "Ich heiße Rahul.",
      "Ich wohne Rahul."
    ],

    correct: 2,

    explanation:
      '"Ich heiße..." is commonly used to introduce your name.'
  },


  {
    type: "CHOOSE",

    question:
      'What does "Ich komme aus Indien." mean?',

    audio:
      "Ich komme aus Indien.",

    answers: [
      "I live in Germany.",
      "I come from India.",
      "I speak German.",
      "I am German."
    ],

    correct: 1,

    explanation:
      '"Ich komme aus Indien" means "I come from India."'
  },


  {
    type: "TRANSLATE",

    question:
      'How do you say "I live in India" in German?',

    audio:
      "Ich wohne in Indien.",

    answers: [
      "Ich wohne in Indien.",
      "Ich heiße Indien.",
      "Ich komme Rahul.",
      "Ich bin Indien."
    ],

    correct: 0,

    explanation:
      '"Ich wohne in Indien" means "I live in India."'
  }

];


let lesson2CurrentQuestion = 0;

let lesson2Score = 0;

let lesson2XP = 0;


/* ==================================================
   OPEN LESSON 2
================================================== */

function startLesson2() {

  lesson2CurrentQuestion = 0;

  lesson2Score = 0;

  lesson2XP = 0;


  document
    .getElementById("dashboard")
    .classList.add("hidden");


  document
    .getElementById("lesson2Player")
    .classList.remove("hidden");


  document
    .getElementById("lesson2Result")
    .classList.add("hidden");


  loadLesson2Question();


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* ==================================================
   LOAD LESSON 2 QUESTION
================================================== */

function loadLesson2Question() {

  const question =
    introducingLesson[
      lesson2CurrentQuestion
    ];


  document
    .getElementById("lesson2QuestionType")
    .textContent =
    question.type;


  document
    .getElementById("lesson2QuestionText")
    .textContent =
    question.question;


  document
    .getElementById("lesson2QuestionNumber")
    .textContent =
    lesson2CurrentQuestion + 1;


  document
    .getElementById("lesson2TotalQuestions")
    .textContent =
    introducingLesson.length;


  const percentage =

    (
      (lesson2CurrentQuestion + 1)
      /
      introducingLesson.length
    ) * 100;


  document
    .getElementById("lesson2Progress")
    .style.width =
    percentage + "%";


  document
    .getElementById("lesson2XP")
    .textContent =
    lesson2XP;


  const grid =
    document.getElementById(
      "lesson2AnswerGrid"
    );


  grid.innerHTML = "";


  question.answers.forEach(

    function(answer, index) {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer-option";


      button.textContent =
        answer;


      button.onclick = function() {

        selectLesson2Answer(
          index,
          button
        );

      };


      grid.appendChild(button);

    }

  );


  document
    .getElementById("lesson2Feedback")
    .classList.add("hidden");


  document
    .getElementById("lesson2NextButton")
    .classList.add("hidden");

}


/* ==================================================
   SELECT ANSWER
================================================== */

function selectLesson2Answer(
  selected,
  button
) {

  const question =
    introducingLesson[
      lesson2CurrentQuestion
    ];


  const buttons =
    document.querySelectorAll(
      "#lesson2AnswerGrid .answer-option"
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


    lesson2Score++;

    lesson2XP += 10;


    document
      .getElementById("lesson2FeedbackIcon")
      .textContent =
      "✓";


    document
      .getElementById("lesson2FeedbackTitle")
      .textContent =
      "Correct! 🎉";


    document
      .getElementById("lesson2FeedbackText")
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
      .getElementById("lesson2FeedbackIcon")
      .textContent =
      "✕";


    document
      .getElementById("lesson2FeedbackTitle")
      .textContent =
      "Not quite";


    document
      .getElementById("lesson2FeedbackText")
      .textContent =
      question.explanation;

  }


  document
    .getElementById("lesson2XP")
    .textContent =
    lesson2XP;


  document
    .getElementById("lesson2Feedback")
    .classList.remove(
      "hidden"
    );


  document
    .getElementById("lesson2NextButton")
    .classList.remove(
      "hidden"
    );

}


/* ==================================================
   NEXT QUESTION
================================================== */

function nextLesson2Question() {

  lesson2CurrentQuestion++;


  if (
    lesson2CurrentQuestion >=
    introducingLesson.length
  ) {

    finishLesson2();

    return;

  }


  loadLesson2Question();

}


/* ==================================================
   FINISH LESSON 2
================================================== */

function finishLesson2() {

  const lessonNumber = 2;


  if (
    !userData.completedLessons
      .includes(lessonNumber)
  ) {

    userData.completedLessons.push(
      lessonNumber
    );

    userData.completed++;

    userData.xp += lesson2XP;

    saveProgress();

  }


  document
    .getElementById("lesson2Player")
    .classList.add("hidden");


  document
    .getElementById("lesson2Result")
    .classList.remove("hidden");


  document
    .getElementById("lesson2FinalScore")
    .textContent =

    lesson2Score +
    "/" +
    introducingLesson.length;


  document
    .getElementById("lesson2FinalXP")
    .textContent =

    "+" +
    lesson2XP +
    " XP";


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* ==================================================
   CLOSE LESSON 2
================================================== */

function closeLesson2() {

  document
    .getElementById("lesson2Player")
    .classList.add("hidden");


  document
    .getElementById("dashboard")
    .classList.remove("hidden");


  updateDashboard();

}


/* ==================================================
   RETURN FROM LESSON 2
================================================== */

function returnFromLesson2() {

  document
    .getElementById("lesson2Result")
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
   RESTART LESSON 2
================================================== */

function restartLesson2() {

  document
    .getElementById("lesson2Result")
    .classList.add("hidden");


  startLesson2();

}


/* ==================================================
   LESSON 2 AUDIO
================================================== */

function playLesson2Audio() {

  const question =
    introducingLesson[
      lesson2CurrentQuestion
    ];


  speakGerman(
    question.audio
  );

}
/* ==================================================
   PART 4 — CONNECT LESSON 2
================================================== */

const originalOpenLesson = openLesson;


openLesson = function(number) {

  if (number === 2) {

    if (
      !userData.completedLessons
        .includes(1)
    ) {

      showMessage(
        "Complete Lesson 1 first 🔒"
      );

      return;

    }


    startLesson2();

    return;

  }


  originalOpenLesson(number);

};
/* ==================================================
   PART 5 — LESSON 3
   GERMAN NUMBERS
================================================== */


const numbersLesson = [

  {
    type: "TRANSLATE",

    question:
      'What does "eins" mean?',

    audio:
      "eins",

    answers: [
      "One",
      "Two",
      "Three",
      "Four"
    ],

    correct: 0,

    explanation:
      '"Eins" means one.'
  },


  {
    type: "TRANSLATE",

    question:
      'What does "fünf" mean?',

    audio:
      "fünf",

    answers: [
      "Three",
      "Four",
      "Five",
      "Six"
    ],

    correct: 2,

    explanation:
      '"Fünf" means five.'
  },


  {
    type: "CHOOSE",

    question:
      'Which German word means "ten"?',

    audio:
      "zehn",

    answers: [
      "acht",
      "zehn",
      "zwölf",
      "sieben"
    ],

    correct: 1,

    explanation:
      '"Zehn" means ten.'
  },


  {
    type: "TRANSLATE",

    question:
      'What does "zwanzig" mean?',

    audio:
      "zwanzig",

    answers: [
      "Fifteen",
      "Eighteen",
      "Twenty",
      "Thirty"
    ],

    correct: 2,

    explanation:
      '"Zwanzig" means twenty.'
  },


  {
    type: "CHOOSE",

    question:
      'Which one means "three" in German?',

    audio:
      "drei",

    answers: [
      "drei",
      "vier",
      "zwei",
      "neun"
    ],

    correct: 0,

    explanation:
      '"Drei" means three.'
  }

];


let lesson3CurrentQuestion = 0;

let lesson3Score = 0;

let lesson3XP = 0;


/* ==================================================
   START LESSON 3
================================================== */

function startLesson3() {

  lesson3CurrentQuestion = 0;

  lesson3Score = 0;

  lesson3XP = 0;


  document
    .getElementById("dashboard")
    .classList.add("hidden");


  document
    .getElementById("lesson3Player")
    .classList.remove("hidden");


  document
    .getElementById("lesson3Result")
    .classList.add("hidden");


  loadLesson3Question();


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* ==================================================
   LOAD QUESTION
================================================== */

function loadLesson3Question() {

  const question =
    numbersLesson[
      lesson3CurrentQuestion
    ];


  document
    .getElementById("lesson3QuestionType")
    .textContent =
    question.type;


  document
    .getElementById("lesson3QuestionText")
    .textContent =
    question.question;


  document
    .getElementById("lesson3QuestionNumber")
    .textContent =
    lesson3CurrentQuestion + 1;


  document
    .getElementById("lesson3TotalQuestions")
    .textContent =
    numbersLesson.length;


  const percentage =

    (
      (lesson3CurrentQuestion + 1)
      /
      numbersLesson.length
    ) * 100;


  document
    .getElementById("lesson3Progress")
    .style.width =
    percentage + "%";


  document
    .getElementById("lesson3XP")
    .textContent =
    lesson3XP;


  const grid =
    document.getElementById(
      "lesson3AnswerGrid"
    );


  grid.innerHTML = "";


  question.answers.forEach(

    function(answer, index) {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer-option";


      button.textContent =
        answer;


      button.onclick = function() {

        selectLesson3Answer(
          index,
          button
        );

      };


      grid.appendChild(button);

    }

  );


  document
    .getElementById("lesson3Feedback")
    .classList.add("hidden");


  document
    .getElementById("lesson3NextButton")
    .classList.add("hidden");

}


/* ==================================================
   SELECT ANSWER
================================================== */

function selectLesson3Answer(
  selected,
  button
) {

  const question =
    numbersLesson[
      lesson3CurrentQuestion
    ];


  const buttons =
    document.querySelectorAll(
      "#lesson3AnswerGrid .answer-option"
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


    lesson3Score++;

    lesson3XP += 10;


    document
      .getElementById("lesson3FeedbackIcon")
      .textContent =
      "✓";


    document
      .getElementById("lesson3FeedbackTitle")
      .textContent =
      "Correct! 🎉";


    document
      .getElementById("lesson3FeedbackText")
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
      .getElementById("lesson3FeedbackIcon")
      .textContent =
      "✕";


    document
      .getElementById("lesson3FeedbackTitle")
      .textContent =
      "Not quite";


    document
      .getElementById("lesson3FeedbackText")
      .textContent =
      question.explanation;

  }


  document
    .getElementById("lesson3XP")
    .textContent =
    lesson3XP;


  document
    .getElementById("lesson3Feedback")
    .classList.remove(
      "hidden"
    );


  document
    .getElementById("lesson3NextButton")
    .classList.remove(
      "hidden"
    );

}


/* ==================================================
   NEXT QUESTION
================================================== */

function nextLesson3Question() {

  lesson3CurrentQuestion++;


  if (
    lesson3CurrentQuestion >=
    numbersLesson.length
  ) {

    finishLesson3();

    return;

  }


  loadLesson3Question();

}


/* ==================================================
   FINISH LESSON 3
================================================== */

function finishLesson3() {

  const lessonNumber = 3;


  if (
    !userData.completedLessons
      .includes(lessonNumber)
  ) {

    userData.completedLessons.push(
      lessonNumber
    );

    userData.completed++;

    userData.xp += lesson3XP;

    saveProgress();

  }


  document
    .getElementById("lesson3Player")
    .classList.add("hidden");


  document
    .getElementById("lesson3Result")
    .classList.remove("hidden");


  document
    .getElementById("lesson3FinalScore")
    .textContent =

    lesson3Score +
    "/" +
    numbersLesson.length;


  document
    .getElementById("lesson3FinalXP")
    .textContent =

    "+" +
    lesson3XP +
    " XP";


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* ==================================================
   CLOSE LESSON 3
================================================== */

function closeLesson3() {

  document
    .getElementById("lesson3Player")
    .classList.add("hidden");


  document
    .getElementById("dashboard")
    .classList.remove("hidden");


  updateDashboard();

}


/* ==================================================
   RETURN TO DASHBOARD
================================================== */

function returnFromLesson3() {

  document
    .getElementById("lesson3Result")
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
   RESTART LESSON 3
================================================== */

function restartLesson3() {

  document
    .getElementById("lesson3Result")
    .classList.add("hidden");


  startLesson3();

}


/* ==================================================
   LESSON 3 AUDIO
================================================== */

function playLesson3Audio() {

  const question =
    numbersLesson[
      lesson3CurrentQuestion
    ];


  speakGerman(
    question.audio
  );

}


/* ==================================================
   CONNECT LESSON 3
================================================== */

const previousOpenLesson =
  openLesson;


openLesson = function(number) {

  if (number === 3) {

    if (
      !userData.completedLessons
        .includes(2)
    ) {

      showMessage(
        "Complete Lesson 2 first 🔒"
      );

      return;

    }


    startLesson3();

    return;

  }


  previousOpenLesson(number);

};
