console.log('test')

const countdownDisplay = document.getElementById('countdown')
const resultDisplay = document.getElementById('result')
const userInput = document.getElementById('userInput')
const restartButton = document.getElementById('restart')

let intervalId

userInput.addEventListener('blur', () => {
	const number = +userInput.value

	if (!isValidNumber(number)) return userInput.classList.add('error')

	userInput.classList.remove('error')
	userInput.disabled = true
	startCountdown(number)
})

restartButton.addEventListener('click', () => {
	resetGame()
})

function resetGame() {
	clearInterval(intervalId)
	userInput.disabled = false
	countdownDisplay.innerText = ''
	resultDisplay.innerText = ''
	userInput.value = 0
}

function isValidNumber(number) {
	return !isNaN(number) && number >= 1 && number <= 3
}

function generateRandomNumber() {
	return Math.floor(Math.random() * 3) + 1
}

function startCountdown(number) {
	let countdown = 5

	intervalId = setInterval(() => {
		if (!countdown) {
			const randomNumber = generateRandomNumber()

			const hasWon = number === randomNumber

			displayResult(hasWon, number, randomNumber)
			clearInterval(intervalId)

			return
		}

		updateCountdownDisplay(--countdown)
	}, 1000)
}

function updateCountdownDisplay(countdown) {
	countdownDisplay.innerText = `Cuenta atrás: ${countdown} segundos`
}

function displayResult(hasWon, number, randomNumber) {
	msg = hasWon
		? `¡Has salvado el mundo! (tu número ${number} es el mismo que el número ${randomNumber})`
		: `La bomba ha estallado (tu número ${number} no es el mismo que el número ${randomNumber})`

	resultDisplay.innerText = msg
}
