$(document).ready(function() {

  function getPetData(data){
    $.ajax({
      method: "GET",
      url: "http://api.petfinder.com/pet.getRandom?key=a839717f845b6ee822240f22a2b5a84c&shelterid=KY305&output=full&format=json",
      dataType: "json",
      success: onSuccess,
      error: onError
    });
  };


})

function onSuccess(err, data) {
  if (err) {
    console.log(`Error, ${err}`);
  }
  console.log(data);
}

function onError(err) {
  console.log(`Ya done failed, ${err}`);
}
