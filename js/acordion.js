"use strict"

document.addEventListener('DOMContentLoaded', function() {

document.querySelectorAll('.accordeon-section').forEach(function(section) {
   section.addEventListener('click', function(e) {
      let bodyItem,headPoint;
      bodyItem = e.target.closest('.accordeon-section').querySelector('.accordeon-body');
      headPoint = e.target.closest('.accordeon-section').querySelector('.acc_arrow');

      if(bodyItem.classList.contains('opened')) {
         bodyItem.classList.remove('opened');
         //console.log(bodyItem);
         headPoint.innerText = '▼';
      } else {

      document.querySelectorAll('.accordeon-section').forEach(function(section) {
         //console.log(section.querySelector('.accordeon-body'));
         let elemSection = section.querySelector('.accordeon-body');
         let elemArrow = section.querySelector('.acc_arrow');
         elemSection.classList.remove('opened');
         elemArrow.innerText = '▼';
      })
      bodyItem = e.target.closest('.accordeon-section').querySelector('.accordeon-body');
      headPoint = e.target.closest('.accordeon-section').querySelector('.acc_arrow');
      /*console.log(bodyItem);
      console.log(bodyItem.classList);
      let ind = bodyItem.classList.contains('opened');
      console.log(ind);
      if(ind == true){
         bodyItem.classList.remove('opened');
         //console.log(bodyItem);
         headPoint.innerText = '▼';
         //console.log(bodyItem);
         //console.log(headPoint);
      } else {*/
      bodyItem.classList.add('opened'); 
      headPoint.textContent = '▲';
   }
}  
   )
})

})








/*const titles = document.querySelectorAll('.accordion_title');
const contents = document.querySelectorAll('.accordion_content');
const accArrow = document.querySelectorAll('.acc_arrow');

titles.forEach(item => item.addEventListener('click', () =>{
  const activeContent = document.querySelector('#'+ item.dataset.tab);
  const activeArrow = document.querySelector('#'+ item.dataset.tab);
   if(activeContent.classList.contains('acc-active')) {
      activeContent.classList.remove('acc-active')
      item.classList.remove('acc-active');
      activeArrow.textContent = '▼';
      activeContent.style.maxHeight = 0;
   } else {
      contents.forEach((element, index) => {
           element.classList.remove('acc-active');
           element.style.maxHeight = 0;
      })
   titles.forEach(element => element.classList.remove('acc-active'));
   accArrow.forEach(element => element.textContent = '▼')
   
   item.classList.add('acc-active');
   activeContent.classList.add('acc-active');
   activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
   activeArrow.textContent = '▲';
}
})) */
