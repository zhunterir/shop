
let infoCounter= 1;
let addProductForm = document.querySelector('.form-add-product');
let moreInfoTable = document.querySelector('.more-info-table');
let imageInvalidText = document.querySelector('#id-image-invalid-text');
function preview(input) {
    let mirror = document.querySelector('#mirror');
    
    if (input.files && input.files[0]) { 
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
            mirror.setAttribute('src',e.target.result) 
        };
        reader.readAsDataURL(input.files[0]);
    }
    else{
        mirror.setAttribute('src', '');
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
    let div=  document.createElement('div');
    div.className = "more-info-table__row";
    let newInput = document.createElement('input');
    newInput.type="text";
    newInput.style.display = "none";
    newInput.name = "info"+infoCounter;
    infoCounter+=1;
    newInput.value = title+"###"+value;
    addProductForm.appendChild(newInput);
    let btn = document.createElement('button');
    let thirdDiv = document.createElement('div');
    thirdDiv.className=  "third-col";
    btn.type="button";
    btn.textContent = "حذف";
    btn.className = "btn info-delete-btn";
    thirdDiv.appendChild(btn);
    let titleP = document.createElement('p');
    titleP.textContent = title;
    titleP.className = "more-info-table__value first-col";
    let valueP = document.createElement('p');
    valueP.textContent = value;
    valueP.className = "more-info-table__value second-col";
    btn.addEventListener('click', ()=>{
        newInput.parentNode.removeChild(newInput);
        div.parentNode.removeChild(div);
    })
    div.appendChild(titleP);
    div.appendChild(valueP);
    div.appendChild(thirdDiv);
    moreInfoTable.appendChild(div)
}
function trigger(){
    let btn = document.querySelector('#pic-btn');
    btn.click();
}

