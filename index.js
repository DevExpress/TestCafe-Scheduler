var fs = require('fs'), // Request a reference to the Node.js file system 
	CronJob  = require('cron').CronJob, // Request a reference to the cron module
	TestCafe = require('testcafe').TestCafe; // Request a reference to the testcafe module

// Consts
var CONFIG_FILE_NAME = 'config.json',
	LOG_FILE_NAME = 'log.txt';

var croneJob = null,
	testCafe = null;

getConfig(function(config) {
	// Create a new TestCafe instance and specify startup options for TestCafe
	// Using a JSON object with the same notation as in the TestCafe Configuration File
	testCafe = new TestCafe (config.testcafe);

	// Watch for changes in the file 
	fs.watchFile(CONFIG_FILE_NAME, function() {
		restartCronJob();
	});
	
	// Log the results into the console
	console.log('\nTest will be started by pattern: ' + config.cronTime + '.');
	console.log('Test results you can find in the log.txt file.');

	runCronJob();
});

// Read a configuration file and parse config settings from JSON
function getConfig(callback) {
	fs.readFile(CONFIG_FILE_NAME, function(err, json) {
	  	if (err) 
	  		throw err;

	  	callback(JSON.parse(json));
	});
}

function restartCronJob() {
	// Stop the Cron job
	croneJob.stop();
	// Run the Cron job again
	runCronJob();
}

function runCronJob() {
	getConfig(function(config) {
		// Create a new Cron for Node.js instance
		croneJob = new CronJob({
			cronTime: config.cronTime, // Cron pattern
			onTick: function() {
				runTests(); // The function to fire at the specified time
			},
		  	start: true
		});
	});
}

function runTests() {
	var runOptions = {
		workers: testCafe.listConnectedWorkers(), // Return an array of strings identifying the connected remote workers
		browsers: testCafe.listAvailableBrowsers(), // Return an array of strings identifying available browsers
		emulateCursor: true // Emulate cursor movements while testing
	};
    
	// Run tests and save results to the log file
	testCafe.runTests(runOptions, function () {
		testCafe.on('taskComplete', function (report) {
			log('\n' + new Date().toString() + ':\n' + JSON.stringify(report));
		});
	});
}

// Save tests' run results into a log file and create a file if it does not exist
function log(mssg) {
	fs.appendFile(LOG_FILE_NAME, mssg, function (err) {
	  	if (err) 
			throw err;
	});
}
