const v=1.2
var allExclusivesHidden = true;

function init() {
	nixieBlueIt();
	window.addEventListener('hashchange',() =>{
		swapTab();
	});
	swapTab();
}

function swapTab() {
	var hash = window.location.hash.substring(1);
	if (hash != "" && document.getElementById(hash) != undefined) {
		document.getElementById(hash).click();
	}
}

function setHash(hash) {
	hash = "#" + hash;
	if(history.replaceState) {
		history.replaceState(null, null, hash);
	} else {
		window.location.hash = hash;
	}
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function nixieBlueIt() {
    if (randInt(1,4) == 4) {
        document.getElementById("nixie").style.backgroundImage = "url(images/portraits/nixieBlue.png)";
    }
}

function exclusiveToggleContent(id) {
	let ele=document.getElementById(id);
	let elea=document.getElementById(id+`a`);
	let prefix=`<span class="postSeasonTableShowContents">`;
	let suffix=`</span>`;
	if (ele!=undefined&&elea!=undefined) {
		if (ele.hidden) {
			ele.hidden=false;
			elea.innerHTML=`${prefix}[hide contents]${suffix}`;
		} else {
			ele.hidden=true;
			elea.innerHTML=`${prefix}[show contents]${suffix}`;
		}
	}
}

function exclusiveToggleAllContents() {
	let eles = document.getElementsByClassName(`postSeasonTableRowShowHide`);
	allExclusivesHidden = !allExclusivesHidden;
	for (let ele of eles) {
		ele.hidden = allExclusivesHidden;
	}
	let show=allExclusivesHidden?`show`:`hide`;
	let hide=allExclusivesHidden?`hide`:`show`;
	document.getElementById(`showHideAll`).innerHTML=`[${show} all contents]`;
	eles = document.getElementsByClassName(`postSeasonTableShowContents`);
	for (let ele of eles) {
		if (ele.innerHTML==`[${hide} contents]`)
			ele.innerHTML=`[${show} contents]`;
	}
}

init();