
const correctLetters = document.getElementById('correct-letters')
const wrongLetters = document.getElementById('wrong-letters')

async function handleClick() {
    const positioned = [
        document.getElementById("positioned-0").value,
        document.getElementById("positioned-1").value,
        document.getElementById("positioned-2").value,
        document.getElementById("positioned-3").value,
        document.getElementById("positioned-4").value
    ]


    console.log(positioned)
    const lettersObj = { correct: correctLetters.value, wrong: wrongLetters.value, positioned: positioned }
    
    if (hasDuplicates(lettersObj)){
        return
    }
 
    $('.letters-area__error').text("")

    axios.post('http://localhost:3000/api/checkWords', lettersObj)
        .then(res => renderWords(res.data))
        .catch(err => console.log(err))
}

function hasDuplicates(letters) {
    let duplicatedLetters = []

    letters.correct.split(',').map(e => {
        if (letters.wrong.split(',').some(letter => letter === e)) {
            duplicatedLetters.push(e)
        }
    })

    if (duplicatedLetters.length > 0) {
        console.log('duplicates: ' +duplicatedLetters)
        $('.letters-area__error').text(`ERRO: As seguintes letras foram inseridas em ambos os campos: ${duplicatedLetters.join(", ")}`)
        return true
    }

    return false
}

function separateLetters() {
    const regex = /([A-z])/g
    correctLetters.value = correctLetters.value.match(regex).join()
    wrongLetters.value = wrongLetters.value.match(regex).join()

}

function clearFields() {
    correctLetters.value = ""
    wrongLetters.value = ""

}

function renderWords(wordsObj){
    $('.result-area__list').text("")
    $('.suggested-words').text("")
    console.log(wordsObj)

    $('.result-area__counter').text(wordsObj.counter+" palavras encontradas")
    wordsObj.possible.map(e => {
        $('.result-area__list').append(`<div class='result-area__item'>${e}</div>`)
    })

    if(wordsObj.suggested.length>0)
        $('.suggested-words').append(`<p>Essas palavras contêm letras ainda não utilizadas: <span>${wordsObj.suggested.join(', ')}</span></p>`)

 
}