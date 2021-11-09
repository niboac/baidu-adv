'use strict';

function throttle (fn, wait) {
  let callback = fn;
  let timerId = null;

  // 是否是第一次执行
  let firstInvoke = true;

  function throttled () {
    let context = this;
    let args = arguments;

    // 如果是第一次触发，直接执行
    if (firstInvoke) {
      callback.apply(context, args);
      firstInvoke = false;
      return;
    }

    // 如果定时器已存在，直接返回。        
    if (timerId) {
      return;
    }

    timerId = setTimeout(function () {
      // 注意这里 将 clearTimeout 放到 内部来执行了
      clearTimeout(timerId);
      timerId = null;

      callback.apply(context, args);
    }, wait);
  }

  // 返回一个闭包
  return throttled;
}

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

function changeColor () {
  $('.ec-tuiguang').parents(".c-container, .new-pmd, .EC_result").css('opacity', '0.2');
}

// setTimeout(() => {
//   $("body").on('DOMSubtreeModified', 'div', function () {
//     console.log('changed');

//   });
// }, 1000)

// document.addEventListener("DOMSubtreeModified", function (e) {
//   // Notify of change!
//   throttle(function () {
//     console.warn("change!改变");
//   }, 100)
// }, false);
function start () {
  setTimeout(() => {
    changeColor()
    start()
  }, 1000)
}

start()

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  response => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});
