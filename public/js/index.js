$("#scrape").click(function() {
  console.log("click");
  $.getJSON("/scrape", function(data) {
    console.log(data);
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
  $(".jumbotron").empty();
  $.ajax({
    method: "DELETE",
    url: "/delete/"
  }).then(function(data) {
    res.json(data);
  });
  //location.reload();
});

$("h3").click(function(){
    $(".notes").empty();
    $(".notes").append($(`<form><div class='form-group' style='margin-top:100px;width:200px'>
    Name<br><input class='form-control'></input></div>
    Note<br><div class='form-group'><textarea class='form-control' style='width:200px;height:600px'></textarea></div></form>
    <button class='btn btn-info save'>Save</button>`))
    // let titleBox = $("<input>").attr("type","text");
    // let noteBox = $("<textarea>").attr("style", "width:200px;height:600px");
    // titleBox.wrap($("<label>").text("Name"));
    // noteBox.wrap($("<label>").text("Note"));
    // $("input").wrapAll("<form></form>").appendTo($(".notes"));
})
