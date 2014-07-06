$(document).on('ready', function() {
	var startTime = $.now();
	var startTImeBase = startTime;
    window.consoleLogging = true;
	var findIDs = function(tagName) {
	  	var idArray = [];
		fullTagObj = $(tagName).find('*');
		fullTagObj.each(function() {
			var id = $( this ).attr( "id" );
			if (typeof(id) === "string") {
				idArray.push(id);
			}
		});
		return idArray;
	};

    var idValueStatus = function(id, tempstring) {
        var idArtificalStatus;
        var tempstring = tempstring + ";  Artifically created ID: ";
        (id.slice(0,2) === 'zz')? (idArtificalStatus = true): (idArtificalStatus = false);
        /*
        if (id.slice(0,2) === 'zz')?  {
            idArtificalStatus = true;
        }
        else {
            idArtificalStatus = false;    
        }
        */
        tempstring = tempstring + idArtificalStatus + "\n";
        var returnArray = [tempstring, idArtificalStatus];
        return returnArray;
    };

	var populateIDs = function(tagName) {
	  	var idArray = [];
        var classListArray = [];
	  	var idCounter = Math.floor(Math.random()*20000) + 10000;
		fullTagObj = $(tagName).find('*');
		fullTagObj.each(function() {
		var id = $( this ).attr( "id" );
		if (id !== undefined) {
			if (typeof(id) === "string") {
				$(this).addClass('mouse-here');
				idArray.push(id);
			}
			else {
				console.log('what the hell');
			}
		}
		else {
			idUse = "zz" + idCounter.toString();
			$(this).attr("id", idUse);
			$(this).addClass('mouse-here');
			idArray.push(idUse);
			idCounter += 1;
		}
        var classListString = $( this ).attr("class");
        classListArray.push(classListString);
		});
		console.log("ID's tagged");
		return {idArray: idArray, classList:classListArray};
	};

	var formatTimeOfDay = function(millisSinceEpoch) {
		var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
		var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
		var seconds = secondsInDay % 60;
		var minutes = ((secondsInDay / 60) | 0) % 60;
		var hours = (secondsInDay / 3600) | 0;
		return hours + (minutes < 10 ? ":0" : ":")
		  + minutes + (seconds < 10 ? ":0" : ":")
		  + seconds;
	};

	var createDictWithKeys = function(inList, initialValue) {
		var tempDict = {};
		for ( var i = 0; i < inList.length; i++ ) {
			var idString = inList[ i ];
            if (typeof initialValue !== "object") {
			    tempDict[ idString ] = initialValue;
            }
            else if (initialValue instanceof Array === true) {
                /* var initialValueTemp = initialValue[ i ];  */
			    tempDict[ idString ] = initialValue[ i ];
            }
            else {
                alert("Initial value is weird, possibly an object that is not a list");
            }                   
		}
		return tempDict;
	};

	var populateIDOutput = populateIDs('body');
    var idTotalArray = populateIDOutput.idArray;
    var classListArrayTotal = populateIDOutput.classList;
	var mouseInDict = createDictWithKeys(idTotalArray, 0);
	var mouseEntryDict = createDictWithKeys(idTotalArray, 0);
    var mouseClassDict = createDictWithKeys(idTotalArray, classListArrayTotal);
	window.IDS = idTotalArray;
	window.MDS = mouseInDict;
	window.MDE = mouseEntryDict;
    window.MCD = mouseClassDict;

	$('.mouse-here').mouseenter( function() {
		var mouseEntryTimeNow = $.now();
		var currentId = $(this).attr('id');
		var totalTimeInArea = mouseInDict[ currentId ];
		mouseEntryDict[ currentId ] = mouseEntryTimeNow;
        var outPutString = 'Mouse arriving in: #' + currentId + "; Has been the area a total time: " + formatTimeOfDay(totalTimeInArea) + " s";
        outPutString = outPutString + '; Class List: ' + mouseClassDict[ currentId ];
        var outArray = idValueStatus( currentId, outPutString );
        outPutString = outArray[ 0 ];
		if (window.consoleLogging === true) { console.log(outPutString) } 
	});
	
	$('.mouse-here').mouseleave( function() {
		var currentTime = $.now();
		var currentId = $(this).attr('id');
		var mouseEntryTimeNow = mouseEntryDict[ currentId ];
		var timeInArea = currentTime - mouseEntryTimeNow;
		var totalTimeInArea = mouseInDict[ currentId ];
		var totalTimeInArea = totalTimeInArea + timeInArea;
		mouseInDict[ currentId ] = totalTimeInArea;
		var outPutString = 'Mouse leaving: #' + currentId + "; Has been the area a total time: " + formatTimeOfDay(totalTimeInArea) + " s";
        outPutString = outPutString + '; Class List: ' + mouseClassDict[ currentId ];
        var outArray = idValueStatus( currentId, outPutString );
        outPutString = outArray[ 0 ];
		if (window.consoleLogging === true) { console.log(outPutString) } 	
	});
  
});
