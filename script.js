const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const summaryButton = document.getElementById('summary-btn')
const questionContainerElement = document.getElementById('question-container');
const loading = document.getElementById('loading');
const resultsParagraph = document.getElementById('results')
const intro = document.getElementById('intro')
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

// initializing correctAnswers variable
let correctAnswers = 0

// initializing these variables as undefined
let shuffledQuestions, currentQuestionsIndex;

// Adding a listener, when clicked: +1 to currentQuestionIndex, calls setNextQuestion function
summaryButton.addEventListener('click', showResults)
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

// Pressing the START button begins the quiz, hides the startButton, shuffles the questions, sets currentQuestionIndex to 0 and calls 'setNextQuestion' function
function startGame() {
    startButton.classList.add('hide');
    intro.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionsIndex = 0;
    correctAnswers = 0;
    questionContainerElement.classList.remove('hide');
    answerButtonsElement.classList.remove('hide')
    resultsParagraph.classList.add('hide');
    setNextQuestion();
}

// Pressing NEXT button loads next question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}

// Sets the question text, taken from the questions array
function showQuestion(question) {
    loading.classList.remove('hide');
    questionElement.classList.add('hide')
    const questionImage = document.createElement('img')
    questionImage.setAttribute('id', 'question-img')
    questionImage.classList.add('hide')
    
    // adding an event listener so that the question info doesn't load until after the image. 
    questionImage.addEventListener('load', () => {

        // forced wait so we can see the spinner lol
        setTimeout(() => {
            loading.classList.add('hide');
            questionImage.classList.remove('hide')
            questionElement.classList.remove('hide')
            questionElement.innerText = question.question

            // This randomizes the position of the answers when displayed
            const randomizeAnswers = question.answers.sort(() => Math.random() - .5)

            randomizeAnswers.forEach(answer => {
                // Creates a new button element
                const button = document.createElement('button')
                button.innerText = answer.text
                button.classList.add('btn')
                if (answer.correct) {
                    button.dataset.correct = answer.correct
                }
                button.addEventListener('click', selectAnswer)
                answerButtonsElement.appendChild(button)
            })
        }, 1200) // wait time in ms
        
    })
    questionImage.src = question.imageURL
    questionContainerElement.prepend(questionImage) // adds the question image
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    // Removes the image element to allow for a clean load
    const questionContainerElementImage = questionContainerElement.querySelector('#question-img')
     if (questionContainerElementImage) {
        questionContainerElement.removeChild(questionContainerElementImage)
    }
    // `.firstChild` will only return if there is a child element to return. So when all the buttons are gone, the loop will exit.
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// Pressing an ANSWER button selects and answer, displays result
function selectAnswer(event) {
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        correctAnswers++
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        summaryButton.classList.remove('hide')
    }
}

function showResults() {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    resultsParagraph.innerText = `You got ${ correctAnswers } out of ${questions.length}!` //Template literal!!
    resultsParagraph.classList.remove('hide')
    summaryButton.classList.add('hide')
    questionElement.classList.add('hide')
    answerButtonsElement.classList.add('hide')
    const questionContainerElementImage = questionContainerElement.querySelector('#question-img')
    questionContainerElementImage.classList.add('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    element.setAttribute('disabled', true)

    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//Array of questions, containing an array of answers
const questions = [
    {
        imageURL: 'elbrus_mountain.jpg',
        question: 'Which is the tallest mountain in Europe?',
        answers: [
            { text: 'Mt. Elbrus', correct: true },
            { text: 'Mont Blanc', correct: false },
            { text: 'Ben Nevis', correct: false },
            { text: 'Matterhorn', correct: false }
        ]
    },
    {
        imageURL: 'paris_seine.jpg',
        question: 'What is the name of the largest river to flow through Paris?',
        answers: [
            { text: 'The Seine', correct: true },
            { text: 'The Danube', correct: false },
            { text: 'The Bièvre', correct: false },
            { text: 'The Rhine', correct: false }
        ]
    },
    {
        imageURL: 'canada_coastline.jpg',
        question: 'Which country has the longest coastline?',
        answers: [
            { text: 'Canada', correct: true },
            { text: 'Russia', correct: false },
            { text: 'Australia', correct: false },
            { text: 'Chile', correct: false }
        ]
    },
    {
        imageURL: 'atomium.jpg',
        question: 'In which European country can you find the Atomium?',
        answers: [
            { text: 'Belgium', correct: true },
            { text: 'Germany', correct: false },
            { text: 'Austria', correct: false },
            { text: 'Luxembourg', correct: false }
        ]
    },
    {
        imageURL: 'greek_islands.jpg',
        question: 'How many inhabited islands are in Greece?',
        answers: [
            { text: '227', correct: true },
            { text: '108', correct: false },
            { text: '313', correct: false },
            { text: '1', correct: false },
        ]
    }
]
