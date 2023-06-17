"use strict"

document.addEventListener('DOMContentLoaded', function() {
    
    /*const form = document.querySelector('.form__body');
    const form = document.getElementById('form1');*/
    const form = document.querySelectorAll('._form');
    
    let currentForm;
    let  formData;

    if (form.length > 0) {
        for(let index = 0; index < form.length; index++) {
          const formItem = form[index];
          formItem.addEventListener('submit', formSend);
        }
    }
    async function formSend(e) {
        currentForm = e.currentTarget;
        e.preventDefault();
        
        let error = formValidate(currentForm);
        
        formData = new FormData(currentForm);
        if(currentForm.getAttribute("id") === "form2") {
            formConstruct();
        }
        console.log(formData);
        if(error === 0) {
            /*form.classList.add('_sending');*/
           let response = await fetch('send_mail.php',{
            method: 'POST',
            body: formData
            }); 
            if(response.ok)  {
               let result = await response.json();
               alert(result.message);
               currentForm.reset();

            } else {
               alert('Ошибка!');
            }

        } else {
            alert("Заполните обязательные поля!!!!");
        }
    }

    function formValidate(currentForm) {
        let error = 0;
        let fomRec = currentForm.querySelectorAll('._req');

        for(let index = 0;index < fomRec.length;index++){
            let input = fomRec[index];
            formRemoveError(input);
            if(input.classList.contains('_email')) {
                 if(emailTest(input)) {
                    formAddError(input); 
                    error++;
                 } 
                } else {           
                    if(input.value === '') {
                    formAddError(input);
                    error++;
                }

            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error')
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error')
    }

    function emailTest(input) {
        let mailTest =  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        return mailTest;
    }

    function formConstruct() {
        let fieldName = '';
        let fieldValue = '';
        let chb = false;

        const quizItems = document.querySelectorAll('.quiz_block');

        if(quizItems.length > 0) {
            for(let index = 0;index < quizItems.length;index++) {
                 const checkItems = quizItems[index].querySelectorAll('.check_item');
                 for(let i = 0;i < checkItems.length;i++) {
                    let currentCheck = checkItems[i].firstElementChild;
                    
                    if(currentCheck.getAttribute("type") === "radio"){
                        if(currentCheck.checked){
                            fieldValue = currentCheck.value;
                            fieldName = currentCheck.getAttribute("name");
                            formData.append(fieldName, fieldValue);
                            fieldValue = '';
                            break;
                        } 
                    } else if (currentCheck.getAttribute("type") === "checkbox") {
                        chb = true;
                        
                        fieldName = currentCheck.getAttribute("name");
                        if(currentCheck.checked){
                            fieldValue = fieldValue + currentCheck.value +', ';
                        }
                    }

                 }
                   if(chb){
                    fieldValue = fieldValue.slice(0, -2);
                    formData.append(fieldName, fieldValue);
                    fieldValue = '';
                    chb = false;
                   }     
            }
        }
    }
})