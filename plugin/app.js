$("#goLatest").click(function(e) {
    var fin = $("#fin").val();
    var phone = $("#phone").val();

    if(!fin || !phone) {
        $("#error").show();
        return false;
    }
    $("#goLatest").text("Loading..");

    var url1 = "http://localhost:9100/latest";

    var formData = {
        "fin" : fin,
        "phone" : phone
    }

    var req = new Request(url1, {
        method: "POST",
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    fetch(req).then(function(res){
        return res.json();
    }).then(function(data) {
        $("#goLatest").text("Latest");
        $("#result").show();
        $("#slot").text(data.date);
    })
});

$("#goRecent").click(function(e) {
    var fin = $("#fin").val();
    var phone = $("#phone").val();

    if(!fin || !phone) {
        $("#error").show();
        return false;
    }
    $("#goRecent").text("Loading..");

    var url1 = "http://localhost:9100/recent";

    var formData = {
        "fin" : fin,
        "phone" : phone
    }

    var req = new Request(url1, {
        method: "POST",
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    fetch(req).then(function(res){
        return res.json();
    }).then(function(data) {
        $("#goRecent").text("Recent");
        $("#result").show();
        $("#slot").text(data.date);
    })
});

$("input").focus(function() {
    $("#goLatest").text("Latest");
    $("#goRecent").text("Recent");
    $("#result").hide();
    $("#error").hide();
});