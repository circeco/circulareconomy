
function sendMail(contactForm) {
    emailjs.send("circeco_web", "circeco", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "from_message": contactForm.message.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response.status, response.text).reset();
            },
            function (error) {
                console.log("FAILED", error);
            }
        )
        
    return false;  // To block from loading a new page
}

$(function buttonStuff() {
    console.log('one')
    $("#send_button").click(function () {
        $("#send_button").addClass("onclic", 250, validate);
    });

    function validate() {
        console.log('two')
        setTimeout(function () {
            $("#send_button").removeClass("onclic");
            $("#send_button").addClass("validate", 450, callback);
        }, 2250);
    }
    function callback() {
        console.log('three')
        setTimeout(function () {
            $("#send_button").removeClass("validate");
        }, 1250);
        function clearForm() {
            console.log('reset')
            document.getElementById("contact-form").reset();
        }
    }
});


