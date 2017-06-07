// functionality for showing/hiding the comments section

var showHideCommentsButton = document.querySelector('#show-hide-comments');
var commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

showHideCommentsButton.onclick = function() {
  var showHideText = showHideCommentsButton.textContent;
  if (showHideText === 'Show comments') {
    showHideCommentsButton.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideCommentsButton.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

// functionality for showing/hiding the audio transcript

var showHideTranscriptButton = document.querySelector('#show-hide-transcript');
var transcriptElement = document.querySelector('.transcript');

transcriptElement.style.display = 'none';

showHideTranscriptButton.onclick = function() {
  var showHideText = showHideTranscriptButton.textContent;
  if (showHideText === 'Show transcript') {
    showHideTranscriptButton.textContent = 'Hide transcript';
    transcriptElement.style.display = 'block';
  } else {
    showHideTranscriptButton.textContent = 'Show transcript';
    transcriptElement.style.display = 'none';
  }
};

// functionality for adding a new comment via the comments form

var form = document.querySelector('.comment-form');
var nameField = document.querySelector('#name');
var commentField = document.querySelector('#comment');
var list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

function submitComment() {
  var listItem = document.createElement('li');
  var namePara = document.createElement('p');
  var commentPara = document.createElement('p');
  var nameValue = nameField.value;
  var commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
}
