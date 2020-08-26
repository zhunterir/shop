
let jallali = require('jalaali-js');
const fs = require('fs');
const path = require('path');
function getObjectSize(obj){
    let size = -1 ;
    for (let key in obj){
        if (obj.hasOwnProperty(key)){
            size+=1;
        }
    }
    return size;
}
function getStrTime(date){
    let newDate = new Date();
    let time = '';
    let oldYear = date.getUTCFullYear();
    let nowYear = newDate.getUTCFullYear();
    let diffHour=newDate.getUTCHours()- date.getUTCHours();
    if (date.getUTCFullYear()==newDate.getUTCFullYear() &&
     newDate.getUTCMonth()==date.getUTCMonth() && newDate.getUTCDay()== date.getUTCDay() ){
        
        time=(newDate.getUTCHours() - date.getUTCHours())+ ' ساعت '+
        (newDate.getUTCMinutes()- date.getUTCMinutes()+60)+' دقیقه پیش ';
    }    
    else{
        let jalDate=jallali.toJalaali(date);
        time = `${jalDate.jy}/${jalDate.jm}/${jalDate.jd}`;
    }
    return time;
}
function loadPrefs(){
    try{
        let buffer =fs.readFileSync(path.join(__dirname, '..','files','other','preferences.json'));
        return JSON.parse(buffer);
      }
      catch(e) {
        console.log(e);
        return false ;
    }
  
  }
exports.getObjectSize = getObjectSize;
exports.loadPrefs = loadPrefs;
exports.getStrTime = getStrTime;

// function getStrTime(date){
//     let newDate = new Date();
//     let time = '';
//     let diffHour=newDate.getUTCHours()- date.getUTCHours();
//     if (diffHour==0){
//         time= ((newDate.getUTCMinutes()- date.getUTCMinutes()))+' دقیقه پیش';
//     }    
//     else if (diffHour <=24){
//         time = ( diffHour)+ 'ساعت پیش ' ;
//     }
//     else if( diffHour<=720)
//     {
//         time = (newDate.getUTCDate()- date.getUTCDate())+ "روز پیش " ;  
//     }
//     else{
//         let jalDate=jallali.toJalaali(date);
//         time = `${jalDate.jy}/ ${jalDate.jm}/ ${jalDate.jd}`;
//     }
//     return time;
// }

// exports.getObjectSize = getObjectSize;

// exports.getStrTime = getStrTime;