size=8;
var m=0;
var chessBoard = [
  ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'],
  ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
  ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6'],
  ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5'],
  ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'],
  ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'],
  ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
  ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1']
];

var b=chessBoard;

window.onload=function(){
  //отрисовываем поле после загрузки страницы
  for (var i = 0; i <size; i++){
    for (var j = 0; j < size; j++) {
      var s=chessBoard[i][j]; 
      if(m%2===0)
      document.getElementById("game").innerHTML+=
      `<div class="block "   data-s="${s}" ></div>`;
      else document.getElementById("game").innerHTML+=
      `<div class="block Red"   data-s="${s}" ></div>`;  
      m++;
      
 
      
    }
    m++;
  }
  document.getElementById("game").onclick = function(e){
  //document.addEventListener("click",function(e){
   
   //очищаем доску 
   var qS = document.querySelectorAll(".block");
   for(var i=0;i<qS.length;i++){ 
      qS[i].classList.remove('Aqua');
      qS[i].classList.remove('Blue');
      }
    //выделяем кликнутую клетку, ищем возможные ходы   
    e.target.classList.add('Blue');
    var S = e.target.dataset.s;
    var IndexPosition = +(findCellByName(S));
    var X = ~~(IndexPosition/10);//(для себя) ~~ округление
    var Y = IndexPosition-X*10;
   
    var moves=findMoves(+X,+Y);
    var arrMoves = moves.split(' :');
  // перевели результат возможных ходов в массив и меняем цвета клеток
     for(var i=0; i<arrMoves.length; i++){
      var t = arrMoves[i];
      colorCells(t);
   } 
   document.getElementById("moves").childNodes[0].nodeValue="Allowable moves-"+moves;;
   //console.log(e.target.className);   
  //});
  }
}



// закрашивание клеток возможных ходов другим цветом
function colorCells(arr){
  
  var qS = document.querySelectorAll(".block");
  for(var i=0;i<qS.length;i++){ 
      var item=qS[i];
      if(qS[i].dataset.s==arr){ 
      item.classList.add("Aqua");
     }
  } 
}
// нахождение позиции клетки по её имени
function findCellByName(str){
  
  for(var i=0; i<8; i++)
     for(var j=0; j<8; j++){
       if(b[i][j]==str) return(String(i) + j);
     }
}
// проверка выхода за габариты доски
function checkRange(x){
  if(x>=0 && x<=7)
  return true;
  else return false
}
//Не смог придумать название для функции( выводит в строку возможные ходы 
// x,y - переданая позиция, i,j - количество клеток на которые надо сдвинуть текущую позицию
// и проверить не вышел ли результат за пределы доски )
function unnamed(x,y,i,j){
  var sum = "";
  if(checkRange(x+i)){
    if(checkRange(y+j)) sum+=" :"+b[x+i][y+j];
    if(checkRange(y-j)) sum+=" :"+b[x+i][y-j];
  }
  
  return sum; 
}
//нахождение всех возможных ходов из текущей позиции
function findMoves( x, y){
  var fullString = '';
  fullString+=unnamed(x,y,1,2);
  fullString+=unnamed(x,y,-1,2);
  fullString+=unnamed(x,y,2,1);
  fullString+=unnamed(x,y,-2,1);
  return fullString;
}