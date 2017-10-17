var destination =[]
var counter;


$(document).ready(function(){

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
