

var result =[];
var i;
var k=12;
var kombi;
var data_a


function init () {
    console.log('Initialize our app');
    const btn = document.getElementById('btn_generieren');
    console.log(btn);
    btn.addEventListener('click', getData);
  

  }
  
  function getData () {
    console.log('click funktioniert.');
    fetch('https://api.opensensemap.org/boxes?classify=true')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(result);
        const card = document.getElementById('card-template');
        for(i=0;i<32;i++){
          result[i]=data[Math.floor(Math.random()*data.length)];
        }
          document.getElementById("name").innerHTML=result[k].name;

          var x=(k%4)+1;
          switch(k){
            case 0:
            case 1:
            case 2:
            case 3:
              kombi='A'+x;
            break;
            case 4:
            case 5:
            case 6:
            case 7:
              kombi='B'+x;
            break;
            case 8:
            case 9:
            case 10:
            case 11:
              kombi='C'+x;
            break;
            case 12:
            case 13:
            case 14:
            case 15:
              kombi='D'+x;
            break;
            case 16:
            case 17:
            case 18:
            case 19:
              kombi='E'+x;
            break;
            case 20:
            case 21:
            case 22:
            case 23:
              kombi='F'+x;
            break;
            case 24:
            case 25:
            case 26:
            case 27:
              kombi='G'+x;
            break;
            case 28:
            case 29:
            case 30:
            case 31:
              kombi='H'+x;
            break;
          }
          document.getElementById("kombi").innerHTML=kombi;
          var standort=result[k].exposure
          switch(standort){
            case 'outdoor':
              standort='Draussen';
            break;
            case 'mobile':
              standort='Mobil';
            break;
            case 'indoor':
              standort='Drinnen';
            break;
          }
          document.getElementById("standort").innerHTML=standort;
          //TODO stadt
          document.getElementById("name1").innerHTML=result[k-x+1].name;
          document.getElementById("name2").innerHTML=result[k-x+2].name;
          document.getElementById("name3").innerHTML=result[k-x+3].name;
          document.getElementById("name4").innerHTML=result[k-x+4].name;

          document.getElementById("wert1").innerHTML='Anzahl der Sensoren='+result[k].sensors.length;


          // var updatedAt=new Date(result[k].updatedAt.substring(0,4),
          //                       (result[k].updatedAt.substring(5,7)-1),
          //                       result[k].updatedAt.substring(8,10),
          //                       result[k].updatedAt.substring(11,13),
          //                       result[k].updatedAt.substring(14,16),
          //                       result[k].updatedAt.substring(17,19)
          //                       )
          // var jetzt=new Date();
          // var aktualität=(jetzt-updatedAt)/3600000;
          // if (aktualität<24){
          //   document.getElementById("wert2").innerHTML='Stunden seit der letzten Aktualisierung: '+Math.floor(aktualität);
           
          // }
          // else if(aktualität<8760){
          //   aktualität=aktualität/24;
          //   document.getElementById("wert2").innerHTML='Tage seit der letzten Aktualisierung: '+Math.floor(aktualität);
          // }
          // else {
          //   aktualität=aktualität/8760;
          //   document.getElementById("wert2").innerHTML='Jahre seit der letzten Aktualisierung: '+Math.round(aktualität);
          // }

          
          
          console.log(jetzt);
          console.log(updatedAt);
          console.log(aktualität);
        })
      
        
    
  
  
        
      
    .catch(function (err) {
        console.log(err);
      })
  
  }

  
  document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded');
    init();
  });