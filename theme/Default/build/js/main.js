function getRandomArbitrary(n,e){return Math.floor(Math.random()*(e-n)+n)}var continueBtns,backBtn,currLesson,firstLesson,lastLesson,events={closeBtnEvent:function(n){"object"==typeof LMS&&(LMS.setStatus("complete"),LMS.close()),window.close()},navigateToNextLesson:function(n){n&&n.preventDefault(),"object"==typeof LMS&&(LMS.setStatus("complete"),LMS.next())},backBtnHandler:function(n){"object"==typeof LMS&&LMS.previous()}},bindEvents=function(){for(var n=0;n<continueBtns.length;n++)continueBtns[n].addEventListener("click",events.navigateToNextLesson,!1);backBtn.addEventListener("click",events.backBtnHandler,!1)},unbindEvents=function(){for(var n=0;n<continueBtns.length;n++)continueBtns[n].removeEventListener("click",events.navigateToNextLesson,!1);backBtn.removeEventListener("click",events.backBtnHandler,!1)},themeInitialize=function(){continueBtns=document.querySelectorAll(".advance"),backBtn=document.getElementById("nav-back"),mainContent=document.getElementById("main-content"),mainContent&&mainContent.classList.add("origin-"+getRandomArbitrary(0,3)),bindEvents()};window.addEventListener("load",themeInitialize,!1);