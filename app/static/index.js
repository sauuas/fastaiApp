// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    //supposed to display on log in
    const html = `
      <div>
      <div class='center'>
        <div class='title'>Classify lung images</div>
        <p>
          Use images of lung scans to see if it has <strong>pneumonia</strong> 
        </p>
        <div class='content'>
          <div class='no-display'>
            <input id='file-input'
                  class='no-display'
                  type='file'
                  name='file'
                  accept='image/*'
                  onchange='showPicked(this)'>
          </div>
          <button class='choose-file-button' type='button' onclick='showPicker()'>Select Image</button>
          <div class='upload-label'>
            <label id='upload-label'>No file chosen</label>
          </div>
          <div>
            <img id='image-picked' class='no-display' alt='Chosen Image' height='200'>
          </div>
          <div class='analyze'>
            <button id='analyze-button' class='analyze-button' type='button' onclick='analyze()'>Analyze</button>
          </div>
          <div class='result-label'>
            <label id='result-label'></label>
          </div>
        </div>
      </div>
    </div> `;
    guideList.innerHTML = html;
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    guideList.innerHTML = '<h5 class="center-align">Login to analyze xrays</h5>';
  }
};



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});