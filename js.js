const questions = [
            {
                question: "Choose the correct past tense form: Yesterday, she ___ to the market.",
                options: ["go", "goes", "went", "going"],
                answer: 2
            },
            {
                question: "Present tense question: He ___ football every Sunday.",
                options: ["play", "plays", "played", "playing"],
                answer: 1
            },
            {
                question: "Future tense completion: I ___ visit my grandmother tomorrow.",
                options: ["will", "shall", "am", "was"],
                answer: 0
            },
            {
                question: "Identify the error: 'She don’t like pizza.'",
                options: ["don’t → doesn’t", "like → likes", "pizza → pizzas", "She → Her"],
                answer: 0
            },
            {
                question: "Past tense irregular verb: They ___ a movie last night.",
                options: ["watch", "watched", "watches", "watching"],
                answer: 1
            },
            {
                question: "Present tense negative: She ___ not understand the question.",
                options: ["do", "does", "did", "will"],
                answer: 1
            },
            {
                question: "Future tense question: ___ you come to the party tomorrow?",
                options: ["Do", "Did", "Will", "Does"],
                answer: 2
            },
            {
                question: "Past perfect usage: By the time I arrived, she ___ already left.",
                options: ["has", "had", "have", "having"],
                answer: 1
            },
            {
                question: "Present continuous tense: Look! The children ___ in the garden.",
                options: ["play", "plays", "are playing", "were playing"],
                answer: 2
            },
            {
                question: "Future tense with 'going to': We ___ going to travel next month.",
                options: ["is", "are", "was", "be"],
                answer: 1
            },
            {
                question: "Past tense question: ___ you see the eclipse last night?",
                options: ["Do", "Did", "Does", "Will"],
                answer: 1
            },
            {
                question: "Present simple tense: My father ___ coffee every morning.",
                options: ["drink", "drinks", "drank", "drinking"],
                answer: 1
            },
            {
                question: "Future continuous tense: This time tomorrow, I ___ studying for the exam.",
                options: ["will be", "am", "was", "had been"],
                answer: 0
            },
            {
                question: "Past tense negative: She ___ go to school yesterday.",
                options: ["don’t", "doesn’t", "didn’t", "not"],
                answer: 2
            },
            {
                question: "Present perfect tense: I ___ finished my homework just now.",
                options: ["has", "have", "had", "having"],
                answer: 1
            }
        ];

        let currentIndex = 0;
        let score = 0;

        const questionNumberEl = document.getElementById('question-number');
        const questionTextEl = document.getElementById('question-text');
        const optionListEl = document.getElementById('option-list');
        const nextBtn = document.getElementById('next-btn');
        const progressFillEl = document.getElementById('progress-fill');
        const questionContainer = document.getElementById('question-container');
        const resultContainer = document.getElementById('result-container');

        function loadQuestion() {
            const current = questions[currentIndex];
            
            progressFillEl.style.width = ((currentIndex + 1) / questions.length * 100) + '%';
            
            questionNumberEl.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
            questionTextEl.innerText = current.question;

            optionListEl.innerHTML = '';
            current.options.forEach((opt, index) => {
                const letters = ['A', 'B', 'C', 'D'];
                const div = document.createElement('div');
                div.className = 'option';
                div.innerHTML = `
                    <input type="radio" name="quiz_option" id="option-${index}" value="${index}">
                    <label for="option-${index}">
                        <span class="letter">${letters[index]}</span>
                        ${opt}
                    </label>
                `;
                optionListEl.appendChild(div);

                document.getElementById(`option-${index}`).addEventListener('change', function() {
                    nextBtn.disabled = false;
                });
            });

            if (currentIndex === questions.length - 1) {
                nextBtn.innerText = 'Finish & View Score';
            } else {
                nextBtn.innerText = 'Next Question';
            }

            nextBtn.disabled = true;
        }

        function nextQuestion() {
            const selectedOption = document.querySelector('input[name="quiz_option"]:checked');
            
            if (!selectedOption) return;

            const answerIndex = parseInt(selectedOption.value);
            const correctAnswer = questions[currentIndex].answer;

            if (answerIndex === correctAnswer) {
                score++;
            }

            currentIndex++;

            if (currentIndex < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            questionContainer.style.display = 'none';
            resultContainer.style.display = 'block';

            const scoreEl = document.getElementById('result-score');
            const feedbackEl = document.getElementById('result-feedback');
            const iconEl = document.getElementById('result-icon');
            const titleEl = document.getElementById('result-title');

            scoreEl.innerText = `${score} / ${questions.length}`;

            const percentage = (score / questions.length) * 100;

            if (percentage === 100) {
                iconEl.innerText = '🏆';
                titleEl.innerText = 'Perfect!';
                feedbackEl.innerText = 'Your English is excellent! Keep it up! Grade: A+ 🎉';
            } else if (percentage >= 80) {
                iconEl.innerText = '🌟';
                titleEl.innerText = 'Very Good!';
                feedbackEl.innerText = 'Great job! You did well! Grade: B+ 👍';
            } else if (percentage >= 60) {
                iconEl.innerText = '👍';
                titleEl.innerText = 'Good!';
                feedbackEl.innerText = 'Good effort! Keep learning! Grade: C+ 📚';
            } else if (percentage >= 40) {
                iconEl.innerText = '💪';
                titleEl.innerText = 'Fair';
                feedbackEl.innerText = 'Keep studying! Don\'t give up! Grade: D+ 💪';
            } else {
                iconEl.innerText = '📖';
                titleEl.innerText = 'Keep Going!';
                feedbackEl.innerText = 'Don\'t give up! Try again! Grade: F+ 💕';
            }
        }
        loadQuestion();
