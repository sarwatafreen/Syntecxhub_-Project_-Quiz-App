// const questions = [
//     {
//         question: "What is the capital of France?",
//         answers: [
//             { text: "Berlin", correct: false },
//             { text: "Paris", correct: true },
//             { text: "Madrid", correct: false }
//         ]
//     },
//     {
//         question: "Which language runs in a web browser?",
//         answers: [
//             { text: "Java", correct: false },
//             { text: "C", correct: false },
//             { text: "JavaScript", correct: true }
//         ]
//     }
// ];

// const questionElement = document.getElementById('question');
// const answerButtonsElement = document.getElementById('answer-buttons');
// const nextButton = document.getElementById('next-btn');
// const resultContainer = document.getElementById('result-container');
// const scoreText = document.getElementById('score-text');
// const restartBtn = document.getElementById('restart-btn');

// let currentQuestionIndex = 0;
// let score = 0;

// function startQuiz() {
//     currentQuestionIndex = 0;
//     score = 0;
//     resultContainer.classList.add('hide');
//     document.getElementById('quiz').classList.remove('hide');
//     showQuestion();
// }

// function showQuestion() {
//     resetState();
//     let currentQuestion = questions[currentQuestionIndex];
//     questionElement.innerText = currentQuestion.question;

//     currentQuestion.answers.forEach(answer => {
//         const button = document.createElement('button');
//         button.innerText = answer.text;
//         button.addEventListener('click', () => selectAnswer(answer, button));
//         answerButtonsElement.appendChild(button);
//     });
// }

// function resetState() {
//     nextButton.classList.add('hide');
//     while (answerButtonsElement.firstChild) {
//         answerButtonsElement.removeChild(answerButtonsElement.firstChild);
//     }
// }

// function selectAnswer(answer, button) {
//     if (answer.correct) {
//         score++;
//         button.classList.add('correct');
//     } else {
//         button.classList.add('wrong');
//     }
    
//     Array.from(answerButtonsElement.children).forEach(btn => btn.disabled = true);
//     nextButton.classList.remove('hide');
// }

// nextButton.addEventListener('click', () => {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < questions.length) {
//         showQuestion();
//     } else {
//         showScore();
//     }
// });

// function showScore() {
//     document.getElementById('quiz').classList.add('hide');
//     resultContainer.classList.remove('hide');
//     scoreText.innerText = `You scored ${score} out of ${questions.length}!`;
// }

// restartBtn.addEventListener('click', startQuiz);

// startQuiz();   



// Quiz data with 10 questions
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High-Level Text Management Language"],
    correct: 0
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "color", "font-color", "background-color"],
    correct: 1
  },
  {
    question: "What is the correct JavaScript syntax to write 'Hello World' in the console?",
    options: ["console.log('Hello World');", "print('Hello World');", "console.write('Hello World');", "echo('Hello World');"],
    correct: 0
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correct: 0
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<javascript>", "<script>", "<js>", "<code>"],
    correct: 1
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correct: 1
  },
  {
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    options: ["=", "==", "===", "=>"],
    correct: 0
  },
  {
    question: "What does the 'DOM' stand for in web development?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Display Object Management"],
    correct: 0
  },
  {
    question: "Which CSS property is used to control the spacing between elements?",
    options: ["margin", "padding", "spacing", "gap"],
    correct: 0
  },
  {
    question: "What is the result of '5' + 3 in JavaScript?",
    options: ["8", "53", "Error", "undefined"],
    correct: 1
  }
];

let userAnswers = new Array(quizData.length).fill(null);
let currentQuestionIndex = 0;
let quizCompleted = false;
let warningTimeout = null;

// DOM elements
const quizPanel = document.getElementById('quizPanel');
const resultPanel = document.getElementById('resultPanel');
const questionTextEl = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextSubmitBtn = document.getElementById('nextSubmitBtn');
const restartQuizBtn = document.getElementById('restartQuizBtn');
const restartFromResultBtn = document.getElementById('restartFromResultBtn');
const warningDiv = document.getElementById('warningMessage');
const questionCounterSpan = document.getElementById('questionCounter');
const finalScoreSpan = document.getElementById('finalScore');
const totalQuestionsSpan = document.getElementById('totalQuestionsSpan');
const resultMsgSpan = document.getElementById('resultMsg');

function showWarning(msg) {
  if (warningTimeout) clearTimeout(warningTimeout);
  warningDiv.textContent = `⚠️ ${msg}`;
  warningTimeout = setTimeout(() => { warningDiv.textContent = ''; }, 2000);
}

function clearWarning() {
  if (warningTimeout) clearTimeout(warningTimeout);
  warningDiv.textContent = '';
}

function updateCounterUI() {
  if (!quizCompleted && quizPanel && !quizPanel.classList.contains('hidden')) {
    questionCounterSpan.textContent = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
  }
}

function renderCurrentQuestion() {
  if (quizCompleted) return;
  const q = quizData[currentQuestionIndex];
  if (!q) return;

  questionTextEl.textContent = q.question;

  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    const isChecked = (userAnswers[currentQuestionIndex] === idx);
    optionsHtml += `
      <label class="option-item" data-opt-index="${idx}">
        <input type="radio" name="quizOption" value="${idx}" ${isChecked ? 'checked' : ''}>
        <span class="option-text">${escapeHtml(opt)}</span>
      </label>
    `;
  });
  optionsContainer.innerHTML = optionsHtml;

  // Event listeners for radio buttons
  const radioInputs = optionsContainer.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const val = parseInt(e.target.value);
      if (!isNaN(val)) {
        userAnswers[currentQuestionIndex] = val;
        clearWarning();
      }
    });
  });

  // Click on whole label for better UX
  const labels = optionsContainer.querySelectorAll('.option-item');
  labels.forEach(label => {
    label.addEventListener('click', (e) => {
      const radio = label.querySelector('input[type="radio"]');
      if (radio && !radio.checked) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      }
    });
  });

  updateCounterUI();
  updateButtonState();
}

function updateButtonState() {
  if (quizCompleted) return;
  const isLast = (currentQuestionIndex === quizData.length - 1);
  nextSubmitBtn.textContent = isLast ? '✅ Submit Quiz' : 'Next →';
}

function onNextOrSubmit() {
  if (quizCompleted) return;

  const currentAnswer = userAnswers[currentQuestionIndex];
  if (currentAnswer === null || currentAnswer === undefined) {
    showWarning('Please select an answer before continuing');
    return;
  }

  clearWarning();

  const isLast = (currentQuestionIndex === quizData.length - 1);
  if (isLast) {
    finishQuizAndShowScore();
  } else {
    currentQuestionIndex++;
    renderCurrentQuestion();
    applyFadeEffect();
  }
}

function applyFadeEffect() {
  const container = document.querySelector('.quiz-body');
  if (container) {
    container.style.opacity = '0.7';
    setTimeout(() => {
      container.style.opacity = '1';
    }, 80);
  }
}

function finishQuizAndShowScore() {
  let correctCount = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (userAnswers[i] === quizData[i].correct) correctCount++;
  }

  const total = quizData.length;
  const percentage = Math.round((correctCount / total) * 100);
  let message = '';
  if (percentage === 100) message = '🏆 Perfect Score! Mastermind!';
  else if (percentage >= 80) message = '🎉 Excellent! You nailed it.';
  else if (percentage >= 60) message = '👍 Good job! Keep learning.';
  else if (percentage >= 40) message = '📚 Nice try! Review a bit more.';
  else message = '💪 Keep practicing! You’ll improve.';

  finalScoreSpan.textContent = `${correctCount}`;
  totalQuestionsSpan.textContent = `/ ${total}`;
  resultMsgSpan.innerHTML = `${message}<br>${correctCount}/${total} correct`;

  quizPanel.classList.add('hidden');
  resultPanel.classList.remove('hidden');
  quizCompleted = true;
  questionCounterSpan.textContent = `Completed 🎯 ${correctCount}/${total}`;
}

function fullRestart() {
  userAnswers = new Array(quizData.length).fill(null);
  currentQuestionIndex = 0;
  quizCompleted = false;

  clearWarning();

  resultPanel.classList.add('hidden');
  quizPanel.classList.remove('hidden');

  updateCounterUI();
  renderCurrentQuestion();
  updateButtonState();

  document.querySelector('.quiz-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  applyFadeEffect();
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Event listeners
nextSubmitBtn.addEventListener('click', onNextOrSubmit);
restartQuizBtn.addEventListener('click', fullRestart);
restartFromResultBtn.addEventListener('click', fullRestart);

function initQuiz() {
  totalQuestionsSpan.textContent = `/ ${quizData.length}`;
  fullRestart();
}

initQuiz();