import ZClient from "./ZClient";
import Method from "./Method";

class HttpRequest {
	private zClient;
	public isSecure; // if tls is used
	public method;
	public url;
	public hostname;
	public pathname;
	public headers;
	public payload;

	constructor(
		zClient: ZClient,
		isSecure: boolean,
		method: Method,
		url: string,
		headers: object,
		payload?: string
	) {
		this.zClient = zClient;
		this.isSecure = isSecure;
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

export default HttpRequest;
