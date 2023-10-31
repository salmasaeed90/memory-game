
//remove control button and start game

document.querySelector('.control-buttons span').onclick = function () {
    let yourName = prompt('WAHTS YOUR NAME?');
    if (yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "unknown"
    }else{
        document.querySelector(".name span").innerHTML = yourName
    }
    document.querySelector(".control-buttons").remove();
}
//start game code
let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

// let orderRange = [...Array(blocks.length).keys()]; 
let orderRange = Array.from(Array(blocks.length).keys()); 

//trigger shuffle function
shuffle(orderRange);

blocks.forEach((block,index) => {
    // add order css style
    block.style.order = orderRange[index];
    //add click event
    block.addEventListener('click', function () {
        //trigger the flip block function
        flipBlock(block);
    })
});

//flipped function
function flipBlock (selectedBlock) {
    //add class is-flipped    // selectedBlock.style.transform = "rotateY(180deg)";

    selectedBlock.classList.add('is-flipped');

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock =>flippedBlock.classList.contains('is-flipped'));
    //if theres two selected blocks
    if(allFlippedBlocks.length === 2){
        //console.log("2");
        //stop clicking function
        stopClicking();
        //matched blocks function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    } 
    

}
// stop clicking function
function stopClicking() {
    //add no-clicking class
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        //remove no-clicking class
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}
// matched blocks function
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-matched");
        secondBlock.classList.add("has-matched");
        document.getElementById("success").play();
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        document.getElementById("fail").play();
    }
}

// shiffle function return array with shuflle numbers from 0 to 19
function shuffle(array){
    let current = array.length,
        temp,
        random;
    while(current > 0) { 
    //Get Random Element    
        random = Math.floor(Math.random() * current);
    //Decrease Length By One    
        current--;
    //[1] Save Current Element In Stash
        temp = array[current];
    //[2]Current Element = Random Element    
        array[current] = array[random];
    //[3] Random Element = Get Element From Stash     
        array[random] = temp
    }   
    return array;
}

