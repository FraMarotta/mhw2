/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const userAnswers = {}; //memorizzo id delle risposte dell'utente
//vocabulary
// es. userAnswers[one]=happy;  uA[questioId]=choiceId

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
    box.addEventListener('click', onBoxClick);
}

function resetQuiz(){
    for (const key in userAnswers) {
        delete userAnswers[key];
    }
    console.log(userAnswers); //debug
    const notShow = document.querySelector('#result');
    notShow.classList.add('hidden');
    for (const box of boxes) {
        box.classList.remove('opacity');
        box.classList.remove('selected');
        box.addEventListener('click', onBoxClick);
        box.querySelector('.checkbox').src = "images/unchecked.png";
    }

}
function chooseResult(){
    if(userAnswers.one === userAnswers.two || userAnswers.one === userAnswers.three)
        return userAnswers.one;
    if(userAnswers.two === userAnswers.one || userAnswers.two === userAnswers.three)
        return userAnswers.two;
    if(userAnswers.three === userAnswers.one || userAnswers.three === userAnswers.two)
        return userAnswers.three;
    return userAnswers.one;
}

function showResult(key){
    console.log(RESULTS_MAP[key]); //debug
    const show = document.querySelector('#result');
    show.querySelector('h1').textContent = RESULTS_MAP[key].title;
    show.querySelector('p').textContent = RESULTS_MAP[key].contents;
    show.classList.remove('hidden');
    const button = document.querySelector('#button');
    button.addEventListener('click',resetQuiz);
}

function opacity(selected){
    //devo opacizzare tutte tranne la selezionata, uso gli id già forniti
    const userAnswerId = selected.dataset.choiceId;
    //ottengo la lista dei div
    const answers = selected.parentNode.querySelectorAll('div');
    for (const ans of answers) {
        if(ans.dataset.choiceId !== userAnswerId){
            ans.classList.add('opacity');
            ans.querySelector('.checkbox').src = "images/unchecked.png";
            ans.classList.remove('selected');
        }
    }
}

function onBoxClick(event){
    console.log("selezionato"); //debug
    const box = event.currentTarget;
    // inserisco checkbox
    box.querySelector('.checkbox').src = "images/checked.png";
    //abilito lo stile selected
    box.classList.add('selected');
    //disabilito lo stile opaco se c'era stata una scelta precedente
    box.classList.remove('opacity');
    opacity(box);
    //memorizzo la risposta dell'utente nella mappa
    userAnswers[box.dataset.questionId] = box.dataset.choiceId;
    console.log(userAnswers) //debug
    //disabilito la possibilità di premere se ho scelto tutto e mostro il risultato
    if(userAnswers.one && userAnswers.two && userAnswers.three){
        for (const box of boxes) {
            box.removeEventListener('click',onBoxClick);
        }
        console.log('Finito selezione'); //debug
        showResult(chooseResult());
    }
}