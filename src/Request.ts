const { getDomainFromUrl } = require("./utils");

class Request {
	private url;
	private domain;

	constructor(url: string) {
		this.url = url;
		this.domain = getDomainFromUrl(url);
	}
}
