const url = "json/Questoes.json";
let element = document.getElementById("time")
let correct, qtdQuestoes = 0, i = 0, time = 0, doubleClick= 0, pointsMarked = 0;
let listButtons = [];
let correctElement = ""

function question(i) {
    fetch(url).then(response => {return response.json();
    }).then(data => {  
        qtdQuestoes = data.questoes.length  
        buildarQuestion(data.questoes, i)
    })
}

function buildarQuestion(dados, i) {
    let a = document.getElementById('A');
    let b = document.getElementById('B');
    let c = document.getElementById('C');
    let d = document.getElementById('D');
    let Pergunta = document.getElementById('pergunta');
    let questions = document.getElementById("questions")

    points(0);
    time = 20;
    element.innerHTML = time;
    a.innerHTML = dados[i].A;
    b.innerHTML = dados[i].B;
    c.innerHTML = dados[i].C;
    d.innerHTML = dados[i].D;
    Pergunta.innerHTML = dados[i].pergunta;
    correct = dados[i].correta  ;
    correctElement = document.getElementById(correct)
    questions.innerHTML = (i+1) + " de " + qtdQuestoes;
} 

function markedAlternative(markedResponse, elementButton) {
    doubleClick++
    listButtons.push(elementButton);
    if(doubleClick%2==0){
        listButtons.push(correctElement)
        clearColorButton(listButtons)
        if (qtdQuestoes - 1 > i) i++
        else fimDeJogo()        
    }else{verificarVitoria(markedResponse,elementButton)}
    question(i)
}

function verificarVitoria(markedResponse, elementButton){  
    let soundCorrect = document.getElementById("correct")
    let soundWrong = document.getElementById("wrong")
    if(correct == markedResponse){soundCorrect.play()
        points(10)
    }else{soundWrong.play()
        elementButton.style.backgroundColor = '#8C030E';
        elementButton.style.color = '#FAF8EF';
    }
    correctElement.style.backgroundColor = '#3B7302';
    correctElement.style.color = '#FAF8EF';
}

function points(value){
    let pointsDiv = document.getElementById("points")
    pointsMarked += value;
    pointsDiv.innerHTML = pointsMarked;
}

function clearColorButton(list){
    for(x in list){
        list[x].style.backgroundColor = '#6E6D65';
        list[x].style.color = '#FAF8EF';
    }
}

function startTime(seconds, element){
    setInterval(function(){
        if(doubleClick % 2 == 0 ){
            time = time == 0 ? seconds : time;
            timer()
        }
    },900);
}

function timer(){
    element.innerHTML = time
    time--;
    if(time == 0){i++          
        question(i)
    }  
    if(i == qtdQuestoes) fimDeJogo()
}

window.onload = function(){
    if(window.location == "http://127.0.0.1:5500/home.html"){ 
        startTime(20,element)
        question(i)
    }else if(window.location.href.includes("points")){getValueLink(window.location.href)}
}

function getValueLink(link){
    let linkSeparete = link.split("=")[1]
    alert("Sua pontuação foi: "+linkSeparete+"/100")
}

function fimDeJogo() {window.location.href=("tFinal.html?points="+pointsMarked)}
