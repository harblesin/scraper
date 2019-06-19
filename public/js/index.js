$("#scrape").click(function () {
    console.log("click")
    $.getJSON("/scrape", function (data) {
        console.log(data)
    })
})
$("#pop").click(function () {
    $.ajax({
            method: "GET",
            url: "/populate/"
        })
        .then(function (data) {

            }

        )
});


$("#clear").click(function () {
    $("h1").empty();
    $("a").empty();
    //location.reload();
})