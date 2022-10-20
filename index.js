const timeLeftDisplay = document.querySelector('time-left')
const DisplayScore = document.querySelector('#Score')
const resultDisplay = document.querySelector('#result')
const StartPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
let currentIndex = 78
const width = 9
let score = 0
let possitions = [80,79,78]
let BorderLeft = [0,9,18,27,36,45,54,63,72]
let BorderRight = [8,17,26,35,44,53,62,71,80]
let BorderBottom = [72,73,74,75,76,77,78,79,80]
let BorderTop = [0,1,2,3,4,5,6,7,8]
let direction = null

var refreshInterveal
var FoodPosition
var FoodCurrentPossition 

function Score(){
    
    if(currentIndex==FoodPosition){
        console.log("Score")
        PlaceFood()
        score++
        console.log(score,"score")
        DisplayScore.innerHTML = score;
        console.log(DisplayScore,"DisplayScore")
    }else{
        //
        possitions.shift()
    }
}

function PlaceFood(){
    console.log(squares[currentIndex].classList.remove('endingblock'))
    FoodPosition = Math.floor(Math.random() * 81)
    console.log(FoodPosition,"FoodPosition")
    if(possitions.includes(FoodPosition)){
        while(possitions.indexOf(FoodPosition)){
        FoodPosition = Math.floor(Math.random() * 81)
        squares[FoodPosition].classList.add('endingblock')
        FoodCurrentPossition = FoodPosition
        break
        }
    }else{
        squares[FoodPosition].classList.add('endingblock')
        FoodCurrentPossition = FoodPosition
    }
    
}PlaceFood()

function RunInterval(){
    clearInterval(refreshInterveal)
    refreshInterveal = setInterval(moveFrog, 700)
     
}

function StartPos(){
    for(x in possitions){
        squares[possitions[x]].classList.add('frog')
    }
    
}StartPos()

function moveSnake(e){
    switch(e.key){
        case 'ArrowLeft' :
            if(direction != 'right'){
                direction = 'left'
                console.log(refreshInterveal) 
                RunInterval()  
                
            }
            break
        case 'ArrowRight' :
            
            if(direction != 'left' ){
                direction = 'right'
                console.log(refreshInterveal)  
                RunInterval() 
                
            }
            break
        case 'ArrowUp' :
            
            if(direction != 'down'){
                direction = 'up'
                console.log(refreshInterveal)  
                RunInterval() 
                console.log(e.key,direction,"e.key,direction")
                console.log("idem hore")  
            }
            break
        case 'ArrowDown' :
            
            if(direction != 'up' ){
                direction = 'down'
                console.log(refreshInterveal) 
                RunInterval()  
                
            }
            break
        case 'Enter' :
            clearInterval(refreshInterveal)   
            break
        }  
       
}

document.addEventListener('keyup', moveSnake)

function moveFrog(){
    console.log(currentIndex,direction,"currentIndex")
    
    switch(direction){
        
        case 'left':
            if(BorderLeft.includes(currentIndex)){
                Colission()
                break;
            }
            currentIndex -=1       
            BuildSnake()
            break
            
        case 'right':
            if(BorderRight.includes(currentIndex)){
                Colission()  
                break;
            }
            currentIndex +=1
            BuildSnake()
            break
        case 'up' :
            if(BorderTop.includes(currentIndex)){
                Colission()
                break;
            }
            console.log('move Up')
            currentIndex -= width
            BuildSnake()
            break
            
        case 'down':
            if(BorderBottom.includes(currentIndex)){
                Colission()
                break;
            }
            currentIndex += width
            BuildSnake()
            break
        default:
            console.log('Nevybral som')
    }
    
     
}    

function BuildSnake(){
    if(squares[currentIndex].classList.contains('frog') && possitions.length > 3){
        Colission()
    }
    squares[currentIndex].classList.add('frog')
    possitions.push(currentIndex)
    squares[squares[possitions[0]].classList.remove('frog')]
    Score()
    
}
function Colission(){
    clearInterval(refreshInterveal) 
    const Alertdiv = document.createElement("div");
    const textnode = document.createTextNode("You have crashed. Your score is " + document.getElementById("Score").innerHTML+" points");
    Alertdiv.classList.add('test');
    Alertdiv.appendChild(textnode);
    document.body.appendChild(Alertdiv);

}