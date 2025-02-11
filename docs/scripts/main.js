const v=1.4;
const patronSort = document.getElementById("patronSort");
var allExclusivesHidden = true;
var allExclusiveFeatsHidden = false;

function init() {
	nixieBlueIt();
	window.addEventListener('hashchange',() =>{
		swapTab();
	});
	
	if (patronSort!=null&&patronSort!=undefined)
		patronSort.addEventListener(`change`,sortPatrons);
	
	swapTab();
}

function swapTab() {
	var hash = window.location.hash.substring(1);
	if (hash != "" && document.getElementById(hash) != undefined)
		document.getElementById(hash).click();
}

function setHash(hash) {
	hash = "#" + hash;
	if(history.replaceState)
		history.replaceState(null, null, hash);
	else
		window.location.hash = hash;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function nixieBlueIt() {
    if (randInt(1,4) == 4)
        document.getElementById("nixie").style.backgroundImage = "url(images/portraits/nixieBlue.png)";
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
	for (let ele of eles)
		ele.hidden = allExclusivesHidden;
	let show=allExclusivesHidden?`show`:`hide`;
	let hide=allExclusivesHidden?`hide`:`show`;
	document.getElementById(`showHideAll`).innerHTML=`[${show} all contents]`;
	eles = document.getElementsByClassName(`postSeasonTableShowContents`);
	for (let ele of eles)
		if (ele.innerHTML==`[${hide} contents]`)
			ele.innerHTML=`[${show} contents]`;
}

function exclusiveToggleAllFeats() {
	let eles = document.getElementsByClassName(`featTableRow`);
	allExclusiveFeatsHidden = !allExclusiveFeatsHidden;
	for (let ele of eles)
		ele.style.display = allExclusiveFeatsHidden?`none`:``;
	document.getElementById(`showHideFeats`).innerHTML=`[${allExclusiveFeatsHidden?`show`:`hide`} all feats]`;
}

function sortPatrons() {
	let optGroup = document.querySelector('#patronSort option:checked').parentElement.label;
	let value = patronSort.value;
	let asc = false;
	if (optGroup == `Ascending`)
		asc = true;
	let eles = document.querySelectorAll('[data-sort]');
	for (let ele of eles) {
		let split = ele.dataset.sort.split(",");
		let index = 0;
		switch (value) {
			case "name": index=1; break;
			case "seat": index=2; break;
			case "mirt": index=3; break;
			case "vajra": index=4; break;
			case "strahd": index=5; break;
			case "zariel": index=6; break;
			case "elminster": index=7; break;
			default: index=0;
		}
		let order = split[index];
		if (!asc)
			order = -order;
		ele.style.order = `${order}`;
	}
}

init();