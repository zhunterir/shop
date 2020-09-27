
function showItem(id, string) {
    let elem = document.querySelector(`#${id}`);
    elem.setAttribute("display", string);   
}
function checkMinLength($pass, len){
    console.log("check");
    if ( $pass.val().length < len){
        $pass.attr("data-err-type", "minLen")
        $pass.next().css("display", "inline").text("رمز عبور باید حداقل 6 حرفی باشد");
        $pass.removeClass("valid-input").addClass("error-input");
        return false;
    }
    else {
        if ($pass.attr("data-err-type")==="minLen"){
            $pass.next().css("display","none");
            $pass.removeClass("error-input").addClass("valid-input")
        }
        return true;
    }
}
function checkPassSame($rePass, $pass){
    if (!($rePass.val()===$pass.val())){
        $rePass.next().css("display", "inline").text("رمز عبور را یکسان وارد کنید.");
        $rePass.removeClass("valid-input").addClass("error-input");
        $rePass.attr("data-err-type", "notSame")
        return false;
    }
    else{
        if ($rePass.attr("data-err-type")==="notSame"){
            $rePass.addClass("valid-input").removeClass("error-input");
            $rePass.next().css("display", "none");
        }
        return true;
    }
}
function activeSendButton(target, btnID){
    if (target.checkValidity() && ! document.querySelector(btnID).getAttribute("data-timer-on")){
        document.querySelector(btnID).removeAttribute("disabled");
    }
    else{
        document.querySelector(btnID).setAttribute("disabled", "true");
    }
}

function enableSubmitBtn(className, btnID, checkID){

    for (let elem of document.querySelectorAll(className)){
        if (!elem.checkValidity()){
            document.querySelector(btnID).setAttribute('disabled', 'true');
            return ;
        }
    }
    if (checkID && !document.querySelector(checkID).checked){
        document.querySelector(btnID).setAttribute('disabled', 'true');
        return;
    }
    document.querySelector(btnID).removeAttribute('disabled');

}

document.querySelector("#mobile-register").addEventListener('input', (event)=>activeSendButton(event.target, "#registerCodeRequest"));
document.querySelector("#forgotPassMobile").addEventListener("input", (event)=> activeSendButton(event.target, "#forgotPassCodeRequest"))

for (let elem of document.querySelectorAll(".modal-input")){
    elem.addEventListener("input",()=> enableSubmitBtn(".modal-input", "#modal-submit-btn", "#ruleCheck"))
}

for (let elem of document.querySelectorAll(".forgotPassInput")){
    elem.addEventListener("input", ()=> enableSubmitBtn(".forgotPassInput", "#passRecoverRequestBtn", null));
}

document.querySelector("#ruleCheck").addEventListener("input", ()=>enableSubmitBtn(".modal-input", "#modal-submit-btn", "#ruleCheck"));

window.addEventListener('load',()=>{
    activeSendButton(document.querySelector('#mobile-register'), '#registerCodeRequest');
    activeSendButton(document.querySelector("#forgotPassMobile"), "#forgotPassCodeRequest")
    enableSubmitBtn(".modal-input", "#modal-submit-btn", "#ruleCheck");
    enableSubmitBtn(".forgotPassInput", "#passRecoverRequestBtn", null)
});
function startTimer(event, inputID){
    event.target.setAttribute("disabled", "true");
    event.target.setAttribute("data-timer-on", "true");
    setTimeout(()=> document.querySelector(inputID).style.display = "block", 1000 )
    let timer = 61;
    let interval= setInterval(()=>{
        timer = timer -1;
        if (timer=== -1){
            clearInterval(interval);
            event.target.removeAttribute("disabled");
            event.target.removeAttribute("data-timer-on");
            event.target.textContent = "ارسال کد فعال سازی";
            return;
        }
        event.target.textContent = `${timer} ثانیه`;
    },1000);

}

// $("#registerCodeRequest").on("click", ()=>{
//     let mobile= $("#mobile-register").value;
//     console.log(mobile);
//     $.ajax({url: "/users/sendRegisterCode",
//      data:{ "mobile": mobile}, 
//      type: "POST", 
//      success: function(result, status, xhr){
//         console.log(result);
//      }
//     });
// });
$("#registerCodeRequest").on("click", (event)=>{
    // let mobile= $("#mobile-register").val();
    // $.get('/users/sendCode?mobile='+mobile,function(data){
        startTimer(event, "#code-input");
    // });
} );
$("#forgotPassCodeRequest").on("click", (event)=>startTimer(event, "#forgotPassCodeIn"));
function hideAndShowModal(toHideID, toShowID){
    $(toHideID).one("hidden.bs.modal",()=>{
        $(toShowID).modal('show');
    });
    $(toHideID).modal('hide');
    // setTimeout(()=>{
    //     $(toHideID).on("hidden.bs.modal", ()=>{return;});
    //     console.log("clear");
    // },500)
}
$("#haveAccountBtn").on("click", ()=>
 hideAndShowModal("#registerModal", "#signInModal"))
$("#createAccountBtn").on("click", ()=>hideAndShowModal("#signInModal","#registerModal"))
$("#passRecoverBtn").on("click", ()=> hideAndShowModal("#signInModal", "#forgotPassModal"))

$("#signUpRePass").on("change", function(){
    if (!$(this).data("changed")){
        checkPassSame($(this), $("#signUpPass"));
        checkMinLength($(this), 6);
        $(this).on("input", ()=>{
            checkPassSame($(this), $("#signUpPass"));
            checkMinLength($(this), 6); 
        });
        $("#signUpPass").on("input", function(){checkPassSame($("#signUpRePass"), $(this))}); 
        $(this).data("changed", true);
    }
    
});
$("#signUpPass").on("change", function(){
    if (! $(this).data("minCheckActivated")){
        checkMinLength($(this), 6);
        console.log($(this).data("minCheckActivated"));
        $(this).on("input",()=> checkMinLength($(this), 6));
        $(this).data("minCheckActivated", true);
    }
});




