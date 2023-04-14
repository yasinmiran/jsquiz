$(document).ready(() => {

    window.quizState = {
        name: "",
        difficultyLevel: "",
        currentView: DIFFICULTY_LEVEL_SECTION,
        questions: []
    };

    navigateTo(quizState.currentView);

    // Event Handlers

    $(`#${INTROUCTION_SECTION}>button`).first().click(() => {
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

    $(`#${DIFFICULTY_LEVEL_SECTION} input[type=submit]`)
        .click(difficultyLevelSectionHanlder);

});

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

    debugger;
    
    const x = $(`div[data-diff=${selectedLevel}]`); // 4
    
    // Shuffle the questions

    [ ...x ].splice(0, QUIZ_QUESTION_COUNT).forEach((question) => {
        $(question).removeClass("hidden")
    });

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

    $(`#${QUIZ_SECTION}>#question-block #question`).html(
        elements[0][0]
    )

    $(`#${QUIZ_SECTION}>#question-block #answers`).html(
        elements[0][1]
    )

    navigateTo(QUIZ_SECTION);

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
        )
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
    const questions = QUESTIONS.filter((question) => question.difficulty === difficultyLevel);
    // [1, 2, 3, 4, 5, 6]

    // TODO: Shuffle the questions
    // [3, 5, 6, 2, 1, 4]

    return questions.splice(0, questionCount)
}

/**
 * This function navigates the user to
 * different sections.
 * @param {String} sectionId 
 */
function navigateTo(sectionId) {
    $(`#${quizState.currentView}`).hide();
    $(`#${sectionId}`).show().removeClass('hidden');
    quizState.currentView = sectionId;
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidUsername(name) {

    const regex = /^[a-zA-Z ]+$/g;
    // const regex2 = new RegExp("^[a-zA-Z ]+$", "gmi");

    return regex.test(name)

    // ^[a-zA-Z ]+$
    // This regex matches names which contains only alphabetic
    // characters.
}
