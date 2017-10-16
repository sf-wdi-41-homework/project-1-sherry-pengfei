var destination =[]


$(document).ready(function(){

//print destination data base on #htmlTarget
   $.ajax({
     method: 'GET',
     url: '/destination',
     success: handleSuccess,
     error: handleError
   });



   function getDestination(destination){
     return `<hr>
             <div class="row">
             <div class="col-md-8 col-md-offset-2">
             <p>Location: ${desitnation.location}</p>
             <p>Date: ${destination.date}</p>
             <p>Budget: $${destination.budget}</p>
             <p>Plan: ${destination.plans}</p>
             </div>
             </div>`
   }

   function getDestinationHTML(destinations){
     return destinations.map(getDestination)
   }

   function reload(){
     $('#htmlTarget').empty();
     var printDestination = getDestinationHTML(destination);
     $('#htmlTarget').append(printDestination)
   }

  function handleSuccess(response){
    destination=response;
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
