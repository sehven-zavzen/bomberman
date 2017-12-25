var LEFT_BRACKET = '(';
var RIGHT_BRACKET = ')';
var GIF_NAME = "GIFNAME";
var WIDTH = "WIDTH";
var gifs = ['acorn', 'kolony', 'americanfootball', 'ancientone', 'angel', 'anger', 'angry', 'red', 'aokijump', 'target', 'auld', 'avocadolove', 'baku2017', 'tauri', 'bandit', 'headbang', 'slamdunk', 'batcry', 'batsmile', 'brb', 'beer', 'bell', 'bhangra', 'bike', 'blackwidow', 'nazar', 'blush', 'bomb', 'bow', 'bowled', 'brokenheart', 'bronzemedal', 'bucky', 'bug', 'bunny', 'busyday', 'cactuslove', 'cake', 'cakethrow', 'call', 'camera', 'canyoutalk', 'unsee', 'captain', 'car', 'cash', 'cat', 'champagne', 'cheerleader', 'cheers', 'cheese', 'chicksegg', 'clap', 'coffee', 'shivering', 'computer', 'computerrage', 'confidential', 'golmaal', 'cool', 'cry', 'cwl', 'cupcake', 'dadtime', 'dance', 'gran', 'hendance', 'turkey', 'penguin', 'sturridge15', 'dotdfemale', 'dotdmale', 'deadyes', 'devil', 'discodancer', 'disgust', 'diwaliselfie', 'doctorstrange', 'dog', 'doh', 'donttalktome', 'donkey', 'dream', 'dreidel', 'drink', 'drunk', 'dull', 'eid', 'emo', 'ring', 'envy', 'eg', 'fubar', 'facepalm', 'fallinlove', 'familytime', 'fear', 'festiveparty', 'finger', 'fingerscrossed', 'fireworks', 'flower', 'dhakkan', 'footballfail', 'games', 'ganesh', 'ghost', 'gift', 'giggle', 'shopping', 'learn', 'goldmedal', 'fistbump', 'goodluck', 'gottarun', 'dracula', 'frankenstein', 'jekyllandhyde', 'mummy', 'werewolf', 'zombiedrool', 'handsinair', 'handshake', 'hanukkah', 'happy', 'heart', 'hearteyes', 'hearthands', 'hedgehog', 'heston', 'hestonfacepalm', 'hi', 'highfive', 'holdon', 'holi', 'holidayspirit', 'hollest', 'hotchocolate', 'hug', 'hungrycat', 'iaaf2017', 'iaafjump', 'iaafrun', 'iaafthrow', 'idea', 'ill', 'inlove', 'bollylove', 'island', 'wasntme', 'henderson14', 'joy', 'klopp', 'kaecilius', 'karlmordo', 'skip', 'key', 'kiss', 'lfcclap', 'lfcfacepalm', 'lfclaugh', 'lfcparty', 'lfcworried', 'ladyvampire', 'lang', 'laugh', 'letsmeet', 'like', 'lips', 'listening', 'headphones', 'lovegif', 'makeup', 'man', 'manshrug', 'bartlett', 'mariachilove', 'mistletoe', 'mmm', 'monkey', 'monkeygiggle', 'mooning', 'hungover', 'movember', 'movie', 'movinghome', 'mummywalk', 'muscle', 'muscleman', 'music', 'lipssealed', 'naturescall', 'neil', 'nerdy', 'nestingeggs', 'nickfury', 'ninja', 'no', 'noworries', 'nahi', 'nod', 'lalala', 'ok', 'oliver', 'ontheloo', 'party', 'penguinkiss', 'coutinho10', 'phone', 'piggybank', 'poop', 'pizza', 'plane', 'winner', 'poke', 'polarbear', 'poolparty', 'praying', 'promise', 'puke', 'pullshot', 'pumpkin', 'punch', 'rain', 'rainbow', 'rainbowsmile', 'reindeer', 'whew', 'rickshaw', 'rock', 'rockchick', 'rofl', 'running', 'sad', 'sadness', 'santa', 'santamooning', 'sarcastic', 'selfie', 'selfiediwali', 'shake', 'sheep', 'shielddeflect', 'pig', 'silvermedal', 'skate', 'skipping', 'skull', 'skype', 'slap', 'chappal', 'sloth', 'smile', 'malthe', 'smirk', 'smoke', 'snail', 'sleepy', 'snowangel', 'snowflake', 'bertlett', 'kaanpakadna', 'sparkler', 'speechless', 'llsshock', 'shock', 'lamb', 'heidy', 'star', 'steveaoki', 'stingray', 'stop', 'sun', 'hero', 'surprised', 'suryannamaskar', 'swear', 'sweat', 'laddu', 'synchswim', 'syne', 'tvbinge', 'talktothehand', 'talk', 'ttm', 'tandoorichicken', 'taur', 'chai', 'mlt', 'diya', 'tennisfail', 'thanks', 'think', 'time', 'tired', 'toivo', 'tongueout', 'tmi', 'trampoline', 'trophy', 'tubelight', 'tumbleweed', 'umbrella', 'unamused', 'unicorn', 'vampire', 'victory', 'wait', 'waiting', 'webheart', 'werewolfhowl', 'wtf', 'whatsgoingon', 'whistle', 'whosthis', 'wink', 'witch', 'woman', 'womanshrug', 'wonder', 'wong', 'wfh', 'worry', 'xmastree', 'yawn', 'yotfr', 'yotm', 'yes', 'yoga', 'mail', 'priidu', 'zombie', 'zombiewave', 'access', 'bing', 'excel', 'groupme', 'internetexplorer', 'microsoft', 'onedrive', 'onenote', 'outlook', 'powerpoint', 'publisher', 'sharepoint', 'skypebiz', 'win10', 'word', 'xbox', 'oye', 'abe', 'kya'];

//TODO: Refactor this shit function
function convertMessage(message) {
	
	var searchCriteria = "";
	var defWidth = "40";
	
	//Hos degil bu yöntem
	var gifSize = ['', '*1', '*2', '*3', '*4', '*5'];
	var template = "<img src='\\images\\gif\\" + GIF_NAME + "' contenteditable='false' style='width:" + WIDTH + "'/>"
	 
	for (var i = 0; i < gifs.length; i++) {
		
		defWidth = "40";
		
		for (var j = 0; j < gifSize.length; j++) {
			searchCriteria = LEFT_BRACKET + gifs[i] + gifSize[j] + RIGHT_BRACKET;
			
			var multiplyWidth = 1;
			var tempTemplate = template;
			tempTemplate = tempTemplate.replace(GIF_NAME, gifs[i] + ".gif");
			
			if (gifSize[j] == '') {
				multiplyWidth = 1;
			} else {
				multiplyWidth = gifSize[j].substring(1, 3);
			}
			
			tempTemplate = tempTemplate.replace(WIDTH, (defWidth * multiplyWidth) + 'px');
			
			message = message.replaceAll(searchCriteria, tempTemplate);
		}
		
	}
	
	return message;
}

function openVideo(videoLink) {
	var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
	var URL = videoLink + ";url=" + location.href;
	var win = window.open(URL, "_blank", strWindowFeatures);
}

function openProgram(programLink) {
	window.open('file:///' + programLink)
}

