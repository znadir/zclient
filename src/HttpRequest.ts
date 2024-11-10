const ZClient = require("./ZClient");
const Method = require("./Method");

class HttpRequest {
	private zClient;
	private method;
	private url;
	private hostname;
	private pathname;
	private headers;
	private payload;

	constructor(
		zClient: typeof ZClient,
		method: typeof Method,
		url: string,
		headers: object,
		payload?: string
	) {
		this.zClient = zClient;
		this.method = method;
		this.url = new URL(url);
		this.hostname = this.url.hostname;
		this.pathname = this.url.pathname;
		this.headers = headers;
		this.payload = payload;
	}

	private formatHeaders(headers: object) {
		return Object.entries(headers)
			.map(([key, val]) => `${key}: ${val}\r\n`)
			.join("");
	}

	get raw(): string {
		const formattedHeaders = this.formatHeaders(this.headers);

		let content =
			`${this.method} ${this.pathname} HTTP/${this.zClient.httpVersion}\r\n` +
			`Host: ${this.hostname}\r\n` +
			formattedHeaders +
			`\r\n`;

		if (this.payload) {
			content += this.payload;
		}

		return content;
	}
}

module.exports = HttpRequest;
