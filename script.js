const Gameboard=function(){
    let gameboard=["","","","","","","","",""];

    const getBox=(index)=>gameboard[index];

    const updateBox=function(index,mark){
        gameboard[index]=mark;
    }
    

    const clear=function(){
        for(let i=0;i<gameboard.length;i++){
            gameboard[i]="";
        }
        
    }
    return {gameboard,clear,getBox,updateBox};
}();

const DisplayController=function(){
        let boxes=document.querySelectorAll(".box");
        boxes.forEach(function(box){
            box.addEventListener("click",function(e){
                let index=e.target.dataset.key;
                if(e.target.textContent!=""||Game.getGameOver()==true){
                    return;
                }
                Game.click(index);
                updateBoard();

            })
        })

        let restart=document.getElementById("restart");

        restart.addEventListener("click",function(){
            Game.restartGame();
        })

        let result=document.querySelector(".result");

        const setMessage=function(message){
            result.textContent=message;
        }
        
        const updateBoard=function(){
            for(let i=0;i<boxes.length;i++){
                boxes[i].textContent=Gameboard.getBox(i);
            }
        }
    return{updateBoard,setMessage}
}();

const Player=function(number){
    
    let mark;
    let player_number=number;
    if(player_number==1){
        mark="X";
    }
    else{
        mark="O";
    }
    

   const getMark=function(){
        return mark;
   }
    return {getMark,player_number};
}

const Game=function(){
    let player1=Player(1);
    let player2=Player(2);
    let currentPlayer=1;
    let round=1;
    let gameOver=false;
    
    const restartGame=function(){
        currentPlayer=1;
        round=1;
        document.querySelector(".result").textContent="Player X Turn";
        Gameboard.clear();
        DisplayController.updateBoard();
        gameOver=false;

    }
    const getGameOver=function(){
        return gameOver;
    }
    
    const endGame=function(mark){
        if(mark=="draw"){
            DisplayController.setMessage("Draw");
            gameOver=true;
        }
        else if(mark=="X"||mark=="O"){
            DisplayController.setMessage("Player "+mark+" won!");
            gameOver=true;
        }
        else{
            console.log("end game error");
        }
    }
    const click=function(index){

        if(Gameboard.getBox(index)==""){
            if(currentPlayer==1){
                mark="X"
            }
            else if(currentPlayer==2){
                mark="O"
            }
            
            Gameboard.updateBox(index,mark);
            
            var win_mark=checkWon();
            if(win_mark!=null||win_mark=="draw"){
                endGame(win_mark);
                return;
            }
            round++;
            if(currentPlayer==1){
                currentPlayer=2;
                mark="O"
            }
            else if(currentPlayer==2){
                currentPlayer=1;
                mark="X"
            }
            var message="Player "+mark+" Turn";
            DisplayController.setMessage(message);
        }
       
    }
    


    const checkWon=function(){
        
        if(Gameboard.getBox(0)==Gameboard.getBox(1) && Gameboard.getBox(0)==Gameboard.getBox(2)&&Gameboard.getBox(0)!=""){
            return Gameboard.getBox(0);
        }
        else if(Gameboard.getBox(3)==Gameboard.getBox(4)&&Gameboard.getBox(3)==Gameboard.getBox(5)&&Gameboard.getBox(3)!=""){
          return Gameboard.getBox(3);  
        }
        else if (Gameboard.getBox(6)==Gameboard.getBox(7)&&Gameboard.getBox(6)==Gameboard.getBox(8)&&Gameboard.getBox(8)!=""){
            return Gameboard.getBox(6);
        }
        else if(Gameboard.getBox(0)==Gameboard.getBox(3)&&Gameboard.getBox(0)==Gameboard.getBox(6)&&Gameboard.getBox(0)!=""){
            return Gameboard.getBox(0);
        }
        else if(Gameboard.getBox(1)==Gameboard.getBox(4)&&Gameboard.getBox(1)==Gameboard.getBox(7)&&Gameboard.getBox(1)!=""){
            return Gameboard.getBox(1);
        }
        else if(Gameboard.getBox(2)==Gameboard.getBox(5)&&Gameboard.getBox(2)==Gameboard.getBox(8)&&Gameboard.getBox(2)!=""){
            return Gameboard.getBox(2)[2];
        }
        else if(Gameboard.getBox(0)==Gameboard.getBox(4)&&Gameboard.getBox(4)==Gameboard.getBox(8)&&Gameboard.getBox(0)!=""){
            return Gameboard.getBox(0)[0];
        }
        else if(Gameboard.getBox(2)==Gameboard.getBox(4)&&Gameboard.getBox(2)==Gameboard.getBox(6)&&Gameboard.getBox(2)!=""){
            return Gameboard.getBox(2)[2];
        }
        else if(Gameboard.getBox(0)!=""&&Gameboard.getBox(1)!=""&&Gameboard.getBox(2)!=""&&Gameboard.getBox(3)!=""&&Gameboard.getBox(4)!=""
                &&Gameboard.getBox(5)!=""&&Gameboard.getBox(6)!=""&&Gameboard.getBox(7)!=""&&Gameboard.getBox(8)!=""){
            return "draw";
        }
        else{
            return null;
        }
        
    }
    return {click,currentPlayer,restartGame,getGameOver}

}();

