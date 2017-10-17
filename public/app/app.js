$(document).ready(function(){
  console.log("sanity check");


function getData(){

  $.ajax({
    method: 'GET',
    url: '/api/serverData',
    success: handleSuccess,
    error: handleError
  });
}

function handleSuccess(response){
   let data = response;
   let output =``;
   for(var i =0; i<data.length; i++){
     let location = data[i].location;
     let budget = data[i].budget;
     let date = data[i].date;
     let author = data[i].author;
     output += `
          <div id= "outputHTML">
          <p><strong>Destination </strong>${i +1}</p>
          <hr>
          <p><strong>Author: </strong>${author}</p>
          <p><strong>Location: </strong>${location}</p>
          <p><strong>Butget: </strong>${budget}</p>
          <p><strong>Date: </strong>${date}</p>
          <p><strong>Plans: </strong></p>
     `;

     let plans = data[i].plans;
     for(var x=0; x<plans.length; x ++){
        var todo = plans[x];
        output +=`
          <p><strong>${x+1} </strong>${todo}</p>

        `;
     }
     output += `</div>`;

   }
   document.getElementById('htmlTarget').innerHTML = output;

 }

 function handleError(error){

   console.log(error);
 }









});
