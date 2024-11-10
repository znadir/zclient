const net = require("node:net");
const { getIpFromDomain } = require("./utils");
const { Buffer } = require("node:buffer");
const Request = require("./Request");

class Client {
	private userAgentName = "Z Client";
	private httpVersion = "1.1";

	private initHeaders = {
		"User-Agent": this.userAgentName,
		Accept: "*/*",
		"Accept-Language": "en",
		Connection: "close",
	};

	async send(request: typeof Request): Promise<string> {
		const ip = await getIpFromDomain(request.hostname);

		const con = {
			host: ip,
			port: 80,
		};

		const client = net.createConnection(con, () => {
			client.write(request.raw);
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

	public toString(): string {
		return `ZClient. HTTP ${this.httpVersion}`;
	}
}

module.exports = Client;
