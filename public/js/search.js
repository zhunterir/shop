// function createCard(product){
//     let card = document.createElement('article');
//     card.className = "card product-card";
//     card.innerHTML = `
//     <img class="card-img-top product-card-img" src=" ${product.imgUrl} " alt="Card image cap">
//     <div class="card-body product-card-body">
//         <h5 class="card-title ">${product.title}</h5>
//         <p class="card-text text-left ${product.sale!=0?'muted-price':''}" > ${product.price+' تومان'}</p>
//         <p class="card-text text-left sale-price"> ${product.sale!=0?(product.price - product.sale)+' تومان':''}</p>
//         <p class="card-text text-right" >موجودی: ${product.count} </p>
//         <p class="card-text text-right" >افزوده شده در: ${product.creationStr} </p>
//     </div>
//     `
//     let div = document.createElement('div');
//     let a1 = document.createElement('a');
//     let a2= document.createElement('a');
//     div.className = 'card-footer';
//     a1.className ="btn btn-info product-card-btn dynamic";
//     a1.innerText =  'مشاهده';
//     a2.className= "btn btn-danger product-card-btn dynamic";
//     a2.innerText= 'ویرایش';
//     div.appendChild(a1);
//     div.appendChild(a2);
//     card.appendChild(div)
//     a1.setAttribute('href',`/admin/products/${product.id}`);
//     a2.setAttribute('href' , `/admin/products/edit/${product.id}`);  
//     return card;


// }


function clearSearchContainer(){
    console.log('clearing');
    let searchContainer =document.querySelector('.search-container');
    searchContainer.innerHTML = null;
    searchContainer.style.display= 'none';
}
// function getCard(id){
//     console.log('getting card');
//     let el =document.createElement('a');
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             let cardContainer = document.querySelector('.card-container');
//             let product = JSON.parse(this.responseText);
//             console.log(product);
//             let card = createCard(product);
//             cardContainer.removeChild(cardContainer.firstChild);
//             cardContainer.append(card);

//         }
//     };
//     xhttp.open('GET', '/admin/products/card/'+id ,true);
//     xhttp.send();
// }



function updateList(select){
    let updateBtn = document.querySelector('#list-update-btn');
    updateBtn.setAttribute('href', `/admin/products?category=${select.value}`)
}
function search(){
    let input = document.querySelector("#search-title");
    let searchContainer = document.querySelector('.search-container');
    // let categorySelect = document.querySelector('#category-select');
    clearSearchContainer();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results =  JSON.parse(this.responseText);
            if (results.length){
                searchContainer.style.display= 'block';
                for (let result of results){
                    let link = document.createElement('a');
                    link.className = "search-result";
                    link.innerText = result.title;
                    searchContainer.appendChild(link);
                    link.setAttribute("href", `/admin/products/${result.id}`);
                    // link.addEventListener('click', ()=>getCard(result.id));
                }
            }
        }
    };
    console.log(input.value);
    xhttp.open("GET", `/admin/products/search?title=${input.value}`, true);
    xhttp.send(); 
      
}

let searchTitle = document.querySelector("#search-title");
let searchCategory = document.querySelector('#category-select');
let titleSearchContainer = document.querySelector('.search-container');
searchTitle.addEventListener('focus', search);
searchTitle.addEventListener('focusout', ()=>{setTimeout(clearSearchContainer, 200);} );
searchTitle.addEventListener('input', search);
searchCategory.addEventListener('change', ()=>{
    searchTitle.value+='';
});



// $(document).on("click", ".dynamic", function(event) {
//     console.log('clicked');
//     });

