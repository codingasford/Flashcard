// define events
// by using $(document).on(event, target) we make this dynamic
// meaning we don't need to add an event listener to each ".card"

$(document)
  .on("click", "#select", SelectMode)
  .on("click", ".card", CardFlip)
  .on("click", ".card", ToggleCardSelect)
  .on("click", "#delete", Delete)
  
  // NOTE:: These 2 functions can be replaced with CSS
  //        if they are purely cosmetic/visual.
  //        I've left them in for this example
  .on("mouseover", ".card", MouseOverWrapper)
  .on("mouseleave", ".card", MouseLeaveWrapper);
  
// global variables
let selectMode = false;
const selectButton = document.getElementById("select");
let testCheck = false;

// functions
function CardFlip(event) {
    if (selectMode) {
        // don't do anything if selectMode is true
        return;
    }
    
    const $card    = $(event.currentTarget);
    const cardData = $card.data(); // jQuery data store
    const $content = $card.find("p"); // get "p" elements inside this card
    
    // determine current side based on class
    // there are other ways to do this, but for simplicity
    // we can use a class
    if ($card.hasClass("back")) {
      $content.text(cardData.frontInput);
      $card.removeClass("back");
    } else {
      $content.text(cardData.backInput);
      $card.addClass("back");
    }
}

function MouseOverWrapper(event) {
    if (!selectMode) {
        // don't do anything if selectMode is false
        return;
    }
    
    // don't have to use jQuery if you're more comfortable
    // using vanilla JS
    const card = event.currentTarget;
    card.style.backgroundColor = "lightblue";
}

function MouseLeaveWrapper(event) {
    if (!selectMode) {
        // don't do anything if selectMode is false
        return;
    }
    
    const card = event.currentTarget;
    card.style.backgroundColor = "";
}



function ToggleCardSelect(event){
    if(selectMode){
        const card = event.currentTarget;

        //if card is not already selected, add select class
        if(card.classList.contains("card-selected")) {
            console.log("selected card clicked")
            card.classList.remove("card-selected");    
        } else {
            console.log("unselected card clicked")
            card.classList.add("card-selected");
        }
        

        //if card already selected, remove select class
    }
};


function AddFlashCard(event) {
    event.preventDefault();
    testCheck = true;
    
    const form = document.querySelector("form");
    const formData = new FormData(form);  
    const titleInput = formData.get("card-title-input");
    const frontInput = formData.get("card-front-input");
    const backInput = formData.get("card-back-input");
    const cardContainer = document.querySelector("#card-container");
    
   
   
    let card = document.createElement("div");
    card.classList.add("card");

    let title = document.createElement("h3");
    title.classList.add("card-content-title");
    title.textContent = titleInput;

    let content = document.createElement("p");
    content.classList.add("card-content");
    content.textContent = frontInput;


    card.appendChild(title);
    card.appendChild(content);
    cardContainer.appendChild(card);
    
    // add data to card
    const $card = $(card);
    $card
      .data("backInput", backInput)
      .data("frontInput", frontInput);
    
    // no need to setup events here.
    // all are dynamic


    //ADD CARD DATA TO SAVE.JSON FILE
    



    
    return false;
}

function SelectMode() {

    //select mode already on, turn it off
    //deselect all cuz mode turning off
  if(selectMode){
    $(".card-selected").removeClass("card-selected");
  }
  
  //toggle delete button and select mode
  $("#delete").toggle();
  selectMode = !selectMode;
}

function Delete() {
    $(".card-selected").remove();
}


