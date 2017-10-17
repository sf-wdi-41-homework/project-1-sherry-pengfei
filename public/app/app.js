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


  $('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

//print destination data base on #htmlTarget
   $.ajax({
     method: 'GET',
     url: '/destination',
     success: handleSuccess,
     error: handleError
   });



   function getDestination(destination){
     var renderedHTML = '';
     console.log(destination);
     renderedHTML += `<hr>
             <div class="row">
             <div class="col-md-6 col-md-offset-3 location">
             <div class="col-md-10">
             <p>Location: ${destination.location}</p>
             <p>Date: ${destination.date}</p>
             <p>Budget: $ ${destination.budget}</p>
             <p>Plans:</p>
             <ul>`
     for(var i = 0; i<destination.plans.length; i++){
       var todo = destination.plans[i];
       renderedHTML += `<li>${todo}</li>`

      }
      renderedHTML +=
      `</ul>
      </div>
      <div class="col-md-2">
      <button type="button" class="deleteBtn btn btn-danger" data-id=${destination._id}>Delete</button>
      </div>
      </div>
      </div>`
     return renderedHTML;
   }

   function getDestinationHTML(destination){
     return destination.map(getDestination)
   }


   $("#htmlTarget").on("click", ".deleteBtn", function(event){
     $.ajax({
       method: "DELETE",
       url: '/destination/'+$(this).attr('data-id'),
       success: function deleteLocation(json){
         console.log(json);
         for(var i= 0; i<destination.length; i++){
           if(destination[i]._id === json._id){
           destination.splice(i,1);
           break;};
         }
         reload();
       },
       error: function(a,b,c){
         console.log(a,b,c)
       }
     })
   })

   $("#createTrip").on("submit", function(event){
     event.preventDefault();
     alert("BANG")
     console.log($(this).serialize());
     $.ajax({
       method: "POST",
       url: '/destination',
       data: $(this).serialize(),
       success: function create(json){
         destination.push(json);
         $("#createTrip input").val("");
         reload();
       },
       error: function(a,b,c){console.log(a,b,c)}
     })
   })


   function reload(){
     $('#htmlTarget').empty();
     $('#htmlTarget').append(getDestinationHTML(destination))
   }

  function handleSuccess(response){
    destination=response;
    console.log(destination);
    reload();
  }

  function handleError(error){

    console.log(error);
  }

   $("#newTravelForm").on('submit', function(event){
     event.preventDefault;
     $.ajax({
       method: 'POST',
       url: ''
     })
   })
});
