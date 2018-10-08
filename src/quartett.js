

var result =[];
var i;
var k;
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
    document.getElementById('btn_generieren').disabled = true;
    fetch('https://api.opensensemap.org/boxes?classify=true')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        document.getElementById('btn_generieren').disabled = false;
        console.log(data);
        console.log(result);
        for(i=0;i<32;i++){
          result[i]=data[Math.floor(Math.random()*data.length)];
        }
        const template=document.getElementById('card-template')
        for(k=0;k<32;k++){
          var card = template.cloneNode(true);
          card.setAttribute('id', `card${k}`);
          document.getElementById("name").innerHTML=result[k].name;
          //TODO name_short anwenden???

          var x=(k%4)+1;
          switch(Math.floor(k/4)){
            case 0:
              kombi='A'+x;
            break;
            case 1:
              kombi='B'+x;
            break;
            case 2:
              kombi='C'+x;
            break;
            case 3:
              kombi='D'+x;
            break;
            case 4:
              kombi='E'+x;
            break;
            case 5:
              kombi='F'+x;
            break;
            case 6:
              kombi='G'+x;
            break;
            case 7:
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
          document.getElementById("name1").innerHTML=name_short(result[k-x+1].name);
          document.getElementById("name2").innerHTML=name_short(result[k-x+2].name);
          document.getElementById("name3").innerHTML=name_short(result[k-x+3].name);
          document.getElementById("name4").innerHTML=name_short(result[k-x+4].name);

          document.getElementById("wert1").innerHTML='Anzahl der Sensoren='+result[k].sensors.length;
          document.getElementById("rahmen").appendChild(card);
          
          //let cardnew = document.createElement('div');
          //cardnew.appendChild(card);
          // switch(Math.floor(k/4)){
          //   case 0:
          //  document.getElementById("con1").appendChild(card);
          //   break;
          //   case 1:
          //   document.getElementById("con2").appendChild(card);
          //   break;
          //   case 2:
          //   document.getElementById("con3").appendChild(card);
          //   break;
          //   case 3:
          //   document.getElementById("con4").appendChild(card);
          //   break;
          //   case 4:
          //   document.getElementById("con5").appendChild(card);
          //   break;
          //   case 5:
          //   document.getElementById("con6").appendChild(card);
          //   break;
          //   case 6:
          //   document.getElementById("con7").appendChild(card);
          //   break;
          //   case 7:
          //   document.getElementById("con8").appendChild(card);
          //   break;
          // }
          
          


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

            
        
        }

    })
          
        
      .catch(function (err) {
          console.log(err);
        })
      
  }
  function name_short(pname){
    var trenn_zeichen=Math.min(sort_out_neg(pname.indexOf("-",2)),
                               sort_out_neg(pname.indexOf("_",2)),
                               sort_out_neg(pname.indexOf(" ",2)),
                               sort_out_neg(pname.indexOf(".",2)),
                               sort_out_neg(pname.indexOf(":",2)),
                               sort_out_neg(pname.indexOf(",",2)),
                               sort_out_neg(pname.indexOf(";",2)));
    if(pname.length>8 && trenn_zeichen!=-1){
      pname=pname.substring(0,trenn_zeichen);
      if(pname.length>8){
        pname=pname.substring(0,8);
      }
    }
    return pname;
  }

  function sort_out_neg(pnumber){
    if(pnumber<0){
      return 1000;
    }
    else{
      return pnumber;
    }
  }

  
  document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded');
    init();
  });