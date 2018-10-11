

var result =[];
var i;
var k;
var kombi;
var data_a;
var random;
var random_k=[];
var z=0;
var vorhanden=false;

function init () {
  console.log('Initialize our app');
  const btn = document.getElementById('btn_generieren');
  console.log(btn);
  btn.addEventListener('click', getData);
  }
  
function getData () {
  console.log('click funktioniert.');
  document.getElementById('btn_generieren').disabled = true;
  document.getElementById('btn_generieren').innerHTML="Bitte warten, das Generieren kann bis zu 2 Minuten dauern"
  fetch('https://api.opensensemap.org/boxes?classify=true')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById('btn_generieren').disabled = false;
      document.getElementById('btn_generieren').innerHTML="Quartett generieren"
      console.log(data);
      console.log(result);
      for(i=0;i<32;i++){
        random=Math.floor(Math.random()*data.length)
        for (let n = 0; n < random_k.length; n++) {
          if(random==random_k[n]){
            vorhanden=true;
          }          
        }
        z++
        if(
          data[random].name.length<10 
          && data[random].updatedAt!=undefined
          && date_to_aktualität(data[random].updatedAt)<365
          && data[random].image!=undefined
          && vorhanden==false
          ){
          result[i]=data[random];
          random_k[i]=random;
        }
        else{
          --i;
          vorhanden=false
        }
      }

      console.log(z);
      const template=document.getElementById('card-template')
      document.getElementById('card-template').style="visibility: visible;";
      for(k=0;k<32;k++){
         var card = template.cloneNode(true);
        card.setAttribute('id',`card${k}`)
        document.getElementById("name").innerHTML=result[k].name;

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
        document.getElementsByClassName("standort")[0].innerHTML=standort;
        document.getElementById("name1").innerHTML=result[k-x+1].name;
        document.getElementById("name2").innerHTML=result[k-x+2].name;
        document.getElementById("name3").innerHTML=result[k-x+3].name;
        document.getElementById("name4").innerHTML=result[k-x+4].name;
        document.getElementById("bild").src=`https://opensensemap.org/userimages/${result[k].image}`;
        document.getElementById("wert1").innerHTML='Anzahl der Sensoren='+result[k].sensors.length;
        document.getElementById("lon").innerHTML='Längengrad: '+result[k].currentLocation.coordinates[0];
        document.getElementById("lat").innerHTML='Breitengrad: '+result[k].currentLocation.coordinates[1];
        card = template.cloneNode(true);

        document.getElementById("rahmen").appendChild(card);
      } 
      document.getElementById('rahmen').removeChild(document.getElementById('card-template'));
    for (let m = 0; m < 32; m++) {
      fetch_city(m);
      fetch_temp(m);
      fetch_update(m);
    } 
  })
  .catch(function (err) {
    console.log(err);
  })
}
function fetch_city(m){
  fetch(`https:reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${result[m].currentLocation.coordinates[1]}%2C%20${result[m].currentLocation.coordinates[0]}&mode=retrieveAddresses&maxresults=1&additionaldata=IncludeShapeLevel%2CpostalCode&gen=9&app_id=I7ZRTYCEZr40KeU96rka&app_code=Wb0c_wHXkgs7-vltOZjScQ`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      if(data.Response.View[0].Result[0].Location.Address.City!=undefined){
      document.getElementsByClassName(`standort`)[m].innerHTML+=", "+data.Response.View[0].Result[0].Location.Address.City+", "+data.Response.View[0].Result[0].Location.Address.Country;
      }
      else{
        document.getElementsByClassName(`standort`)[m].innerHTML+=", "+data.Response.View[0].Result[0].Location.Address.Couty+", "+data.Response.View[0].Result[0].Location.Address.Country;
      }
    })

    .catch(function (err) {
      console.log(err);
    })
}    

function fetch_temp(m){
  var temperature_sensor=undefined;

  for (let o = 0; o < result[m].sensors.length; o++) {
    //console.log(result[m].sensors[o].title);
    if(result[m].sensors[o].title.includes("Temp",0)||
       result[m].sensors[o].title.includes("temp",0)
       ){
      temperature_sensor=result[m].sensors[o]._id;
    }
  }
  if(temperature_sensor!=undefined){
    fetch(`https://api.opensensemap.org/boxes/${result[m]._id}/data/${temperature_sensor}?format=json`)
      .then(function(response){
        return response.json();

      })
      .then(function(data){
        var h_temp=-1000;
        for (let p = 0; p < data.length; p++) {
          if(parseFloat(data[p].value)>h_temp){
            h_temp=parseFloat(data[p].value);
            
          }
        }
        
        if(h_temp===-1000){
          document.getElementsByClassName(`wert2`)[m].innerHTML="Höchste gemessene Temperatur: /";
        }
        else{
          h_temp=h_temp.toFixed(1);
          document.getElementsByClassName(`wert2`)[m].innerHTML="Höchste gemessene Temperatur: "+h_temp+"C°";
        }
      })

      .catch(function (err) {
        console.log(err);
      })
  }
}

function fetch_update(m){
  var tageges = 0.111;
  for (let q = 0; q < 30; q++) {
    var from= Date.now();
    from=from-(q+1)*86400000+7200000;
    var from_iso=new Date(from).toISOString();
    var to= Date.now();
    to=to-(q)*86400000+7200000;
    var to_iso=new Date(to).toISOString();
    var link=`https://api.opensensemap.org/boxes/${result[m]._id}/data/${result[m].sensors[0]._id}?from-date=${from_iso}&to-date=${to_iso}&format=json`
    fetch(`https://api.opensensemap.org/boxes/${result[m]._id}/data/${result[m].sensors[0]._id}?from-date=${from_iso}&to-date=${to_iso}&format=json`)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        tageges=tageges+data.length/1440
        if(q=31){
           tageges=Math.round(tageges);
          if(tageges>=1){
            document.getElementsByClassName(`wert3`)[m].innerHTML='Tage online in den letzten 30 Tagen:'+tageges;
          }
          else{
            document.getElementsByClassName(`wert3`)[m].innerHTML='Tage online in den letzten 30 Tagen: 0';
            var zul_on=Math.round(date_to_aktualität(result[m].updatedAt));
            document.getElementsByClassName(`wert4`)[m].innerHTML='Letztesmal online vor '+zul_on+' Tagen'
          }
        }

      })
      .catch(function (err) {
        console.log(err);
      })
  }
}    
      



function date_to_aktualität(pdate){
  // wiedergabewert= Zeit seit date in tagen
  var date=new Date(pdate.substring(0,4),
                    (pdate.substring(5,7)-1),
                    pdate.substring(8,10),
                    pdate.substring(11,13),
                    pdate.substring(14,16),
                    pdate.substring(17,19));
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
  