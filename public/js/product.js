function changePic(elem){
    let imgProduct= $("#image-product");
    imgProduct.attr('src',$(elem).find('img').attr('src') );
}