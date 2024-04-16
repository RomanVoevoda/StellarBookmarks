const mainFoldersContainer = document.querySelector('.folders-container');

const createNewFolderConfirmButtom = document.querySelector('.new-folder-form button');
const folderNameInput = document.getElementById('folder-name-input');

const createNewLinkConfirmButtom = document.querySelector('.new-link-form button');
const linkNameInput = document.getElementById('link-name-input');
const linkUrlInput = document.getElementById('link-url-input');


let indexOfCreateLinkButton = 0;

const bookmarksManager = [];

function CreateNewFolder() {
  this.name = folderNameInput.value;
  this.body = `
    <div class="folder">
      <div class="folder-info-container">
        <i class="fa-solid fa-folder-open"></i>
        <p>${this.name}</p>
        <i class="fa-solid fa-caret-down"></i>
      </div>
      <div class="folder-content-container open">     
        ${findAllLinksBody(this.arrayOfLinks)}
        <div class="create-new-link-button">
          <i class="fa-solid fa-plus"></i>
          <p>Add new link</p> 
        </div>
      </div>
    </div>`
  this.arrayOfLinks = [];
  this.refreshFolderBody = function() {
    this.body = `
    <div class="folder">
      <div class="folder-info-container">
        <i class="fa-solid fa-folder-open"></i>
        <p>${this.name}</p>
        <i class="fa-solid fa-caret-down"></i>
      </div>
      <div class="folder-content-container open">
        ${findAllLinksBody(this.arrayOfLinks)}
        <div class="create-new-link-button">
          <i class="fa-solid fa-plus"></i>
          <p>Add new link</p> 
        </div>
      </div>
    </div>`

  }
}

function CreateNewLink() {
  this.name = linkNameInput.value;
  this.url = linkUrlInput.value;
  this.body = `
    <div class="stellar-link-container">
      <span class="stellar-icon"></span>
  
      <a href="${this.url}" class="stellar-link" target="_blank">
        <p>${this.name}</p>   
      </a>
  
      <i class="fa-solid fa-trash-can display-none"></i>
    </div>`
}

function findAllLinksBody(arr) {
  if(arr == undefined || arr == null) {
    return `<div class="folder-links-container"></div>`;
  }

  let str = ``;

  for(let element of arr) {
    str += element.body;
  }

  return `<div class="folder-links-container">` + str + `</div>`;
}

function refreshBookmarksManager() {
  let allFolders = ``;
  for(let element of bookmarksManager) {
    allFolders += element.body;
  }

  mainFoldersContainer.innerHTML = allFolders;
}

function addAttributesForFolders(){
  const foldersInfoContainers = document.getElementsByClassName('folder-info-container');
  const createNewLinkButtons = document.querySelectorAll('.create-new-link-button');

  for(let i = 0; i < foldersInfoContainers.length; i++) {
    let folderId = 'folder-id-' + [i];
    let buttonId = [i];
    foldersInfoContainers[i].setAttribute('id', `${folderId}`);
    foldersInfoContainers[i].setAttribute('onclick', `closeOrOpenFolder("` + `${folderId}` + `")`);
    createNewLinkButtons[i].setAttribute('onclick', `openLinkCreationForm("` + `${buttonId}` + `")`);
  }
}

function closeOrOpenFolder(folderId) {
  const infoContainerFolderIcon = document.querySelector('#' + folderId + ' i:first-child');
  const infoContainerCaretIcon = document.querySelector('#' + folderId + ' i:last-child');
  const folderContentContainer = document.querySelector('div#' + folderId + ' + div');


  if(infoContainerFolderIcon.classList.contains('fa-folder-open')) {
    infoContainerFolderIcon.classList.remove('fa-folder-open');
    infoContainerCaretIcon.classList.remove('fa-caret-down');
    folderContentContainer.classList.remove('open');

    infoContainerFolderIcon.classList.add('fa-folder');
    infoContainerCaretIcon.classList.add('fa-caret-right');
  } else {
    infoContainerFolderIcon.classList.add('fa-folder-open');
    infoContainerCaretIcon.classList.add('fa-caret-down');
    folderContentContainer.classList.add('open');

    infoContainerFolderIcon.classList.remove('fa-folder');
    infoContainerCaretIcon.classList.remove('fa-caret-right');
  }
}

function openLinkCreationForm(id) {
  newLinkFormContainer.classList.add('flex');
  indexOfCreateLinkButton = id;
}

createNewFolderConfirmButtom.addEventListener('click', () => {
  bookmarksManager.push(new CreateNewFolder());
  refreshBookmarksManager();
  newFolderFormContainer.classList.remove('flex');
  addAttributesForFolders();
});

createNewLinkConfirmButtom .addEventListener('click', () => {
  bookmarksManager[indexOfCreateLinkButton].arrayOfLinks.push(new CreateNewLink());

  bookmarksManager[indexOfCreateLinkButton].refreshFolderBody();
  refreshBookmarksManager();
  addAttributesForFolders();
  newLinkFormContainer.classList.remove('flex');
});