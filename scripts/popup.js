'use strict';

const newFolderButton = document.querySelector('.fa-folder-plus');
const deleteModeButton = document.querySelector('.fa-folder-minus');

const newFolderFormCloseButton = document.querySelector('#folder-form-close-button');
const newLinkFormCloseButton = document.querySelector('#link-form-close-button');
const deleteFolderFormCloseButton = document.querySelector('#delete-folder-form-close-button');
const deleteLinkFormCloseButton = document.querySelector('#delete-link-form-close-button');

const deleteFolderFormContainer = document.querySelector('.delete-folder-form-container');
const deleteLinkFormContainer = document.querySelector('.delete-link-form-container');
const newFolderFormContainer = document.querySelector('.new-folder-form-container');
const newLinkFormContainer = document.querySelector('.new-link-form-container');

newFolderButton.addEventListener('click', () => {
  newFolderFormContainer.classList.add('flex');
});

newFolderFormCloseButton.addEventListener('click', () => {
  newFolderFormContainer.classList.remove('flex');
});

newLinkFormCloseButton.addEventListener('click', () => {
  newLinkFormContainer.classList.remove('flex');
});

deleteFolderFormCloseButton.addEventListener('click', () => {
  deleteFolderFormContainer.classList.remove('flex');
});

deleteLinkFormCloseButton.addEventListener('click', () => {
  deleteLinkFormContainer.classList.remove('flex');
});

/*
  DELETE MODE
*/
const confirmFolderDeletionButton = document.querySelector('.delete-folder-form button');
const confirmLinkDeletionButton = document.querySelector('.delete-link-form button');

const folderForDeletionContainer = document.getElementById('folder-for-deletion');
const linkForDeletionContainer = document.getElementById('link-for-deletion');

const foldersInfoContainers = document.getElementsByClassName('folder-info-container');

let folderTrashCanIndex = 0;
let linkTrashCanIndex = 0;

deleteModeButton.addEventListener('click', () => {
  const linksTrashCans = document.getElementsByClassName('fa-trash-can');
  const foldersTrashCans = document.getElementsByClassName('fa-trash-arrow-up');
  const caretDown = document.getElementsByClassName('fa-caret-down');
  const caretRight = document.getElementsByClassName('fa-caret-right');

  if((linksTrashCans == undefined) && (foldersTrashCans == undefined)) {
    return;
  }

  if(deleteModeButton.classList.contains('on')) {
    deleteModeButton.classList.remove('on');

    for(let trashCan of linksTrashCans) {
      trashCan.classList.add('display-none');
    }  

    for(let trashCan of foldersTrashCans) {
      trashCan.classList.add('display-none');
    } 

    for(let caret of caretDown) {
      caret.classList.remove('hidden-element');
    }  

    for(let caret of caretRight) {
      caret.classList.remove('hidden-element');
    }

    refreshObjectsBodies();

  } else {
    deleteModeButton.classList.add('on');

    for(let trashCan of linksTrashCans){
      trashCan.classList.remove('display-none');
    }

    for(let trashCan of foldersTrashCans){
      trashCan.classList.remove('display-none');
    }

    for(let caret of caretDown) {
      caret.classList.add('hidden-element');
    }  

    for(let caret of caretRight) {
      caret.classList.add('hidden-element');
    } 

    refreshObjectsBodies();
  }
});

function deleteFolder(folderIndex){
  deleteFolderFormContainer.classList.remove('flex');

  bookmarksManager.splice(folderIndex, 1);
  refreshBookmarksManager();
  refreshEventListeners();
}

function deleteLink(linkIndex){
  const userLinksNames = document.querySelectorAll('.stellar-link p');
  let currentLinkName = String(userLinksNames[linkIndex].innerText);
  let objectIndex = bookmarksManager.findIndex((folder) => {
    let result = folder.arrayOfLinks.some((link) => link.name === currentLinkName);

    if(result === true) return true;
  });

  let linkIndexInObject = bookmarksManager[objectIndex].arrayOfLinks.findIndex((link) => link.name == currentLinkName);
  
  bookmarksManager[objectIndex].arrayOfLinks.splice(linkIndexInObject, 1);

  deleteLinkFormContainer.classList.remove('flex');
  
  refreshObjectsBodies();
  refreshBookmarksManager();
  refreshEventListeners();
}

function refreshTrahscansEventListeners(){
  const stellarLinks = document.querySelectorAll('.stellar-link-container');

  for(let i = 0; i < linksTrashCans.length; i++) {
    let trashCanId = 'trash-can-id-' + i;
    linksTrashCans[i].setAttribute('id', trashCanId);

    linksTrashCans[i].addEventListener('click', () => {
      deleteLinkFormContainer.classList.add('flex');
      
      linkTrashCanIndex = i
      linkForDeletionContainer.innerHTML = stellarLinks[i].innerHTML;

      return linkTrashCanIndex;
    });
    
  }  

  for(let i = 0; i < foldersTrashCans.length; i++) {
    foldersTrashCans[i].addEventListener('click', () => {
      deleteFolderFormContainer.classList.add('flex');

      folderTrashCanIndex = i;
      folderForDeletionContainer.innerHTML = foldersInfoContainers[i].innerHTML + '<i class="fa-solid fa-trash-arrow-up"></i>';

      return folderTrashCanIndex;
    });
  }
}

confirmFolderDeletionButton.addEventListener('click', () => {deleteFolder(folderTrashCanIndex)});
confirmLinkDeletionButton.addEventListener('click', () => {deleteLink(linkTrashCanIndex)});

/*
  TOTAL CLEANUP
*/

const cleanupIcon = document.querySelector('.fa-arrow-rotate-right');
const totalCleanupForm = document.querySelector('.total-cleanup-form-container');
const totalCleanupFormCloseButton = document.querySelector('#total-cleanup-form-close-button');
const totalCleanupFormConfirmButton = document.querySelector('.total-cleanup-form-container button');

cleanupIcon.addEventListener('click', () => {
  totalCleanupForm.classList.add('flex');
});

totalCleanupFormCloseButton.addEventListener('click', () => {
  totalCleanupForm.classList.remove('flex');
})

totalCleanupFormConfirmButton.addEventListener('click', () => {
  bookmarksManager = [];
  refreshBookmarksManager();

  totalCleanupForm.classList.remove('flex');
})