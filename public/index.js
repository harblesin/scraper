$("#scrape").click(function(){
    $.get("/scrape");
})

$("#clear").click(function(){
    $("<h1>").empty();
    $("<h3>").empty();
})