/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'Maryville University was established in 1872.',
                'Maryville Pawprint’s lab is found in the Annex building.',
                'Maryville University is a 130-acre campus of rolling hills, wooded areas, creeks, two lakes and miles of walking trails.',
                'Any major can take Pawprint for 1, 2 or 3 credit hours by enrolling in COMM 181.',
                'Maryville University has over 100 student organizations.',
                'Pawprint’s podcast is called Saints Talk.',
                'Maryville University has over 90 degree programs.',
                'You can submit articles or videos to Pawprint by visiting their app or going to www.maryvillepawprint.com.',
                'Maryville University’s average class size is 15 students.',
            ],
            SKILL_NAME: 'Pawprint Facts',
            GET_FACT_MESSAGE: "Here's your Pawprint fact: ",
            HELP_MESSAGE: 'You can say tell me a fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                'Maryville University was established in 1872.',
                'Maryville Pawprint’s lab is found in the Annex building.',
                'Maryville University is a 130-acre campus of rolling hills, wooded areas, creeks, two lakes and miles of walking trails.',
                'Any major can take Pawprint for 1, 2 or 3 credit hours by enrolling in COMM 181.',
                'Maryville University has over 100 student organizations.',
                'Pawprint’s podcast is called Saints Talk.',
                'Maryville University has over 90 degree programs.',
                'You can submit articles or videos to Pawprint by visiting their app or going to www.maryvillepawprint.com.',
                'Maryville University’s average class size is 15 students.',
            ],
            SKILL_NAME: 'Pawprint Facts',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random pawprint fact from the pawprint facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = 1;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
