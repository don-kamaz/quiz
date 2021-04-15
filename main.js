/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* All our answer options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //  сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), //  номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //  кол-во всех вопросов

let indexOfQuestion,  //  индекс текущего вопроса
    indexOfPage = 0;  //  индекс текущей страницы

const answersTracker = document.getElementById('answers-tracker');  //  обёртка для трекера
const btnNext = document.getElementById('btn-next');  //  кнопка далее

let score = 0;  //  итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),  //  кол-во правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),  //  кол-во всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); //  кнопка "начать викторину заново"

const questions = [
  {
        question: 'Как в JavaScript вычислять процент от числа ?',
        options: [
          'Так в javaScript нельзя делать',
          'Оператор : %',
          'Умножить на кол-во процентов и разделить на 100',
          'вызвать метод FinePrecent()',
        ],
        rightAnswer: 2
  },
  {
        question: 'Результат выражения: "13" и 7',
        options: [
          '20',
          '137',
          'undefined',
          'error'
        ],
        rightAnswer: 1
  },
  {
        question: 'на JavaScript нельзя писать: ',
        options: [
          'Игры',
          'Скрипты для сайтов',
          'Десктопные приложения',
          'Плохо'
        ],
        rightAnswer: 3
  },
  {
    question: 'Кайман — это ...',
    options: [
      'вид крокодила',
      'маленький шустрый зверёк',
      'большая ночная бабочка',
      'Ласточка'
    ],
    rightAnswer: 0
  },
  {
    question: 'Что получится если смешать уксус с содой?',
    options: [
      'Маленький взрыв',
      'Жидкость голубого цвет',
      'Шипучка',
      'Пластелин'
    ],
    rightAnswer: 2
  },
  {
    question: 'Каким газом наполняют воздушные шарики?',
    options: [
      'Водородом',
      'Гелием',
      'Пропаном',
      'Углекислым газомом'
    ],
    rightAnswer: 1
  },
  {
    question: 'Герой какой сказки летал на воздушных шариках и приземлился в большой торт?',
    options: [
      '«Три толстяка»',
      '«Золотой ключик или приключение Буратино»',
      '«Королевство кривых зеркал»',
      'Дети капитаеа Гранта'
    ],
    rightAnswer: 0
  },
  {
    question: 'Какая из птиц не умеет летать и даже не имеет крыльев?',
    options: [
      'Пингвин',
      'Киви',
      'Страус',
      'Ласточка'
      ],
    rightAnswer: 1
  }
];

numberOfAllQuestions.innerHTML = questions.length  //  выводим кол-во вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question  //  сам вопрос

  //  майпим ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1;  //  устанавливает номер текущей страницы
  indexOfPage++;  //  увеличение индекса страницы
};

let completedAnswers = []  //  массив для уже заданнх вопросов

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;  //  якорь для проверки одинаковых вопросов
  
  if(indexOfPage == questions.length) {
    quizOver()
  } else {
    if(completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if(item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if(hitDuplicate) {
        randomQuestion();
      } else {
          indexOfQuestion = randomNumber;
          load();
      }
    }
    if(completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = element => {
  if(element.target.dataset.id == questions[indexOfQuestion].rightAnswer) { //  сравнил свойства для написания логики
    element.target.classList.add('correct');  //  подсвечиваем зелёным
    updateAnswerTracker('correct');
    score++;  //  увеличиваем значение на единицу
  } else {
    element.target.classList.add('wrong');  //  подсвечиваем красным
    updateAnswerTracker('wrong');
  }
  disabledOptions();
}

for(option of optionElements) {
  option.addEventListener('click', evt => checkAnswer(evt));
}

//  дисейблед все варианты ответов + показывает правильный ответ (два в одном)
const disabledOptions = () => {
  optionElements.forEach(item => {  // проходимся по всем элементам option
    item.classList.add('disabled');
    if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  })
}

//  удление всех классов со всех ответов
const enableOptions = () => {
  optionElements.forEach(item => {                  //  зачищаем
    item.classList.remove('disabled', 'correct', 'wrong');
  })
}

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  })
}

const updateAnswerTracker = status => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
  if(!optionElements[0].classList.contains('disabled')) {
    alert('Вам нужно выбрать один из вариантов ответа');
  } else {
    randomQuestion();
    enableOptions();
  }
}

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
}

btnNext.addEventListener('click', () => {
  validate();
})

window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
})