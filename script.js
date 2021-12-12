
// there are a lot of features i could add, but i decided to stop here
// some features that could be added
// 1) sanitize inputs - know this is important but not sure how to do yet
// 2) text inputs are currently limited to 30 characters, but might be nice to 
//    allow up to two lines with wrapped text
// 3) should check that image input is a valid url to an image and alert
//    user if it isn't valid

function storeMeme() {
    imageUrl = document.getElementById("imageUrl").value;
    upperText = document.getElementById("upperText").value;
    lowerText = document.getElementById("lowerText").value;
    meme = [imageUrl,upperText,lowerText];
    memes.push(meme);
    localStorage.setItem("memes",JSON.stringify(memes));
    for (value of document.querySelectorAll("input")){
        value.value = "";
    }
    return meme;
}

function displayMeme(meme) {

    memeCntnr = document.createElement("div");
    memeCntnr.className = "meme";
    memeCntnr.id = document.querySelectorAll(".meme").length;

    memeImg = document.createElement("img");
    memeImg.src = meme[0];
    
    upperText = document.createElement("span");
    upperText.className = "upperText";
    upperText.innerText = meme[1];
  
    lowerText = document.createElement("span");
    lowerText.className = "lowerText";
    lowerText.innerText = meme[2];

    delBtn = document.createElement("span");
    delBtn.className = "delBtn";
    delBtn.innerText = "x";
    delBtn.addEventListener("click",deleteMeme);

    document.getElementById("right").prepend(memeCntnr);
    memeCntnr.append(memeImg);
    memeCntnr.append(upperText);
    memeCntnr.append(lowerText);
    memeCntnr.append(delBtn);

}

function addMeme(form) {
    form.preventDefault();
    meme = storeMeme();
    displayMeme(meme);
}

function deleteMeme(meme) {
    meme = meme.target.parentElement;
    console.log("delete meme "+meme.id);
    memes.splice(meme.id,1);
    console.log(memes);
    meme.remove();
    localStorage.setItem("memes",JSON.stringify(memes));

    // reset ids
    for (let i = 0; i < memes.length; i++) {
        document.querySelectorAll(".meme")[i].id = memes.length - 1 - i;
    }
}

function loadMemes() {
    memes = JSON.parse(localStorage.getItem("memes"));
    if (memes == null) {
        memes = [];
    }
    for (meme of memes){
        displayMeme(meme);
    }
}

memes = [];
loadMemes();
document.querySelector("form").addEventListener("submit",addMeme)
