
var fs = require('fs');

// a haiku is divided into 5/7/5 syllable lines

// how many words per line?
var haiku_structure = [5,4,3];

function haiku_generator(words_per_line) {
	var wpl = words_per_line;
	var haiku = "";
	// check input - if there are more words than number of syllables per line
	if (wpl[0]>5 || wpl[1]>7 || wpl[2] > 5) {
		return console.error("Haiku cannot have more words than syllables per line --- 5/7/5")
	}
	if (wpl.length!=3){
		return console.error("Haiku has 3 lines")
	}

	var word_list = fs.readFileSync('cmudict.txt', 'utf-8').split('\n');
	var syllable_dict = {};
	for (var i =0; i<word_list.length; i++) {
		// how many syllables is each word?
		var syllables = 0;
		var data = word_list[i].split('  ');
		var word = data.shift();
		data = data.join('').split(' ');
		data.forEach(function(d) {
			if (d.match(/\d/)) {
				syllables ++;
			}
		})
		if (syllable_dict[syllables]) {
			syllable_dict[syllables].push(word);
		}
		else {
			syllable_dict[syllables] = [word];
		}
	}
	
	// dictionary created

	// in order to create the haiku - there will be various arrangements of syllables, 

	for (var i=0 ; i<wpl.length; i++) {
		var no_syllables = i%2==0 ? 5 : 7
		console.log("arrange " + no_syllables + " syllables over " + wpl[i] + " words");
		var arrangement = arrange(no_syllables, wpl[i]);
		console.log(arrangement);
		for (var j = 0; j<arrangement.length; j++) {
			var which_index = Math.floor(Math.random() * syllable_dict[arrangement[j]].length);
			haiku += syllable_dict[arrangement[j]][which_index] + " ";
		}
		haiku+="\n"
	}
	return haiku;
}

function arrange(syllables, words){
	// // returns a random arrangement of syllable_length_words that add up to no_syllables
	var syllable_arrangement = [];
	if (words==1) {
		syllable_arrangement.push(syllables);
	}
	else if (words==syllables){
		for (var i=words; i>0; i--){
			syllable_arrangement.push(1);
		}
	}
	else{
		// maximum number of syllables available to the first word is
		// the number of syllables minus the number of other words
		// 
		// the number of syllables available to the second word is the total number of syllables, 
		// minus the number of syllables in the first word,
		// minus the number of words still remaining
		// no, this wrong

		//
		for (var i=0; i<words; i++) {
			var max_s = syllables - (words-(i+1));
			// max_s = syllables - words to go ;
			// words to go is the number words - (i+1)
			// minus the syllables that have already been taken
			for (var k=0; k<i; k++){
				max_s -= syllable_arrangement[k];
				// console.log("max_s loop" + max_s)
			}
			s = Math.ceil(Math.random()*max_s);
			syllable_arrangement.push(s)

		}
	}
	return syllable_arrangement;
}


// how to generate something using stress counts as well.
//	- stress is represented in the files as what
//  For example, in iambic pentameter every other syllable is stressed starting with the second syllable:

// stress count 
function stress_count(stress) {
	// return 
}


console.log(haiku_generator(haiku_structure));


