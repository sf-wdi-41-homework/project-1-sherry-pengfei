$(document).ready(function(){
  console.log("sanity check");

  var destination=[];

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



   // function getDestination(destination){
   //   var renderedHTML = '';
   //   console.log(destination);
   //   renderedHTML += `<hr>
   //           <div class="row">
   //           <div class="col-md-6 col-md-offset-3 location">
   //           <div class="col-md-10">
   //           <p>Location: ${destination.location}</p>
   //           <p>Date: ${destination.date}</p>
   //           <p>Budget: $ ${destination.budget}</p>
   //           <p>Plans:</p>
   //           <ul>`
   //   for(var i = 0; i<destination.plans.length; i++){
   //     var todo = destination.plans[i];
   //     renderedHTML += `<li>${todo}</li>`

   //    }
   //    renderedHTML +=
   //    `</ul>
   //    </div>
   //    <div class="col-md-2">
   //    <button type="button" class="deleteBtn btn btn-danger" data-id=${destination._id}>Delete</button>
   //    </div>
   //    </div>
   //    </div>`
   //   return renderedHTML;
   // }

   function getDestinationHTML(destination){
     return destination.map(getDestination)
   }


function getDestination(destination){
    var renderedHTML = '';
    console.log(destination);
    renderedHTML += `<hr>
            <div class="row">
            <div class="col-md-6 col-md-offset-3 location">
            <div class="col-md-12">
            <div class="col-md-10">
            <p class="location">Location: ${destination.location}</p>
            </div>
            <div class="col-md-2">
            <a href="javascript:void(0)" data-toggle="modal" data-target="#editLocation">
                   <span class="glyphicon glyphicon-pencil"></span>
                 </a>
            <div id="editLocation" class="modal fade" role="dialog" >
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <form id="locationForm" data-id="${destination._id}" >
                            <div class="form-group">
                                <label for="location">Location</label>
                                <input type="text" name="updateLocation" class="form-control" value="${destination.location}">
                            </div>
                            <div class="modal-footer">
                                 <p class="updateSuccess" style= "color: green"></p>
                                <button type="submit" class="btn btn-primary" data-id="${destination._id}">Update</button>
                                <button type="button" class=" btn btn-default" id="updateClose" data-dismiss="modal">Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            </div>
            <p>Date: ${destination.date}</p>
            <p>Budget: $ ${destination.budget}</p>
            <p>Plans:</p>
            <ul>`
    for(var i = 0; i<destination.plans.length; i++){
      var todo = destination.plans[i];
      var modalTarget = destination._id+i
      renderedHTML += `<li>${todo} </li>`

     }
     renderedHTML +=
     `</ul>
     </div>
     <div class="pull-right col-md-12">
     <button type="button" class="deleteBtn btn btn-danger" data-id="${destination._id}">Delete</button>
     </div>
     </div>
     </div>`
    return renderedHTML;
  }



      $("#htmlTarget").on("submit", "#locationForm", function(event){
         event.preventDefault();
        var updateId= $(this).data().id;
        console.log($(this).attr('data-id'))
         $.ajax({
           method: "PUT",
           url: '/destination/'+$(this).attr('data-id'),
           data: $(this).serialize(),
           success: function updateLocation(json){
             destination.splice(destination.indexOf(updateId), 1, json)
             reload()
           },
           error: handleError
         })
       });




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
     $('.modal-backdrop').remove();
   };

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
