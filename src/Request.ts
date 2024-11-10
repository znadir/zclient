const net = require("node:net");
const { getIpFromDomain } = require("./utils");
const Client = require("./Client");
const { Buffer } = require("node:buffer");

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
		const customHeaders = Object.entries(this.headers).map(([key, val]) => `${key}: ${val}\r\n`);
		return (
			`GET ${this.pathname} HTTP/${this.client.httpVersion}\r\n` +
			`Host: ${this.hostname}\r\n` +
			customHeaders +
			`\r\n`
		);
	}

	async send(): Promise<string> {
		const ip = await getIpFromDomain(this.hostname);

		const con = {
			host: ip,
			port: 80,
		};

		const client = net.createConnection(con, () => {
			client.write(this.raw);
		});

		return new Promise((resolve, reject) => {
			client.on("data", (data: typeof Buffer | string) => {
				const httpRes = data.toString();
				client.end();

				resolve(httpRes);
			});

			client.on("error", (error: typeof Error) => {
				reject(error);
			});
		});
	}
}

module.exports = Request;
