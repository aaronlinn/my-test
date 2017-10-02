var continueBtns, backBtn, currLesson, firstLesson, lastLesson;

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var events = {

  /* Navigation =========================================================== */
  closeBtnEvent: function(e) {
    if (typeof LMS === 'object') {
      LMS.setStatus('complete');
      LMS.close();
    }

    window.close();
  },

  navigateToNextLesson: function(e) {
    if (e) {
      e.preventDefault();
    }

    if (typeof LMS === 'object') {
      LMS.setStatus('complete');
      LMS.next();
    }
  },

  backBtnHandler: function(e) {
    if (typeof LMS === 'object') {
      LMS.previous();
    }
  }

};


var bindEvents = function() {
  // page navigation
  for (var i = 0; i < continueBtns.length; i++) {
    continueBtns[i].addEventListener('click', events.navigateToNextLesson, false);
  }
  backBtn.addEventListener('click', events.backBtnHandler, false);
};


var unbindEvents = function() {
  // page navigation
  for (var i = 0; i < continueBtns.length; i++) {
    continueBtns[i].removeEventListener('click', events.navigateToNextLesson, false);
  }
  backBtn.removeEventListener('click', events.backBtnHandler, false);
};


var themeInitialize = function() {
  continueBtns = document.querySelectorAll('.advance');
  backBtn      = document.getElementById('nav-back');
  mainContent  = document.getElementById('main-content');

  if (mainContent) {
    mainContent.classList.add('origin-' + getRandomArbitrary(0,3));
  }

  bindEvents();

};

window.addEventListener('load', themeInitialize, false);