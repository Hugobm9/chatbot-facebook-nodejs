'use strict';
const App = require('Actions-on-google').ApiAiApp;
exports.factsAboutGoogle = (request, response) => {

	const app = new App({request, response});

	function tellFact (app) {
		let fact = DEFAULT_FACT;
		let factCategory = app.getArgument('fact-category');

		if (factCategory == 'history') {
			fact = getRandomHistoryFact ();
		} else if (factCategory === 'headquarters') {
			fact = getRandomHQFact();
		}

	if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
			app.ask(app.buildRichResponse()
				.addSimpleResponse('Here is a fact to you. ' + fact + 
					'Which one do you want to hear about next , ' + 
					'Google history or headquarters?')
				.addBasicCard(
					app.buildBasicCard(fact)
						.setImage(GOOGLE_IMG_SRC, IMG_ALT_TEXT))
				.addSuggestions(['History','Headquarters']));
	} else {

		app.ask('Here a fact you.' + fact +
			'Which one do you want to hear about next , ' + 
			'Google history or headquarters?')
	}

	const actionMap = new Map();
	actionMap.set('tell.fact', tellFact);
	app.handleRequest(actionMap);

	}
};