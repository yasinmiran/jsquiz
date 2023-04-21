$(document).ready(() => {
  window.quizState = {
    name: "",
    difficultyLevel: "",
    currentView: DIFFICULTY_LEVEL_SECTION,
    questions: [],
    activeQuizQuestions: [],
    activeQuestionIndex: 0, // Index of the current question of activeQuiz
  };

  navigateTo(quizState.currentView);

  // Event Handlers

  $(`#${INTROUCTION_SECTION}>button`)
    .first()
    .click(() => {
      navigateTo(USER_INFO_SECTION);
    });

  $(`#${USER_INFO_SECTION} input[type=submit]`).click((event) => {
    event.preventDefault();
    const name = $(`#${USER_INFO_SECTION} input[name='username']`).val();
    if (isValidUsername(name)) {
      window.quizState.name = name;
      navigateTo(DIFFICULTY_LEVEL_SECTION);
    } else {
      alert("Invalid username");
    }
  });

  $(`#${DIFFICULTY_LEVEL_SECTION} input[type=submit]`).click((event) => {
    event.preventDefault();

    const selectedLevel = $("#levels").val();
    quizState.difficultyLevel = selectedLevel;

    navigateTo(QUIZ_SECTION);
    startQuiz();
  });
});

function startQuiz() {
  // How we can fetch the questions?
  const questions = $(".question");

  const diff = quizState.difficultyLevel;

  // Filter out the specific questions
  const diffQuestions = []; // 3 : [0, 1, 2] genRandomNumber(0, 2) // 1, 1
  for (const question of questions) {
    if (question.getAttribute("data-diff") == diff) {
      diffQuestions.push(question);
    }
  }

  // Shuffle the questions
  shuffle(diffQuestions);

  // We constrain the number of questions to 2 (QUIZ_QUESTION_COUNT)
  const activeQuiz = diffQuestions.splice(0, QUIZ_QUESTION_COUNT);

  // assign the active questions to the quizState
  quizState.activeQuizQuestions = activeQuiz;

  // hide the previous button initially
  $(".previous-button").addClass("hidden");

  // Showing the initial question
  $(getActiveQuestion()).removeClass("hidden");
}

function getActiveQuestion() {
  return quizState.activeQuizQuestions[quizState.activeQuestionIndex];
}

function showNextQuestion() {
    $(getActiveQuestion()).addClass("hidden");
    quizState.activeQuestionIndex++;
    $(getActiveQuestion()).removeClass("hidden");
    if (quizState.activeQuestionIndex > 0) {
        $(".previous-button").removeClass("hidden");
    } else {
        $(".previous-button").addClass("hidden");
    }
}

function nextQuestion() {
  // check whether the answer is selected.
  const question = getActiveQuestion();
  const form = $(question).find(".answers>form");

  const formData = new FormData(form[0]);
  let answerforQuestion = undefined;

  debugger;

  const qid = question.getAttribute("data-question-id");

  if (question.getAttribute("data-question-type") === "MULTIPLE") {
    const checked = $(form[0]).children("input:checkbox:checked");
    if (checked.length > 0) {
        answerforQuestion = checked.map((i, e) => e.value).get();
    }
  } else {
    answerforQuestion = formData.get(qid);
  }

  if (!answerforQuestion) {
    alert("Please select an answer");
  } else {
    showNextQuestion();
  }

  // if not, show an alert
}

function previousQuestion() {
  if (quizState.activeQuestionIndex > 0) {
    $(getActiveQuestion()).addClass("hidden");
    quizState.activeQuestionIndex--;
    $(getActiveQuestion()).removeClass("hidden");
    if (quizState.activeQuestionIndex === 0) {
        $(".previous-button").addClass("hidden");
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex = undefined;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swaparray it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function difficultyLevelSectionHanlder(event) {
  event.preventDefault();

  // Step 1: figure out the difficulty level
  const selectedLevel = $("#levels").val();
  quizState.difficultyLevel = selectedLevel;

  // Step 2: generate questions

  // Step 2 Option: DYNAMIC --------
  // if you're dyanmically generate the questions
  // then randomize the questions here.
  // quizState.questions = generateQuestions(selectedLevel, QUIZ_QUESTION_COUNT);
  // Step 2 Option DYNAMIC / Sub step: create the questions

  // Step 2 Option: STATIC --------
  // if you're manually creating the questions

  // debugger;

  // const x = $(`div[data-diff=${selectedLevel}]`); // 4

  // Shuffle the questions

  // [ ...x ].splice(0, QUIZ_QUESTION_COUNT).forEach((question) => {
  //     $(question).removeClass("hidden")
  // });

  navigateTo(QUIZ_SECTION);

  /**
    const elements = [];

    for (const q of quizState.questions) {
        switch (q.type) {
            case "CHECKBOX":
                elements.push(generateElementForCheckboxQuestion(q))
                break;
            default:
                break;
        }
    }
     */

  // $(`#${QUIZ_SECTION}>#question-block #question`).html(
  //     elements[0][0]
  // )

  // $(`#${QUIZ_SECTION}>#question-block #answers`).html(
  //     elements[0][1]
  // )

  // navigateTo(QUIZ_SECTION);
}

// Generate some HTML
function generateElementForCheckboxQuestion(question) {
  const qContent = `<p>${question.question}</p>`;

  const checkboxList = [];
  for (const answer in question.answers) {
    const key = answer;
    const value = question.answers[answer];
    checkboxList.push(
      `
            <input type="checkbox" id="${key}" name="${key}" value="${value}">
            <label for="${key}">${value}</label><br>
            `
    );
  }

  const aContent = `
        <form>
            ${checkboxList.join("\n")}
        </form>
    `;

  return [qContent, aContent];
}

// generateQuestions("HARD", 5)
function generateQuestions(difficultyLevel, questionCount) {
  // 8 questions = 0..7
  const questions = QUESTIONS.filter(
    (question) => question.difficulty === difficultyLevel
  );
  // [1, 2, 3, 4, 5, 6]

  // TODO: Shuffle the questions
  // [3, 5, 6, 2, 1, 4]

  return questions.splice(0, questionCount);
}

/**
 * This function navigates the user to
 * different sections.
 * @param {String} sectionId
 */
function navigateTo(sectionId) {
  $(`#${quizState.currentView}`).hide();
  $(`#${sectionId}`).show().removeClass("hidden");
  quizState.currentView = sectionId;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidUsername(name) {
  const regex = /^[a-zA-Z ]+$/g;
  // const regex2 = new RegExp("^[a-zA-Z ]+$", "gmi");

  return regex.test(name);

  // ^[a-zA-Z ]+$
  // This regex matches names which contains only alphabetic
  // characters.
}
