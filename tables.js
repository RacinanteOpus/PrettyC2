var game="";
function numberWithCommas(x,y) {
    return x.toFixed(y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function myToggle() {
  var x = document.getElementsByClassName("hideme");
  if (x[0].style.display === "table-cell") {
  	for (var i = 0; i < x.length; i++) {
	    	x[i].style.display = "none";
  	} 
  } else {
  	for (var i = 0; i < x.length; i++) {
	    	x[i].style.display = "table-cell";
  	} 
  }
}

function myTogglex() {
  var x = document.getElementsByClassName("hideme");
  for (var i = 0; i < x.length; i++) {
  if (x[i].style.display === "table-cell") {
    	x[i].style.display = "none";
  	} else {
    	x[i].style.display = "table-cell";
	}
  }
}

function getSave() {	
    var foo = document.getElementById("foo");
    foo.value = localStorage.getItem("trimpSave");
}
function doReset() {
	//alert("Not yet....");
	var validC2s = game.c2;
	var challenge;
	var level;
	var i;
	var myElement;
	var myElements = document.getElementsByTagName("input");
	
	for (i = 0; i < myElements.length; i++) {
            if (myElements[i].hasAttribute("name")) {
	       myElements[i].value = validC2s[myElements[i].name];
	   }
	}
	for (myKey in validC2s) {
		challenge = myKey;
		level = validC2s[myKey];
		updateC2reset(challenge,level)
	}
	updateWhatIf();
}

function updateC2reset(challenge,val) {
    	var hasMesmer = game.talents.mesmer.purchased;
	document.getElementById(challenge+"C").innerHTML = numberWithCommas(getBasicC2(val, hasMesmer, challenge),0) + '%';
	document.getElementById(challenge+"C").title = getBasicC2(val, hasMesmer, challenge);
}

function updateC2(challenge,val) {
    	var hasMesmer = game.talents.mesmer.purchased;
	document.getElementById(challenge+"C").innerHTML = numberWithCommas(getBasicC2(val, hasMesmer, challenge),0) + '%';
	document.getElementById(challenge+"C").title = getBasicC2(val, hasMesmer, challenge);
	updateWhatIf();
}

function updateWhatIf() {
	var x = document.getElementsByName("c2");
	var i;
	var newtotal = 0;
	for (i = 0; i < x.length; i++) {
		newtotal += Number(x[i].title);
	}
	document.getElementById("TotalC").innerHTML = numberWithCommas(newtotal,0) + '%';
	document.getElementById("TotalC").title = newtotal;
	
	x = document.getElementsByName("c2c");
	var newtotal2 = 0;
	for (i = 0; i < x.length; i++) {
		newtotal2 += Number(x[i].title);
	}
	document.getElementById("TotalCC").innerHTML = numberWithCommas(newtotal2,0) + '%';
	document.getElementById("TotalCC").title = newtotal2;
	var allc2 = newtotal+newtotal2;
	document.getElementById("TotalCa").innerHTML = numberWithCommas(allc2,0) + '%';
	document.getElementById("TotalCa").title = allc2;
	
	x = document.getElementsByName("c3");
	var newtotal3 = 0;
	for (i = 0; i < x.length; i++) {
		newtotal3 += Number(x[i].title);
	}
	document.getElementById("TotalC3").innerHTML = numberWithCommas(newtotal3,0) + '%';
	document.getElementById("TotalC3").title = newtotal3;
	var allc = allc2*(1+newtotal3/100);
	document.getElementById("TotalCs").innerHTML = numberWithCommas(allc,2) + '%';
	document.getElementById("TotalCs").title = allc;
}

function getBasicC2(HZE, isMesmer, challenge = "standard") {

  var zonesForBonus = 0; // zones needed for percentage increase
  var currentBonus = 0; // current percentage increases by

  var zonesForBonusIncrease = 0; // zones needed for bonus increase
  var bonusIncrease = 0; // bonus increases by how much

  var currentZone = 0; // current zone
  var currentPercent = 0; // current C2 percentage

  switch (challenge)
  {
  	case "standard":
    {
      zonesForBonus = 10;
      zonesForBonusIncrease = 100;
      bonusIncrease = isMesmer?3:1;
      currentBonus = isMesmer?3:1;
      break;
    }
  	case "Trimp":
    {
      zonesForBonus = 10;
      zonesForBonusIncrease = 40;
      bonusIncrease = 3;
      currentBonus = 3;
      break;
    }
  	case "Trapper":
    {
      zonesForBonus = 10;
      zonesForBonusIncrease = 50;
      bonusIncrease = 2;
      currentBonus = 1;
      break;
    }
  	case "Coordinate":
    {
      zonesForBonus = 3;
      zonesForBonusIncrease = 30;
      bonusIncrease = 1;
      currentBonus = 1;
      break;
    }
  	case "Obliterated":
    {
      zonesForBonus = 1;
      zonesForBonusIncrease = 10;
      bonusIncrease = 1;
      currentBonus = 1;
      break;
    }
  	case "Eradicated":
    {
      zonesForBonus = 1;
      zonesForBonusIncrease = 2;
      bonusIncrease = 2;
      currentBonus = 10;
      break;
    }
    case "Trappapalooza":
    {
      zonesForBonus = 10;
      zonesForBonusIncrease = 50;
      bonusIncrease = 2;
      currentBonus = 3;
      break;
    }
    default:
    {
      zonesForBonus = 10;
      zonesForBonusIncrease = 100;
      bonusIncrease = isMesmer?3:1;
      currentBonus = isMesmer?3:1;
      break;
    }
  }

  for (i = 0; i < Math.floor(HZE/zonesForBonus); i++)
  {
    currentZone += zonesForBonus;

  	var zonesAffected = currentZone - 701;
    var weirdBonus = 0;
    if (zonesAffected > 0 && zonesAffected < zonesForBonus)
    {
    	weirdBonus = 	Math.floor((currentBonus * (zonesForBonus-zonesAffected) +
      							currentBonus * 5 * zonesAffected) / zonesForBonus);
    }


    currentPercent += weirdBonus > 0 ? weirdBonus : currentBonus * (currentZone > 701 ? 5 : 1);
    if (currentZone%zonesForBonusIncrease == 0) currentBonus += bonusIncrease;
  }

	return currentPercent;
}


function getC2HZE(radiumHZE = 0){
	var zone = 701;
	zone += (radiumHZE > 100) ? 100 + (Math.floor(radiumHZE / 50) * 10) : Math.floor(radiumHZE / 10) * 10;
	return zone;
}

function doClick() {
    var foo = document.getElementById("foo");
    if (foo.value == "") return;
    localStorage.setItem("trimpSave", foo.value);

    var result = document.getElementById("result");
    var table = document.getElementById("c2table");
    var table2 = document.getElementById("c2table2");
    var table3 = document.getElementById("c3table");
    var body = table.getElementsByTagName("tbody")[0];
    var foot = table.getElementsByTagName("tfoot")[0];
    body.innerHTML = "";
    foot.innerHTML = "";
    var body2 = table2.getElementsByTagName("tbody")[0];
    var foot2 = table2.getElementsByTagName("tfoot")[0];
    body2.innerHTML = "";
    foot2.innerHTML = "";
    var body3 = table3.getElementsByTagName("tbody")[0];
    var foot3 = table3.getElementsByTagName("tfoot")[0];
    body3.innerHTML = "";
    foot3.innerHTML = "";
	
    var c1 = 0;	
    var c2 = 0;
    var c3 = 0;

    var easyC2 = ["Discipline", "Metal", "Size", "Balance", "Meditate"];
    var specialC2s = ["Trimp"];
    var challengesU2 = ["Unlucky", "Downsize", "Transmute", "Unbalance", "Duel"];

    game = JSON.parse(LZString.decompressFromBase64(foo.value));
    foo.value = "";

    var hasMesmer = game.talents.mesmer.purchased;
    var HZReached = game.global.highestLevelCleared+1;
    var radHZReached = game.global.highestRadonLevelCleared+1;
    var prisonClear = game.global.prisonClear;
    var totalC2 = game.global.totalSquaredReward;

    if(HZReached >= 70) specialC2s.push("Trapper");
    if(prisonClear == 1) easyC2.push("Electricity");
    if(HZReached >= 120) specialC2s.push("Coordinate");
    if(HZReached >= 130) easyC2.push("Slow");
    if(HZReached >= 145) easyC2.push("Nom");
    if(HZReached >= 150) easyC2.push("Mapology");
    if(HZReached >= 165) easyC2.push("Toxicity");
    if(HZReached >= 180) { easyC2.push("Watch"); easyC2.push("Lead"); }
    if(HZReached >= 425) specialC2s.push("Obliterated");
    if(totalC2 >= 4500) specialC2s.push("Eradicated");
	
    if(radHZReached >= 59) challengesU2.push("Trappapalooza");
    if(radHZReached >= 69) challengesU2.push("Wither");
    if(radHZReached >= 84) challengesU2.push("Quest");
    if(radHZReached >= 105) challengesU2.push("Storm");
    if(radHZReached >= 115) challengesU2.push("Berserk");

    for (var i = 0; i < easyC2.length; i++) {
     var key = easyC2[i];
     var isAlt = i%2;

     var row = body.insertRow(-1);

     var cellChallenge = row.insertCell(0);
     var cellHZE = row.insertCell(1);
     var cellC2Percent = row.insertCell(2);
     var cellWIHZE = row.insertCell(3);
     var cellWIPct = row.insertCell(4);
     cellWIHZE.setAttribute("class","hideme");
     cellWIPct.setAttribute("class","hideme");
	    
     if (game['c2'][key] !== undefined)
     {
        var c2HZE = Math.min(game['c2'][key], getC2HZE(radHZReached));
	var inpu = document.createElement("input");
		inpu.style="text-align: right;";
		inpu.size=3;
		inpu.value=c2HZE;
	   	inpu.setAttribute("name",key);
		inpu.setAttribute("onchange", "updateC2(this.name,this.value)");
     	cellWIHZE.appendChild(inpu);
        cellChallenge.innerHTML = easyC2[i];
        cellChallenge.setAttribute("sorttable_customkey", "1 "+easyC2[i]);
        cellHZE.innerHTML = c2HZE;
        cellHZE.style.textAlign = "right";
	c1 += getBasicC2(c2HZE, hasMesmer);
        cellC2Percent.innerHTML = numberWithCommas(getBasicC2(c2HZE, hasMesmer),0) + "%";
     	cellC2Percent.style.textAlign = "right";
        cellWIPct.innerHTML = numberWithCommas(getBasicC2(c2HZE, hasMesmer),0) + "%";
     	cellWIPct.setAttribute("id",key+"C");
     	cellWIPct.setAttribute("name","c2");
	cellWIPct.style.textAlign = "right";
     	cellWIPct.title = getBasicC2(c2HZE, hasMesmer);
     }

    }
    for (var j = 0; j < specialC2s.length; j++) {
     var key2 = specialC2s[j];
     var isAlt2 = (i+j)%2;

     var row2 = body2.insertRow(-1);
     var cellChallenge2 = row2.insertCell(0);
     var cellHZE2 = row2.insertCell(1);
     var cellC2Percent2 = row2.insertCell(2);
     var cellWIHZE2 = row2.insertCell(3);
     var cellWIPct2 = row2.insertCell(4);
     cellWIHZE2.setAttribute("class","hideme");
     cellWIPct2.setAttribute("class","hideme");

     if (game['c2'][key2] !== undefined)
     {
     var c2HZE = Math.min(game['c2'][key2], getC2HZE(radHZReached));
     var inpu = document.createElement("input");
		inpu.style="text-align: right;";
		inpu.size=3;
		inpu.value=c2HZE;
	   	inpu.setAttribute("name",key2);
		inpu.setAttribute("onchange", "updateC2(this.name,this.value)");
     cellWIHZE2.appendChild(inpu);
     cellChallenge2.innerHTML = specialC2s[j];
     cellChallenge2.setAttribute("sorttable_customkey", "2 "+specialC2s[j]);
     cellHZE2.innerHTML = c2HZE;
     cellHZE2.style.textAlign = "right";
     var c2HZE = Math.min(game['c2'][key2], getC2HZE());
     c2 += getBasicC2(game['c2'][key2], hasMesmer,key2);
     cellC2Percent2.innerHTML = numberWithCommas(getBasicC2(game['c2'][key2], hasMesmer,key2),0) + "%";
     cellC2Percent2.style.textAlign = "right";
     cellWIPct2.innerHTML = numberWithCommas(getBasicC2(c2HZE, hasMesmer,key2),0) + "%";
     cellWIPct2.setAttribute("id",key2+"C");
     cellWIPct2.setAttribute("name","c2c");
     cellWIPct2.style.textAlign = "right";
     cellWIPct2.title = getBasicC2(c2HZE, hasMesmer,key2);
     }
    }

    for (var k = 0; k < challengesU2.length; k++) {
     var key3 = challengesU2[k];
     var isAlt3 = (i+j+k)%2;

     var row3 = body3.insertRow(-1);

     var cellChallenge3 = row3.insertCell(0);
     var cellHZE3 = row3.insertCell(1);
     var cellC2Percent3 = row3.insertCell(2);
     var cellWIHZE3 = row3.insertCell(3);
     var cellWIPct3 = row3.insertCell(4);
     cellWIHZE3.setAttribute("class","hideme");
     cellWIPct3.setAttribute("class","hideme");

     if (game['c2'][key3] !== undefined)
     {
        var c2HZE = Math.min(game['c2'][key3], radHZReached);
        var inpu = document.createElement("input");
		inpu.style="text-align: right;";
		inpu.size=3;
		inpu.value=c2HZE;
	   	inpu.setAttribute("name",key3);
		inpu.setAttribute("onchange", "updateC2(this.name,this.value)");
        cellWIHZE3.appendChild(inpu);
        cellChallenge3.innerHTML = key3;
     	cellChallenge3.setAttribute("sorttable_customkey", "3 "+key3);
        cellHZE3.innerHTML = c2HZE;
     	cellHZE3.style.textAlign = "right";
        c3 += getBasicC2(game['c2'][key3], hasMesmer,key3);
	cellC2Percent3.innerHTML = numberWithCommas(getBasicC2(game['c2'][key3], hasMesmer, key3),0) + "%";     	
	cellC2Percent3.style.textAlign = "right";
        cellWIPct3.innerHTML = numberWithCommas(getBasicC2(game['c2'][key3], hasMesmer,key3),0) + "%";
     	cellWIPct3.setAttribute("id",key3+"C");
     	cellWIPct3.setAttribute("name","c3");
	cellWIPct3.style.textAlign = "right";
     	cellWIPct3.title = getBasicC2(game['c2'][key3], hasMesmer,key3);
     }
    }
    var footer = table.createTFoot();
    var footer2 = table2.createTFoot();
    var footer3 = table3.createTFoot();
    var c1rowTotal = footer.insertRow(0);
    var c1cellTotal = c1rowTotal.insertCell(0);
    var c1cellBlank = c1rowTotal.insertCell(1);
    var c1cellC2PercentT = c1rowTotal.insertCell(2);
    var c1cellWIHZE = c1rowTotal.insertCell(3);
    var c1cellWIPct = c1rowTotal.insertCell(4);
     c1cellWIHZE.setAttribute("class","hideme");
     c1cellWIPct.setAttribute("class","hideme");

    c1cellTotal.innerHTML = "Total Basic C<sup>2</sup>";
    c1cellTotal.style.whiteSpace="nowrap";
    c1cellC2PercentT.innerHTML = numberWithCommas(c1,0) + "%";
    c1cellC2PercentT.style.textAlign = "right";
    c1cellWIPct.innerHTML = numberWithCommas(c1,0) + "%";
    c1cellWIPct.style.textAlign = "right";
    c1cellWIPct.setAttribute("id","TotalC");
    c1cellWIPct.title = c1;

    var c2rowTotal = footer2.insertRow(0);
    var c2cellTotal = c2rowTotal.insertCell(0);
    var c2cellBlank = c2rowTotal.insertCell(1);
    var c2cellC2PercentT = c2rowTotal.insertCell(2);
    var c2cellWIHZE = c2rowTotal.insertCell(3);
    var c2cellWIPct = c2rowTotal.insertCell(4);
     c2cellWIHZE.setAttribute("class","hideme");
     c2cellWIPct.setAttribute("class","hideme");

    c2cellTotal.innerHTML = "Total Special C<sup>2</sup>";
    c2cellTotal.style.whiteSpace="nowrap";
    c2cellC2PercentT.innerHTML = numberWithCommas(c2,0) + "%";
    c2cellC2PercentT.style.textAlign = "right";
    c2cellWIPct.innerHTML = numberWithCommas(c2,0) + "%";
    c2cellWIPct.style.textAlign = "right";
    c2cellWIPct.setAttribute("id","TotalCC");
    c2cellWIPct.title = c2;
	
    var c3rowTotal = footer3.insertRow(-1);
    var c3cellTotal = c3rowTotal.insertCell(0);
    var c3cellBlank = c3rowTotal.insertCell(1);
    var c3cellC2PercentT = c3rowTotal.insertCell(2);
    var c3cellWIHZE = c3rowTotal.insertCell(3);
    var c3cellWIPct = c3rowTotal.insertCell(4);
     c3cellWIHZE.setAttribute("class","hideme");
     c3cellWIPct.setAttribute("class","hideme");
	
    var c2rowTotalb = footer2.insertRow(1);
    var c2cellTotalb = c2rowTotalb.insertCell(0);
    var c2cellBlankb = c2rowTotalb.insertCell(1);
    var c2cellC2PercentTb = c2rowTotalb.insertCell(2);
    var c2cellWIHZEb = c2rowTotalb.insertCell(3);
    var c2cellWIPctb = c2rowTotalb.insertCell(4);
     c2cellWIHZEb.setAttribute("class","hideme");
     c2cellWIPctb.setAttribute("class","hideme");

    c2cellTotalb.innerHTML = " ";
    c2cellC2PercentTb.innerHTML = " ";
    c2cellC2PercentTb.style.textAlign = "right";
    c2cellWIHZEb.innerHTML = " ";
    c2cellWIPctb.innerHTML = " ";
	
    var c2rowTotalT = footer2.insertRow(2);
    var c2cellTotalT = c2rowTotalT.insertCell(0);
    var c2cellBlankT = c2rowTotalT.insertCell(1);
    var c2cellC2PercentTT = c2rowTotalT.insertCell(2);
    var c2cellWIHZET = c2rowTotalT.insertCell(3);
    var c2cellWIPctT = c2rowTotalT.insertCell(4);
     c2cellWIHZET.setAttribute("class","hideme");
     c2cellWIPctT.setAttribute("class","hideme");

    c2cellTotalT.innerHTML = "Total C<sup>2</sup>";
    c2cellTotalT.style.whiteSpace="nowrap";
    c2cellC2PercentTT.innerHTML = numberWithCommas(c2+c1,0) + "%";
    c2cellC2PercentTT.style.textAlign = "right";
    c2cellWIPctT.innerHTML = numberWithCommas(c2+c1,0) + "%";
    c2cellWIPctT.style.textAlign = "right";
    c2cellWIPctT.setAttribute("id","TotalCa");
    c2cellWIPctT.title = c2+c1;

    c3cellTotal.innerHTML = "Total C<sup>3</sup>";
    c3cellTotal.style.whiteSpace="nowrap";
    c3cellC2PercentT.innerHTML = numberWithCommas(c3,0) + "%";
    c3cellC2PercentT.style.textAlign = "right";
    c3cellWIPct.innerHTML = numberWithCommas(c3,0) + "%";
    c3cellWIPct.style.textAlign = "right";
    c3cellWIPct.setAttribute("id","TotalC3");
    c3cellWIPct.title = c3;
	
    var rowTotal = footer3.insertRow(-1);
    var cellTotal = rowTotal.insertCell(0);
    var cellBlank = rowTotal.insertCell(1);
    var cellC2PercentT = rowTotal.insertCell(2);
    var TcellWIHZE = rowTotal.insertCell(3);
    var TcellWIPct = rowTotal.insertCell(4);
     TcellWIHZE.setAttribute("class","hideme");
     TcellWIPct.setAttribute("class","hideme");

    cellTotal.innerHTML = "Total:";
    cellC2PercentT.innerHTML = numberWithCommas(totalC2,2) + "%";
    cellC2PercentT.style.textAlign = "right";
    TcellWIPct.innerHTML = numberWithCommas(totalC2,2) + "%";
    TcellWIPct.style.textAlign = "right";
    TcellWIPct.setAttribute("id","TotalCs");
    TcellWIPct.title = totalC2;
};
