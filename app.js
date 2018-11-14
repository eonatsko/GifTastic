var topics = ["Cupcakes", "Chocolate", "Cookies", "Cakes", "Ice Cream", "Lollipops", "Candy", "Brownies", "Pie"];

$(document).ready(function () {
  // Render original dessert 
  displayButtons();
  // On submitting new dessert from the form text field,
  // new dessert is pushed into the dessert array
  $("#newDessert").on("click", function (e) {
    e.preventDefault();
    // $("#userDessert").addClass('button')
    var dessert = $("#userDessert").val().trim();
    // $("button").attr("data-name", dessert);
    topics.push(dessert);
    displayButtons();
  });
});

const displayButtons = () => {
  $("#button-display").empty();
  for (var i = 0; i < topics.length; i++) {
    $("#button-display").append(getButton(topics[i]));
  }
}

const getButton = (button) => {
  return `
    <button data-name=${button} class="desserts">
      ${button}
    </button>
  `;
}

const getGif = (gif) => {
  return `
    <div>
      <img 
        src="${gif.images.fixed_height_still.url}"
        data-still="${gif.images.fixed_height_still.url}"
        data-animate="${gif.images.fixed_height.url}"
        data-state="still"
        id="${gif.id}"
        onClick="handleGifClick('${gif.id}')"
      />
      <p>Rating: ${gif.rating}</p>
    </div>
  `;
}

const handleGifClick = (id) => {
  const gif = document.getElementById(id);
  if(gif.getAttribute('data-state') === 'still'){
    gif.setAttribute('data-state','animate')
    gif.src = gif.getAttribute('data-animate');
  }else {
    gif.setAttribute('data-state','still')
    gif.src = gif.getAttribute('data-still');
  }
}

$(document).on('click', '.desserts', function (e) {
  e.preventDefault();
  var addedDessert = $(this).attr("data-name");
  axios.get(`https://api.giphy.com/v1/gifs/search`, 
      {
        params: {
          q: addedDessert,
          api_key: "luF9clRXB8l9jli6ugpMDeKhcZeC9nBn",
          limit: 10
        }
      })
       .then((res) => {
          if(res.status == 200){
            const results = res.data.data;
            $("#showGifs").empty();
            for(let i = 0; i < results.length; i++){
              $("#showGifs").append(getGif(results[i]));
            }
          }
       })
       .catch(e => console.log(e));
});