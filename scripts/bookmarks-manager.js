const mainFoldersContainer = document.querySelector('.folders-container');

const createNewFolderConfirmButtom = document.querySelector('.new-folder-form button');
const folderNameInput = document.getElementById('folder-name-input');
const folderColorInput = document.getElementById('folder-color-input');

const createNewLinkConfirmButtom = document.querySelector('.new-link-form button');
const linkNameInput = document.getElementById('link-name-input');
const linkUrlInput = document.getElementById('link-url-input');
const linkColorInput = document.getElementById('link-color-input');

const linksTrashCans = document.getElementsByClassName('fa-trash-can');
const foldersTrashCans = document.getElementsByClassName('fa-trash-arrow-up');

let indexOfCreateLinkButton = 0;

const bookmarksManager = [
  {
    name: 'Test Folder',
    body: `
      <div class="folder">
        <i class="fa-solid fa-trash-arrow-up ${changeTrashCansStatus()}"></i>
        <div class="folder-info-container">
          <i class="fa-solid fa-folder-open"></i>
          <p>Test Folder</p>
          <i class="fa-solid fa-caret-down ${changeCaretsStatus()}"></i>
        </div>
        <div class="folder-content-container open">     
          ${findAllLinksBody(this.arrayOfLinks)}
          <div class="create-new-link-button">
            <i class="fa-solid fa-plus"></i>
            <p>Add new link</p> 
          </div>
        </div>
      </div>`,
    arrayOfLinks: [
      {
        name: 'Test Link',
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        body: `
          <div class="stellar-link-container">
            <span class="stellar-icon"></span>
        
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="stellar-link" target="_blank">
              <p>Test Link</p>   
            </a>
        
            <i class="fa-solid fa-trash-can ${changeTrashCansStatus()}"></i>
          </div>`,
        
        refreshLinksBody() {
          this.body = `
            <div class="stellar-link-container">
              <span class="stellar-icon"></span>
          
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="stellar-link" target="_blank">
                <p>Test Link</p>   
              </a>
          
              <i class="fa-solid fa-trash-can ${changeTrashCansStatus()}"></i>
            </div>`;
        }
      },
    ],
    refreshFolderBody() {
      this.body = `
        <div class="folder">
          <i class="fa-solid fa-trash-arrow-up ${changeTrashCansStatus()}"></i>
          <div class="folder-info-container">
            <i class="fa-solid fa-folder-open"></i>
            <p>${this.name}</p>
            <i class="fa-solid fa-caret-down ${changeCaretsStatus()}"></i>
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
  },
];

bookmarksManager[indexOfCreateLinkButton].refreshFolderBody();
refreshBookmarksManager();
refreshEventListeners();//Первый запуск для тестовых папок, ссылок

function CreateNewFolder() {
  this.name = folderNameInput.value;
  this.color = hexToRGBA(folderColorInput.value, 1, 0, 0, 0);
  this.body = `
    <div class="folder">
      <i class="fa-solid fa-trash-arrow-up ${changeTrashCansStatus()}"></i>
      <div class="folder-info-container">
        <i class="fa-solid fa-folder-open" style="color: ${this.color};"></i>
        <p>${this.name}</p>
        <i class="fa-solid fa-caret-down ${changeCaretsStatus()}"></i>
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
      <i class="fa-solid fa-trash-arrow-up ${changeTrashCansStatus()}"></i>
      <div class="folder-info-container">
        <i class="fa-solid fa-folder-open" style="color: ${this.color};"></i>
        <p>${this.name}</p>
        <i class="fa-solid fa-caret-down ${changeCaretsStatus()}"></i>
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
  this.iconBoxShadow = `box-shadow: 0 0 5px 0px ${hexToRGBA(linkColorInput.value, 1, 1, -8, 7)};`;
  this.iconBackground = `style="background: radial-gradient(circle, ${hexToRGBA(linkColorInput.value, 0.5, 0, 0, 0)} 0%, 
    ${hexToRGBA(linkColorInput.value, 1, 1, -8, 7)} 100%); ${this.iconBoxShadow}"`;
  this.body = `
    <div class="stellar-link-container">
      <span class="stellar-icon" ${this.iconBackground}></span>
  
      <a href="${this.url}" class="stellar-link" target="_blank">
        <p>${this.name}</p>   
      </a>
  
      <i class="fa-solid fa-trash-can ${changeTrashCansStatus()}"></i>
    </div>`;
  this.refreshLinksBody = function(){
    `
    <div class="stellar-link-container">
      <span class="stellar-icon" ${this.iconBackground}></span>
  
      <a href="${this.url}" class="stellar-link" target="_blank">
        <p>${this.name}</p>   
      </a>
  
      <i class="fa-solid fa-trash-can ${changeTrashCansStatus()}"></i>
    </div>`
  };
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

function refreshEventListeners(){
  const foldersInfoContainers = document.getElementsByClassName('folder-info-container');
  const createNewLinkButtons = document.querySelectorAll('.create-new-link-button');

  for(let i = 0; i < foldersInfoContainers.length; i++) {
    let folderId = 'folder-id-' + [i];
    let buttonId = [i];
    foldersInfoContainers[i].setAttribute('id', `${folderId}`);
    foldersInfoContainers[i].addEventListener('click', () => {
      closeOrOpenFolder(folderId);
    })
    createNewLinkButtons[i].addEventListener('click', () => {
      openLinkCreationForm(buttonId);
    })
  }

  refreshTrahscansEventListeners();
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

function hexToRGBA(hex, alpha, rCorrection, gCorrection, bCorrection) {
  let r = parseInt(hex.slice(1, 3), 16) + rCorrection;
  let  g = parseInt(hex.slice(3, 5), 16) + gCorrection;
  let  b = parseInt(hex.slice(5, 7), 16) + bCorrection;

  return `rgba(${r}, ${g}, ${b}, ${alpha} )`;
}

function changeTrashCansStatus(){
  if(deleteModeButton.classList.contains('on')) {
    return ``;
  } else {
    return `display-none`;
  }
}

function changeCaretsStatus(){
  if(deleteModeButton.classList.contains('on')) {
    return `hidden-element`;
  } else {
    return ``;
  }
}

createNewFolderConfirmButtom.addEventListener('click', () => {
  bookmarksManager.push(new CreateNewFolder());

  refreshBookmarksManager();
  refreshEventListeners();

  newFolderFormContainer.classList.remove('flex');
});

createNewLinkConfirmButtom .addEventListener('click', () => {
  bookmarksManager[indexOfCreateLinkButton].arrayOfLinks.push(new CreateNewLink());
  refreshObjectsBodies();

  refreshBookmarksManager();
  refreshEventListeners();

  newLinkFormContainer.classList.remove('flex');
});