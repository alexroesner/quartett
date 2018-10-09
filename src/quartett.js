

var result =[];
var i;
var k;
var kombi;
var data_a;
var random;
var z=0;

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
        random=Math.floor(Math.random()*data.length)
        z++
        if(
          data[random].name.length<10 
          && data[random].updatedAt!=undefined
          && date_to_aktualität(data[random].updatedAt)<365
          && data[random].image!=undefined
          ){
        result[i]=data[random];
        }
        else{
          --i;
        }
      }
      
      console.log(z);
      const template=document.getElementById('card-template')
      for(k=0;k<31;k++){
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
        console.log(result[k].currentLocation.coordinates[0]);
        console.log(result[k].currentLocation.coordinates[1]);
        console.log(result[k].currentLocation.coordinates[2]);
        document.getElementById("bild").src=`https://opensensemap.org/userimages/${result[k].image}`;
        document.getElementById("wert1").innerHTML='Anzahl der Sensoren='+result[k].sensors.length;
        document.getElementById("rahmen").appendChild(card);
                

      
  
     fetch(
    `https:reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${result[k].currentLocation.coordinates[0]}%2C%20${result[k].currentLocation.coordinates[1]}&mode=retrieveAddresses&maxresults=1&additionaldata=IncludeShapeLevel%2CpostalCode&gen=9&app_id=I7ZRTYCEZr40KeU96rka&app_code=Wb0c_wHXkgs7-vltOZjScQ`
     )
      .then(function(response){
       return response.json();
      })
      .then(function(data){
        console.log(data); 
        console.log(result[k]);
        console.log(result[k].currentLocation.coordinates[0]);
        console.log(result[k].currentLocation.coordinates[1]);
      })
      .catch(function (err) {
      console.log(err);
      })
     
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

  function date_to_aktualität(pdate){
    // wiedergabewert= Zeit seit date in tagen
    var date=new Date(pdate.substring(0,4),
                      (pdate.substring(5,7)-1),
                      pdate.substring(8,10),
                      pdate.substring(11,13),
                      pdate.substring(14,16),
                      pdate.substring(17,19)
                      );
          var jetzt=new Date();
          var aktualität=(jetzt-date)/86400000;
          return aktualität;
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
  // developerhere
  // ifgi2018_ar
// App ID
// I7ZRTYCEZr40KeU96rka
// App Code
// Wb0c_wHXkgs7-vltOZjScQ
//´https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${}%2C%207.595924&mode=retrieveAddresses&maxresults=1&additionaldata=IncludeShapeLevel%2CpostalCode&gen=9&app_id=I7ZRTYCEZr40KeU96rka&app_code=Wb0c_wHXkgs7-vltOZjScQ`
  