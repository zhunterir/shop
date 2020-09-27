let countDownDate = new Date("Aug 30, 2020 15:37:25").getTime();
let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("demo-Timer").innerHTML = days + "d :" + hours + "h :" +
        minutes + "m :" + seconds + "s ";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo-Timer").innerHTML = "تمام شده";
    }
}, 1000);

// mahsolat1
$("#card-mahsolat4").hide();
$("#card-mahsolat2").hide();
$("#card-mahsolat3").hide();
$("#card-mahsolat44").hide();
$("#card-mahsolat22").hide();
$("#card-mahsolat33").hide();
$("#card-mahsolat444").hide();
$("#card-mahsolat222").hide();
$("#card-mahsolat333").hide();
$("#card-mahsolat40").hide();
$("#card-mahsolat20").hide();
$("#card-mahsolat30").hide();
$("#a-mh1").css("color", "orange");
$("#a-mh10").css("color", "orange");
$("#a-mh11").css("color", "orange");
$("#a-mh111").css("color", "orange");



$("#a-mh1").on('click', () => {
    $("#card-mahsolat1").show();
    $("#card-mahsolat4").hide();
    $("#card-mahsolat2").hide();
    $("#card-mahsolat3").hide();
    $("#a-mh1").css("color", "orange");

    $("#a-mh2").css("color", "#333");
    $("#a-mh3").css("color", "#333");
    $("#a-mh4").css("color", "#333");

});
$("#a-mh2").on('click', () => {
    $("#card-mahsolat2").show();
    $("#card-mahsolat4").hide();
    $("#card-mahsolat1").hide();
    $("#card-mahsolat3").hide();
    $("#a-mh2").css("color", "orange");
    $("#a-mh1").css("color", "#333");
    $("#a-mh3").css("color", "#333");
    $("#a-mh4").css("color", "#333");

});
$("#a-mh3").on('click', () => {
    $("#a-mh3").css("color", "orange");
    $("#a-mh2").css("color", "#333");
    $("#a-mh1").css("color", "#333");
    $("#a-mh4").css("color", "#333");
    $("#card-mahsolat3").show();
    $("#card-mahsolat4").hide();
    $("#card-mahsolat2").hide();
    $("#card-mahsolat1").hide();
});
$("#a-mh4").on('click', () => {
    $("#a-mh4").css("color", "orange");
    $("#a-mh2").css("color", "#333");
    $("#a-mh1").css("color", "#333");
    $("#a-mh3").css("color", "#333");
    $("#card-mahsolat4").show();
    $("#card-mahsolat3").hide();
    $("#card-mahsolat2").hide();
    $("#card-mahsolat1").hide();
});



$("#a-mh11").on('click', () => {
    $("#card-mahsolat11").show();
    $("#card-mahsolat44").hide();
    $("#card-mahsolat22").hide();
    $("#card-mahsolat33").hide();
    $("#a-mh11").css("color", "orange");

    $("#a-mh22").css("color", "#333");
    $("#a-mh33").css("color", "#333");
    $("#a-mh44").css("color", "#333");

});
$("#a-mh22").on('click', () => {
    $("#card-mahsolat22").show();
    $("#card-mahsolat44").hide();
    $("#card-mahsolat11").hide();
    $("#card-mahsolat33").hide();
    $("#a-mh22").css("color", "orange");
    $("#a-mh11").css("color", "#333");
    $("#a-mh33").css("color", "#333");
    $("#a-mh44").css("color", "#333");

});
$("#a-mh33").on('click', () => {
    $("#a-mh33").css("color", "orange");
    $("#a-mh22").css("color", "#333");
    $("#a-mh11").css("color", "#333");
    $("#a-mh44").css("color", "#333");
    $("#card-mahsolat33").show();
    $("#card-mahsolat44").hide();
    $("#card-mahsolat22").hide();
    $("#card-mahsolat11").hide();
});
$("#a-mh44").on('click', () => {
    $("#a-mh44").css("color", "orange");
    $("#a-mh22").css("color", "#333");
    $("#a-mh11").css("color", "#333");
    $("#a-mh33").css("color", "#333");
    $("#card-mahsolat44").show();
    $("#card-mahsolat33").hide();
    $("#card-mahsolat22").hide();
    $("#card-mahsolat11").hide();
});

$("#a-mh111").on('click', () => {
    $("#card-mahsolat111").show();
    $("#card-mahsolat444").hide();
    $("#card-mahsolat222").hide();
    $("#card-mahsolat333").hide();
    $("#a-mh111").css("color", "orange");

    $("#a-mh222").css("color", "#333");
    $("#a-mh333").css("color", "#333");
    $("#a-mh444").css("color", "#333");

});
$("#a-mh222").on('click', () => {
    $("#card-mahsolat222").show();
    $("#card-mahsolat433").hide();
    $("#card-mahsolat111").hide();
    $("#card-mahsolat333").hide();
    $("#a-mh222").css("color", "orange");
    $("#a-mh111").css("color", "#333");
    $("#a-mh333").css("color", "#333");
    $("#a-mh444").css("color", "#333");

});
$("#a-mh333").on('click', () => {
    $("#a-mh333").css("color", "orange");
    $("#a-mh222").css("color", "#333");
    $("#a-mh111").css("color", "#333");
    $("#a-mh444").css("color", "#333");
    $("#card-mahsolat333").show();
    $("#card-mahsolat444").hide();
    $("#card-mahsolat222").hide();
    $("#card-mahsolat111").hide();
});
$("#a-mh444").on('click', () => {
    $("#a-mh444").css("color", "orange");
    $("#a-mh222").css("color", "#333");
    $("#a-mh111").css("color", "#333");
    $("#a-mh333").css("color", "#333");
    $("#card-mahsolat444").show();
    $("#card-mahsolat333").hide();
    $("#card-mahsolat222").hide();
    $("#card-mahsolat111").hide();
});



$("#a-mh10").on('click', () => {
    $("#card-mahsolat10").show();
    $("#card-mahsolat40").hide();
    $("#card-mahsolat20").hide();
    $("#card-mahsolat30").hide();
    $("#a-mh10").css("color", "orange");

    $("#a-mh20").css("color", "#333");
    $("#a-mh30").css("color", "#333");
    $("#a-mh40").css("color", "#333");

});
$("#a-mh20").on('click', () => {
    $("#card-mahsolat20").show();
    $("#card-mahsolat40").hide();
    $("#card-mahsolat10").hide();
    $("#card-mahsolat30").hide();
    $("#a-mh20").css("color", "orange");
    $("#a-mh10").css("color", "#333");
    $("#a-mh30").css("color", "#333");
    $("#a-mh40").css("color", "#333");

});
$("#a-mh30").on('click', () => {
    $("#a-mh30").css("color", "orange");
    $("#a-mh20").css("color", "#333");
    $("#a-mh10").css("color", "#333");
    $("#a-mh40").css("color", "#333");
    $("#card-mahsolat30").show();
    $("#card-mahsolat40").hide();
    $("#card-mahsolat20").hide();
    $("#card-mahsolat10").hide();
});
$("#a-mh40").on('click', () => {
    $("#a-mh40").css("color", "orange");
    $("#a-mh20").css("color", "#333");
    $("#a-mh10").css("color", "#333");
    $("#a-mh30").css("color", "#333");
    $("#card-mahsolat40").show();
    $("#card-mahsolat30").hide();
    $("#card-mahsolat20").hide();
    $("#card-mahsolat10").hide();
});