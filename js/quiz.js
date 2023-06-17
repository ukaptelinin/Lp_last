
    
    "use strict"

    //Блок модального окна
    document.addEventListener('DOMContentLoaded', function() {
    
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');
    let quiz_form = document.querySelector('.quiz_form');
    let startQuizFl = 0;
    
    let unlock = true;
    const timeout = 800;
    
        if (popupLinks.length > 0) {
            for(let index = 0; index < popupLinks.length; index++) {
                const popupLink = popupLinks[index];
            
                popupLink.addEventListener("click", function(e){
            
                    const popupName = popupLink.getAttribute('href').replace('#', '');
                    const curentPopup = document.getElementById(popupName);
                    popupOpen(curentPopup);
                    e.preventDefault();
                });
            }
        }
    
    const popupCloseIcon = document.querySelectorAll('.close-popup');
    
    if(popupCloseIcon.length > 0){
        for(let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function(e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            })
        }
    }
    
    function popupOpen(curentPopup) {
        if(curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if(popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener("click", function (e) {
        
                if(!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }
    
    function popupClose(popupActive, doUnlock = true){
         if(unlock) {
            popupActive.classList.remove('open');
            
            if(doUnlock) {
                bodyUnlock();
            }
        }
        startQuizFl = 1;
        quiz_form.reset();
    }
    
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        if(lockPadding.length > 0){
        for(let index = 0; index < lockPadding.length; index++) {
             const el = lockPadding[index];
             el.style.paddingRight = lockPaddingValue;
           }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('_lock');
        unlock = false;
        setTimeout(function() {
            unlock = true;
        },timeout);
    }
    
    function bodyUnlock() {
        setTimeout(function(){
            if(lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
               } 
           }
            body.style.paddingRight = '0px';
            body.classList.remove('_lock'); 
        },timeout);
        unlock = false;
        setTimeout(function(){
            unlock = true;
        },timeout);
    }
    
    document.addEventListener('keydown', function(e){
        if(e.which === 27) {
            const popupActive =document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    })
    //Блок квиза
    
        if (quiz_form) {
            let PrevBtn = quiz_form.querySelector('.btnPrev');
            let nextBtn = quiz_form.querySelector('.btnNext');
            let quizAll = quiz_form.querySelectorAll('.quiz_block');
            let currentQ = quiz_form.querySelector('.currentQ');
            let progressQ = quiz_form.querySelector('.progress');
            let progress = 0;
            let count = 0;
            let progressPercent = 100 / (quizAll.length - 1);
        
           

            initProgress();
            removeBtn();
    
            quiz_form.querySelector('.allQ').textContent = `${quizAll.length}`;
    
            nextBtn.addEventListener('click', function () {
                currentQ.textContent++;
                count++;
                progress += Number(progressPercent.toFixed(3));
                initQuiz();
                initProgress();
                removeBtn();
            })
    
    
            PrevBtn.addEventListener('click', function () {
                count--
                currentQ.textContent--;
                progress -= Number(progressPercent.toFixed(3));
                initQuiz();
                initProgress();
                removeBtn();
            })
    
            function initQuiz() {
                

                quizAll.forEach((element, i) => {
                    element.classList.remove('active');
                    if (i === count) {
                        element.classList.add('active');
                    }
                })
            }
    
            function initProgress() {
                /*if(startQuizFl === 1 ) {
                    progress = 0;
                }*/
                progressQ.style.width = `${progress}%`;
            }
    
            function removeBtn() {
                /*if(startQuizFl === 1 )
                {
                 count = 0;   
                 startQuiz();
                 startQuizFl =0;
                 quiz_form.reset();
                }*/
                if (count === 0) {
                    PrevBtn.style.display = 'none'
                } else if (count !== 0) {
                    PrevBtn.style.display = 'block'
                }
                if (count === quizAll.length - 1) {
                    nextBtn.style.display = 'none'
                } else if (count !== quizAll.length) {
                    nextBtn.style.display = 'block'
                }
            }

            function startQuiz() {
                if(quizAll.length > 0){
                    quizAll[0].classList.add('active');
                    
                for (let index = 1; index < quizAll.length; index++) {
                    quizAll[index].classList.remove('active');
                }
                initProgress(0);
                removeBtn(0);
            }
            }
        }
    })