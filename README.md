Schedule TestCafe testing tasks
===============================

This sample [Node.js](http://nodejs.org/) application will run a TestCafe test task at a specified time and then log the results. The code uses [TestCafe continuous integration API](http://testcafe.devexpress.com/Documentation/Tutorial/Continuous_Integration) and [Cron for Node.js](https://github.com/ncb000gt/node-cron). 


Preparation
-----------

Before running the application, configure your environment:

* Download the example;
* Switch to the directory where you saved it;

* Install testcafe and cron modules using the following command line:

    `npm install` 

    The testcafe and cron modules will be installed automatically.
* Open `config.json` and configure [TestCafe settings](http://testcafe.devexpress.com/Documentation/Tutorial/Initialize_and_Run#Change_TestCafe_Settings) and [Cron Pattern](http://help.sap.com/saphelp_xmii120/helpdata/en/44/89a17188cc6fb5e10000000a155369/content.htm).


Launch the application
----------------------

Standard command line syntax includes the Node.js executable with the application file as a parameter.

    node index.js

Result
------

After you run the application, your tests will be run in the specified browsers on a schedule. The result of the test run will be saved into the `log.txt` file. The file will be created automatically if it does not exist.
