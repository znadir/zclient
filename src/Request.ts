const Client = require("./Client");
const Method = require("./Method");

class Request {
	/**
	 * Http Request
	 */
	private client;
	private method;
	private url;
	private hostname;
	private pathname;
	private headers;

	constructor(client: typeof Client, method: typeof Method, url: string, headers: object) {
		this.client = client;
		this.method = method;
		this.url = new URL(url);
		this.hostname = this.url.hostname;
		this.pathname = this.url.pathname;
		this.headers = headers;
	}

	get raw() {
		const customHeaders = Object.entries(this.headers).map(([key, val]) => `${key}: ${val}\r\n`);
		return (
			`${this.method} ${this.pathname} HTTP/${this.client.httpVersion}\r\n` +
			`Host: ${this.hostname}\r\n` +
			customHeaders +
			`\r\n`
		);
	}
}

module.exports = Request;
