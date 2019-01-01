(function() {
    var button = $(".button");
    var textarea = $(".textarea");

    button.on("click", function() {
        var val = textarea.val();
        try {
            JSON.parse(val);
            alert("JSON is valid!");
        } catch (e) {
            alert("ERROR!!");
        }
    });
})();
