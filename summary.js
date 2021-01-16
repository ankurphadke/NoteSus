const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('7c0da8aa-d37b-4a6a-9fd0-bda506ec4b61');

(async function() {
        var resp = await deepai.callStandardApi("summarization", {
        text: "Thousands of Canadians are thumbing their noses at government advice to stay home and hopping international flights to sunny destinations even as the COVID-19 crisis worsens in many parts of the country, CBC News has found. Canadian air carriers operated more than 1,500 flights between Canada and 18 popular vacation destinations since Oct. 1, even as caseloads rise and the health crisis deepens.\
        It has prompted many questions from Canadians about why there is no outright travel ban, especially given recent high-profile resignations and firings involving politicians, doctors and civic leaders who've taken vacations outside the country.\
        With the new state of emergency and recent lockdown measures, why hasn't the government considered restrictions for airline travel either international or even Canadian travel between provinces? asked Brenda LacLaurin of Ottawa, who contacted CBC News.CBC excluded all known cancelled flights, as schedules continue to change.\
        WestJet announced last week it is scaling back operations, suspending several routes to sunny destinations, including flights from Edmonton and Vancouver to Cancun and Puerto Vallarta, Mexico, as the airline continues to face volatile demand and instability.\
        Air Canada says its overall network capacity — the number of seats it makes available for sale — is down 80 per cent compared with 2019. In an emailed statement, an airline spokesperson took exception to questions about the volume of flights resuming to vacation destinations.\
        The real issue here is we need to restart travel safely in Canada as it is very important to the economy, with hundreds of thousands of jobs dependent on it both directly and indirectly, said Air Canada's Peter Fitzpatrick.\
        Flight tracking by CBC News shows that despite a dramatic drop last spring, air traffic from eight Canadian airports to Mexico and the Caribbean is on the rebound.",
    });
    console.log(resp.output);
})()