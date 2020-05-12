import ReactGA from 'react-ga';

class Analytics {
	init () {
		ReactGA.initialize('UA-162722257-1');
	}

	visitPage(path) {
		ReactGA.pageview(path);
	}

	setEvent(eventObj) {
		ReactGA.event(eventObj);
	}
}

const analytics = new Analytics();

export default analytics;
