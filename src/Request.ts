const { getIpFromDomain } = require("./utils");
const Client = require("./Client");

class Request {
	private client;
	private url;
	private hostname;
	private pathname;
	private headers;

	constructor(client: typeof Client, url: string, headers: object) {
		this.client = client;
		this.url = new URL(url);
		this.hostname = this.url.hostname;
		this.pathname = this.url.pathname;
		this.headers = headers;
	}

	get raw() {
		return (
			`GET ${this.pathname} HTTP/${this.client.httpVersion}\r\n` +
			`Host: ${this.hostname}\r\n` +
			`User-Agent: ${this.client.userAgentName}\r\n` +
			`Connection: close\r\n\r\n`
		);
	}
}

module.exports = Request;
