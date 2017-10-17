var apiKey = '2f95f51b181ddd27883e91878e922466'; // assign our key to a variable, easier to read

// the next line and function set up the button in our html to be clickable and reactive
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
  document.getElementById('location').addEventListener('click', function(event){
    event.preventDefault();
    var zip = document.getElementById('location').value; // this line gets the zip code from the form entry
    var url = 'https://api.petfinder.com/pet.getRandom';

    // Within $.ajax{...} is where we fill out our query
    $.ajax({
      url: url,
      jsonp: "callback",
      dataType: "jsonp",
      data: {
        key: apiKey,
        animal: 'dog',
        'location': zip,
        output: 'basic',
        format: 'json'
      },
      // Here is where we handle the response we got back from Petfinder
      success: function( response ) {



//   var thumbnail = response.petfinder.pet.media.photos.photo[i];

//   for(var i = 0; i < (response.petfinder.pet.length); i++){
//     $('.postPets').append('<div class="pets"> <img src =' + response.petfinder.pet.media.photos.photo[i] + '> <p>'  + response.petfinder.pet.name +'</p></div>');
//     // console.log(json.data.children[i].data.url);
//     // console.log(thumbnail)
//   }
// console.log('title count ' + i)


        console.log(response); // debugging
        var dogName = response.petfinder.pet.name.$t;
        var img = response.petfinder.pet.media.photos.photo[0].$t;
        var id = response.petfinder.pet.id.$t;

        var newName = document.createElement('a');
        var newDiv = document.createElement('div');
        newName.textContent = dogName;
        newName.href = 'https://www.petfinder.com/petdetail/' + id;

        var newImg = document.createElement('img');
        newImg.src = img;

        var list = document.createElement("ul");
        list.setAttribute("id", "List");
        document.body.appendChild(list);

        newDiv.appendChild(newName);
        list.appendChild(newDiv);
        list.appendChild(newImg);
      }
    });
    })

}
