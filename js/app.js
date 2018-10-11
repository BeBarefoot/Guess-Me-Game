'use strict';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;
var gStore
$(document).ready(init);

function init() {

    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi',1);
    gQuestsTree.no = createQuest(localStorage.getItem('question'),1)
    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    $('.gameStart').hide()
    renderQuest();
    $('.gameQuest').show()
}

function renderQuest() {
    $('.quest-title').text(gCurrQuest.txt)
    
}

function userResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!')
            // TODO: improve UX
        } else {
            $('.gameNewQuest').show()
            $('.gameQuest').hide()
                }
    } else {
        if (res === 'yes') {
            gQuestsTree = gQuestsTree.yes
            gLastRes=res
        
        } else {
            gQuestsTree=gQuestsTree.no
            gLastRes=res
        }
               
        gPrevQuest = gCurrQuest
        gCurrQuest = gQuestsTree
        renderQuest();
    }
}

function addGuess() {

    localStorage.setItem('question', JSON.stringify($('#newQuest').val()))
    localStorage.setItem('guess', JSON.stringify($('#newGuess').val()))

    // TODO: connect the 2 Quests to the quetsions tree


    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null,
        num:num
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}