// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var excuse_list = [{
	title: "tired",
	details: "I'm too tired to do/start X",
	valid: false
},
{
	title: "busy",
	details: "I'm too busy to do/start X",
	valid: false
},
{
	title: "sick",
	details: "I'm not feeling up to doing/starting X",
	valid: false
},
{
	title: "broke",
	details: "I can't afford to do/start X",
	valid: true
}];

db.Excuse.remove({}, function(err, excuses) {
	if (err) {
		console.log("Error occured removing excuses: " + err);
	} else {
		console.log("Removed all excuses");
	}
	db.Excuse.create(excuse_list, function(err, excuse) {
		if (err) {
			return console.log("Error: " + err);
		} else {
			console.log("Recreated all excuses");
			process.exit();
		}
	});
});


