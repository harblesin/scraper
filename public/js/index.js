$("#scrape").click(function() {
  console.log("click");
  $.get("/scrape", function(data) {
    console.log(data);
  }).then(function() {
    location.reload();
  });
});

$("#pop").click(function() {
  location.reload();

  // $.ajax({
  //         method: "GET",
  //         url: "/populate/"
  //     })
  //     .then(function (data) {

  //         }

  //     )
});

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
  // let titleBox = $("<input>").attr("type","text");
  // let noteBox = $("<textarea>").attr("style", "width:200px;height:600px");
  // titleBox.wrap($("<label>").text("Name"));
  // noteBox.wrap($("<label>").text("Note"));
  // $("input").wrapAll("<form></form>").appendTo($(".notes"));
});

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
