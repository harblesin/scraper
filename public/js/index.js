//Logic for the scrape button, hits the route which hits clickhole.com, susing cheerio to scrape data
$("#scrape").click(function() {
  if($(".card-title").val() !== undefined)  {
    alert("Website has already been scraped! Hit the clear button to remove the articles and notes if you would like to start over!")
  }else{
  $(".content").append($("<h1 id='wait'>LOADING SCRAPE . . . PLEASE WAIT</h2>"));
  $.get("/scrape", function(data) {
    console.log(data);
  }).then(function() {
    $("#wait").remove();
    location.reload();
  });
  }
});

//Click functionality for clearing the db for both the articles and notes
$("#clear").click(function() {
  //$(".jumbotron").empty();
  $.ajax({
    method: "DELETE",
    url: "/delete/"
  }).then(function(data) {
    res.json(data);
  });
  location.reload();
});

//I know this is ugly and monstrous but I found amusement in the thought of it after writing it trying
//to circumvent some jQuery syntax and with the thought that i've seen no one do this ever,
//assumedly because it's ugly and not good practice, I thought it was funny and left it.

//When an article is clicked, creates a new text window and textarea that will take in data that will be
//pushed into the note db serverside, as well as populating the Post model
$("h3").click(function() {
  $(".notes").empty();

  var idNum = $(this).attr("idNum");

  $.get("/scrape/" + idNum).then(function(data) {
    $(".notes").append(
      $(
        `<form><div class='form-group'
     style='margin-top:100px;width:200px'>
    ` +
          data.title +
          `<br><br>Title<br><br><input id='titleField' class='form-control'></input></div>
    Note<br><div class='form-group'><textarea id='noteField' class='form-control'
     style='width:200px;height:600px'></textarea></div></form>
    <button class='btn btn-info' id='saveButton' idNum='` +
          data._id +
          `'>Save</button>`
      )
    );

    if (data.note) {
      $("#titleField").val(data.note.title);
      $("#noteField").val(data.note.body);
    }
  });
});

//When the button below the note fields is clicked, pushes those values for the note into the note db
//and populates the article model in the post db serverside
$(document).on("click", "#saveButton", function() {
  //$("#saveButton").click(function(){
  console.log("yes");
  var idNum = $(this).attr("idNum");

  $.ajax({
    method: "POST",
    url: "/scrape/" + idNum,
    data: {
      title: $("#titleField").val(),
      body: $("#noteField").val()
    }
  }).then(function(data) {
    console.log(data);
    $(".notes").empty();
  });
  $("#titleField").val("");
  $("#noteField").val("");
});
