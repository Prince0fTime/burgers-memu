//wait until the page is loaded
$(function () {
  $(".change_eaten").on("click", function (event) {
    var id = $(this).data("id");
    // console.log(id);
    var newEat = $(this).data("newburger");
    // console.log(newEat + " newEat");
    var newBurgerState = {
      eaten: newEat
    };

    // Send the PUT request.
    $.ajax("/api/Burgers/" + id, {
      type: "PUT",
      data: newBurgerState
    }).then(
      function () {
        //console log the change and reload page to get the list
        console.log("changed eaten to", newEat);
        location.reload();
      }
    );
  });

  $(".burger_form").on("submit", function (event) {
    //use preventDefault to stop the Default of http submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#burgerName").val().trim(),
      eaten: $("[name=eaten]:checked").val().trim()
    };

    //send post request
    $.ajax("/api/Burgers", {
      type: "POST",

      data: newBurger

    }).then(
      //then with a promise function reload page and log new burger
      function () {
        console.log("created new Burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});