$("#add-user").submit(function(event) {
    alert("Data inserted Successfully");
})

// to update data
$("#update-user").submit(function(event) {
    event.preventDefault();
    var array = $(this).serializeArray();
    var data = {}

    $.map(array, function(n, i) {
        data[n["name"]] = n["value"]
    })

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": 'PUT',
        "data": data
    };

    $.ajax(request).done(function(response) {
        alert("Data Update Successfully");
    });
});

// To delete data
if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": 'DELETE',
        };
        if (confirm("Are you sure you want to delete the data ?")) {
            $.ajax(request).done(function(response) {
                //alert("Data Deleted Successfully");
                location.reload();
            });
        }
    })

}