$(document).ready(function(){
  console.log("sanity check");


//map
// function initMap(){
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -33.8688, lng: 151.2195},
//     zoom: 13
//   });
//   var card = document.getElementById('pac-card');
//   var input = document.getElementById('pac-input');
//   var types = document.getElementById('type-selector');
//   var strictBounds = document.getElementById('strict-bounds-selector');
//
//   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
//
//   var autocomplete = new google.maps.places.Autocomplete(input);
//
//   // Bind the map's bounds (viewport) property to the autocomplete object,
//   // so that the autocomplete requests use the current map bounds for the
//   // bounds option in the request.
//   autocomplete.bindTo('bounds', map);
//
//   var infowindow = new google.maps.InfoWindow();
//   var infowindowContent = document.getElementById('infowindow-content');
//   infowindow.setContent(infowindowContent);
//   var marker = new google.maps.Marker({
//     map: map,
//     anchorPoint: new google.maps.Point(0, -29)
//   });
//
//   autocomplete.addListener('place_changed', function() {
//     infowindow.close();
//     marker.setVisible(false);
//     var place = autocomplete.getPlace();
//     if (!place.geometry) {
//       // User entered the name of a Place that was not suggested and
//       // pressed the Enter key, or the Place Details request failed.
//       window.alert("No details available for input: '" + place.name + "'");
//       return;
//     }
//
//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(20);
//     }
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//
//     var address = '';
//     if (place.address_components) {
//       address = [
//         (place.address_components[0] && place.address_components[0].short_name || ''),
//         (place.address_components[1] && place.address_components[1].short_name || ''),
//         (place.address_components[2] && place.address_components[2].short_name || '')
//       ].join(' ');
//     }
//
//     infowindowContent.children['place-icon'].src = place.icon;
//     infowindowContent.children['place-name'].textContent = place.name;
//     infowindowContent.children['place-address'].textContent = address;
//     infowindow.open(map, marker);
//   });
//
// }
//
// initMap()
//
//show map in my modal
// $("#myMap").on("shown.bs.modal", function () {
//   google.maps.event.trigger(map, "resize");
//   autocomplete;
// });

  ///////////////////////////////////////////////////////////////////////////////////////////////////

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


   function getDestinationHTML(destination){
     return destination.map(getDestination)
   }


function getDestination(destination){
    var renderedHTML = '';
    console.log(destination);
    renderedHTML += `
            <div class="row col-md-10 col-sm-12 col- col-md-offset-1">
            <div class = "container col-md-6 col-md-offset-3 mainInfo">
            <div class="col-md-8 col-md-offset-2">
            <h3>${destination.organizer}</h3>
            <!------------------------------------------------------------------------------------------------------------------------!>
            <div class="col-md-12">
            <p class="location">Location: ${destination.location}</p>
            </div>
            <!------------------------------------------------------------------------------------------------------------------------!>
            <div class="col-md-12">
            <p>Date: ${destination.date}</p>
            </div>
            <!------------------------------------------------------------------------------------------------------------------------!>
            <div class="col-md-12">
            <p>Budget: $ ${destination.budget}</p>
            </div>
            <!------------------------------------------------------------------------------------------------------------------------!>
            <div class="col-md-12">
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
     <div class="col-md-4 col-md-offset-4">
     <button type="button" class="deleteBtn btn btn-success col-md-12" data-toggle="modal" data-target="#${destination._id}">Edit</button>
     </div>
     <div class="col-md-4 col-md-offset-4">
     <button type="button" class="deleteBtn btn btn-danger col-md-12" data-id="${destination._id}">Delete</button>
     </div>
     </div>
     </div>
     <div id="${destination._id}" class="modal fade" role="dialog" >
     <div class="modal-dialog">

     <!-- Modal content-->
     <div class="modal-content">
     <form id="editForm" data-id="${destination._id}" >
     <div class="form-group">
     <label for="organizer">Change Organizer</label>
     <input type="text" name="updateOrganizer" class="form-control" value="${destination.organizer}">
     </div>
     <div class="form-group">
     <label for="location">Change Location</label>
     <input type="text" name="updateLocation" class="form-control" value="${destination.location}">
     </div>
     <div class="form-group">
     <label for="date">Change Date</label>
     <input type="text" name="updateDate" class="form-control" value="${destination.date}">
     </div>
     <div class="form-group">
     <label for="budget">Change Budget</label>
     <input type="text" name="updateBudget" class="form-control" value="${destination.budget}">
     </div>
     <div class="form-group">
     <label for="plans">Change Plans</label>
     <input type="text" name="updatePlans" class="form-control" value="${destination.plans}">
     </div>

     <div class="modal-footer">
     <button type="submit" class="btn btn-primary" data-id="${destination._id}">Update</button>
     <button type="button" class=" btn btn-default" id="updateClose" data-dismiss="modal">Close</button>
     </div>
     </form>

     </div>
     </div>
     </div>
     </div>
     </div>
     </div>`
    return renderedHTML;
  }



      $("#htmlTarget").on("submit", "#editForm", function(event){
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
         $("#createTrip textarea").val("");
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
