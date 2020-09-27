let infoCounter= 0;
let colorCounter = 0;
let pictureCounter = 0;
let addProductForm = document.querySelector('.form-add-product');
let moreInfoTable = document.querySelector('.more-info-table');
let imageInvalidText = document.querySelector('#id-image-invalid-text');
function deletePicture(btn){
    $('input#pic-btn').val('');
    let target= $(btn).attr('data-target');
    let mainPicName = $("input[name='mainPicName']").val();
    if (target==$("input[name='mainPicID']").val()){
        $("input[name='mainPicID']").val('')
    }
    if (target== mainPicName || $("#pictureModal #"+target+'container img').attr('src')== mainPicName){
        $("input[name='mainPicName']").val('');
    }
    let toDelete = JSON.parse($(`input[name='toDeletePics']`).val());
    toDelete.push( $("#pictureModal #"+$(btn).attr('data-target')+'container img').attr('src'));
    $("input[name='toDeletePics']").val(JSON.stringify(toDelete));
    $("#pictureModal #"+ $(btn).attr("data-target")+'container').remove();
}
function deleteRow(btn){
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
function InitInfo(title, value) {
    let row=  document.createElement('div');
    row.className = "more-info-table__row";
    let titleInfo = document.createElement('input');
    titleInfo.type="text";
    titleInfo.name = "infoTitle"+infoCounter;
    titleInfo.value = title;
    titleInfo.className = "title-info";
    let valueInfo = document.createElement('input');
    valueInfo.type="text";
    valueInfo.name = "infoValue"+infoCounter;
    valueInfo.className = "value-info";
    valueInfo.value = value;
    infoCounter+=1;
    let btn = document.createElement('button');
    let thirdDiv = document.createElement('div');
    thirdDiv.className=  "third-col";
    btn.type="button";
    btn.textContent = "حذف";
    btn.className = "btn info-delete-btn";
    thirdDiv.appendChild(btn);
    btn.addEventListener('click', ()=>{
        row.parentNode.removeChild(row);
    })
    let firstDiv = document.createElement('div');
    firstDiv.className = "more-info-table__value first-col";
    firstDiv.appendChild(titleInfo);
    let secondDiv = document.createElement('div');
    secondDiv.className = "more-info-table__value second-col";
    secondDiv.appendChild(valueInfo);
    row.appendChild(firstDiv);
    row.appendChild(secondDiv);
    row.appendChild(thirdDiv);
    moreInfoTable.appendChild(row);
}
function makeMain(btn) {
    let mainPicID=$("input[name='mainPicID']").val();
    if (mainPicID){
        $("#pictureModal #"+mainPicID+'container').removeClass("main-pic-container");
    }
    if ($(btn).attr('data-stat')=='local'){
        $("input[name='mainPicName']").val($(btn).attr("data-target"));
    }
    else{
        $("input[name='mainPicName']").val($("#pictureModal #"+$(btn).attr('data-target')+'container img').attr('src'));
    }
    $("input[name='mainPicID']").val($(btn).attr('data-target'))
    $("#pictureModal #"+ $(btn).attr("data-target") + 'container').addClass('main-pic-container');
     
}
function preview(input){
    console.log(input);
    if (input.files && input.files[0]){ 
        const file = input.files[0];
        const  fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!validImageTypes.includes(fileType)) {
            imageInvalidText.style.display = 'inline';
            input.files = null;
            return;
        }
        else{
            imageInvalidText.style.display= 'none';
        }  

        let reader = new FileReader();
        reader.onload = function (e) {
            let clone = input.cloneNode();
            clone.setAttribute("name", 'pic'+ pictureCounter);
            clone.setAttribute("id", 'pic'+ pictureCounter);
            clone.style.display= 'none';
            console.log('clone',clone);
            $("#form").append($(clone));
            let div= document.createElement('div');
            $(div).html(`<img src= "" class= "p-2 img-responsive modal-img" alt="">
            <div>
            <button data-stat='local' data-target="pic${pictureCounter}" onclick="deletePicture(this);" class="btn btn-light small d-block mx-auto m-2"><span class="fa fa-trash"></span></button>
            <button data-stat='local' data-target="pic${pictureCounter}" onclick="makeMain(this)" class="btn btn-light d-block mx-auto m-2"><span class="small">انتخاب به عنوان اصلی</span></button>
            </div>`).addClass('col-5').addClass("modal-img-container p-2 border m-1");
            $(div).attr('id', 'pic'+ pictureCounter + 'container');
            $("#pictureModal #modalContainer").append($(div));
            $(div).find('img').attr('src', e.target.result);
            pictureCounter+=1;
        };
        reader.readAsDataURL(file);
    }
}
function deleteInfo(id){
    console.log(id);
    let moreInfo = document.querySelector('#info-'+id);
    moreInfo.parentNode.removeChild(moreInfo);
}
function addInfo(){
    let  titleIn = document.querySelector("#info-title");
    let valueIn = document.querySelector("#info-value");
    let title=titleIn.value;
    let value =valueIn.value;
    let row=  document.createElement('div');
    row.className = "more-info-table__row";
    let titleInfo = document.createElement('input');
    titleInfo.type="text";
    titleInfo.name = "infoTitle"+infoCounter;
    titleInfo.value = title;
    titleInfo.className = "title-info";
    let valueInfo = document.createElement('input');
    valueInfo.type="text";
    valueInfo.name = "infoValue"+infoCounter;
    valueInfo.className = "value-info";
    valueInfo.value = value;
    infoCounter+=1;
    let btn = document.createElement('button');
    let thirdDiv = document.createElement('div');
    thirdDiv.className=  "third-col";
    btn.type="button";
    btn.textContent = "حذف";
    btn.className = "btn info-delete-btn";
    thirdDiv.appendChild(btn);
    btn.addEventListener('click', ()=>{
        row.parentNode.removeChild(row);
    })
    let firstDiv = document.createElement('div');
    firstDiv.className = "more-info-table__value first-col";
    firstDiv.appendChild(titleInfo);
    let secondDiv = document.createElement('div');
    secondDiv.className = "more-info-table__value second-col";
    secondDiv.appendChild(valueInfo);
    row.appendChild(firstDiv);
    row.appendChild(secondDiv);
    row.appendChild(thirdDiv);
    moreInfoTable.appendChild(row);
}
function trigger(){
    let btn = document.querySelector('#pic-btn');
    btn.click();
}
function removeColor(id){
    let colorText= $(id).find(".color-choice-text").eq(0).text();    
}
$("#addColorBtn").on("click", function(){
    let color = $("#colorSelect").val();
    let colorsJson =JSON.parse($("#colors").val());
    colorsJson.push(color);
    $("#colors").val(JSON.stringify(colorsJson));
    $("#colorsContainer").append($(`<div id="color${colorCounter}" class="color-choice d-flex"><div class="color-choice-text">${$(`#colorSelect option[value=${color}]`).text()}</div><div type="button" id="color${colorCounter}Btn" data-color="${color}" data-target="#color${colorCounter}" class="color-choice-btn btn-light">&times;</div></div>`)) 
    $(`#color${colorCounter}Btn`).on("click", function(){
        let color = $(this).attr("data-color");
        let colors= JSON.parse($("#colors").val());
        colors.splice(colors);
        $("#colors").val(JSON.stringify(colors));
        $('div'+ $(this).attr("data-target")).remove(); 
    } );
    colorCounter+=1;
});
// document.querySelector('#price-input').oninvalid = (event)=>{
//     event.target.setCustomValidity('قیمت الزامیست و باید به عدد  باشد');
// }
// document.querySelector('#sale-input').oninvalid = (event)=>{
//     event.target.setCustomValidity('تخفیف الزامیست و باید به عدد  باشد');
// }
// document.querySelector('#count-input').oninvalid = (event)=>{
//     event.target.setCustomValidity(' تعداد الزامیست و باید به عدد  باشد');
// }
// document.querySelector('#title-input').oninvalid = (event)=>{
//     event.target.setCustomValidity('انتخاب عنوان الزامیست');
// }
function initPicture(name, url) {
    
    let $div = $(document.createElement('div'));
    $div.html(`<img src= "${url}" class= "p-2 img-responsive modal-img" alt="">
    <div>
    <button data-target="pic${pictureCounter}" onclick="deletePicture(this);" class="btn btn-light small d-block mx-auto m-2"><span class="fa fa-trash"></span></button>
    <button data-stat='server' data-target="pic${pictureCounter}" onclick="makeMain(this)" class="btn btn-light d-block mx-auto m-2"><span class="small">انتخاب به عنوان اصلی</span></button>
    </div>`);
    console.log(url);
    if (url == $("input[name='mainPicName']").val()){
        console.log('same', name);
        $("input[name='mainPicID']").val('pic'+pictureCounter)
        $div.addClass('main-pic-container');
    }
    $div.attr("id", 'pic'+pictureCounter+'container').addClass('col-5').addClass("modal-img-container p-2 border m-1");
    $("#pictureModal #modalContainer").append($div);
    pictureCounter+=1;
}
window.addEventListener('load', () =>{
    let colors = JSON.parse($("#colors").val());
    console.log(colors);
    let colorsContainer = $("#colorsContainer");
    for (let color of colors){
        colorsContainer.append($(`<div id="color${colorCounter}" class="color-choice d-flex"><div class="color-choice-text">${$(`#colorSelect option[value=${color}]`).text()}</div><div type="button" id="color${colorCounter}Btn" data-color="${color}" data-target="#color${colorCounter}" class="color-choice-btn btn-light">&times;</div></div>`))   
        $(`#color${colorCounter}Btn`).on("click", function(){
            let color = $(this).attr("data-color");
            let colors= JSON.parse($("#colors").val());
            colors.splice(colors.indexOf(color),1);
            $("#colors").val(JSON.stringify(colors));
            $('div'+ $(this).attr("data-target")).remove(); 
        } );
        colorCounter+=1;
    }
    let infos = JSON.parse($('input#informations').val());
    if (infos){
        for (let info of infos){
            InitInfo(info.title, info.value);
        }
    }
    let images = JSON.parse($('input#images').val());
    if (images){
        for( let img of images){
            initPicture(img.name, img.url);
        }
    }
});


$("#infinity").on("input", function(){
    if (this.checked){
        console.log('sq');
        $("input#count").val("نامحدود").attr("disabled",'true');
    }
    else{
        console.log("Wqf");
        $("input#count").val("").removeAttr("disabled").trigger("focus");
    }
});

