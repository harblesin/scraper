$("#scrape").click(function () {
    console.log("click")
    $.getJSON("/scrape", function (data) {
        console.log(data)
    })
})
$("#pop").click(function () {

    location.reload();

    // $.ajax({
    //         method: "GET",
    //         url: "/populate/"
    //     })
    //     .then(function (data) {

    //         }

    //     )
});


$("#clear").click(function () {
    $("h1").empty();
    $("a").empty();
    $.ajax({
        method: "DELETE",
        url: "/delete/"
    })
    .then(function (data) {
        res.json(data)
        }

    )
    //location.reload();
})