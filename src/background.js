'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
      }, 你好啊, It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    // Send a response message
    sendResponse({
      message,
    });
  }
});

function changeColor () {
  $('.ec-tuiguang').parents(".c-container, .new-pmd, .EC_result").css('opacity', '0.2');
}

function start () {
  setTimeout(() => {
    changeColor()
    start()
  }, 1000)
}

start()