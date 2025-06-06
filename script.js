const questions = [
  {
    question: "Qual é a principal ligação entre o campo e a cidade?",
    answers: [
      { text: "Comércio de alimentos", correct: true },
      { text: "Música eletrônica", correct: false },
      { text: "Internet sem fio", correct: false },
      { text: "Aviões de guerra", correct: false }
    ]
  },
  {
    question: "O que é produzido no campo e consumido na cidade?",
    answers: [
      { text: "Computadores", correct: false },
      { text: "Energia elétrica", correct: false },
      { text: "Alimentos", correct: true },
      { text: "Ônibus", correct: false }
    ]
  },
  {
    question: "Qual destes alimentos geralmente vem do campo?",
    answers: [
      { text: "Arroz", correct: true },
      { text: "Celular", correct: false },
      { text: "Computador", correct: false },
      { text: "Televisão", correct: false }
    ]
  },
  {
    question: "Como a tecnologia ajuda os agricultores?",
    answers: [
      { text: "Melhorando a produção e o cuidado com as plantações", correct: true },
      { text: "Diminuindo a quantidade de alimentos", correct: false },
      { text: "Fazendo os agricultores pararem de trabalhar", correct: false },
      { text: "Impedindo o transporte de alimentos", correct: false }
    ]
  },
  {
    question: "O que acontece nas feiras que ligam o campo à cidade?",
    answers: [
      { text: "Vendem produtos frescos do campo para os moradores da cidade", correct: true },
      { text: "Só vendem roupas", correct: false },
      { text: "É um local de shows musicais", correct: false },
      { text: "É um lugar para dormir", correct: false }
    ]
  },
  {
    question: "Qual é a importância da agricultura para a cidade?",
    answers: [
      { text: "Fornecer alimentos para a população", correct: true },
      { text: "Construir prédios", correct: false },
      { text: "Criar carros", correct: false },
      { text: "Fazer shows", correct: false }
    ]
  }
];

const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = 'Próxima';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) score++;
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });
  nextButton.style.display = 'block';
}

function setStatusClass(element, correct) {
  element.style.backgroundColor = correct ? '#4caf50' : '#e57373';
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionEl.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
  nextButton.innerText = 'Jogar de novo';
  nextButton.style.display = 'block';
  nextButton.onclick = startGame;
}

startGame();
