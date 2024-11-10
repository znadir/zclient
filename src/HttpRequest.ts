const ZClient = require("./ZClient");
const Method = require("./Method");

class HttpRequest {
	private zClient;
	private method;
	private url;
	private hostname;
	private pathname;
	private headers;

	constructor(zClient: typeof ZClient, method: typeof Method, url: string, headers: object) {
		this.zClient = zClient;
		this.method = method;
		this.url = new URL(url);
		this.hostname = this.url.hostname;
		this.pathname = this.url.pathname;
		this.headers = headers;
	}

	private formatHeaders(headers: object) {
		return Object.entries(headers)
			.map(([key, val]) => `${key}: ${val}\r\n`)
			.join("");
	}

	get raw() {
		const formattedHeaders = this.formatHeaders(this.headers);

		return (
			`${this.method} ${this.pathname} HTTP/${this.zClient.httpVersion}\r\n` +
			`Host: ${this.hostname}\r\n` +
			formattedHeaders +
			`\r\n`
		);
	}
}

module.exports = HttpRequest;
