
const correctLetters = document.getElementById('correct-letters')
const wrongLetters = document.getElementById('wrong-letters')


async function handleClick() {

    const lettersObj = { correct: correctLetters.value, wrong: wrongLetters.value }
    
    if (hasDuplicates(lettersObj)){
        return
    }
 
    axios.post('http://localhost:3000/api/checkWords', lettersObj)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

    console.log(correctLetters.value, wrongLetters.value)

    /*
    const teste = await axios.get('http://localhost:3000/teste')
        .then(res => res.data)
        
    
    console.log(teste)
    */
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