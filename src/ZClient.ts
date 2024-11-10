const net = require("node:net");
const { getIpFromDomain } = require("./utils");
const { Buffer } = require("node:buffer");
const Method = require("./Method");
const HttpRequest = require("./HttpRequest");

interface Params {
	headers: object;
}

class ZClient {
	public userAgentName = "ZClient";
	public httpVersion = "1.1";

	static get(url: string, params: Params) {
		return ZClient.send(Method.GET, url, params);
	}

	private getFullHeaders(customHeaders?: object) {
		return {
			"User-Agent": this.userAgentName,
			Accept: "*/*",
			"Accept-Language": "en",
			...customHeaders,
			Connection: "close",
		};
	}

	/**
	 * Send a http request
	 * @param method http method enum
	 * @param url url of request
	 * @param params params
	 * @returns http response in string
	 */
	private static async send(method: typeof Method, url: string, params?: Params): Promise<string> {
		const zclient = new ZClient();

		const fullHeaders = zclient.getFullHeaders(params?.headers);

		const request = new HttpRequest(zclient, method, url, fullHeaders);
		console.log("This raw will be sent: " + request.raw);

		const ip = await getIpFromDomain(request.hostname);

		const con = {
			host: ip,
			port: 80,
		};

		const netClient = net.createConnection(con, () => {
			netClient.write(request.raw);
		});

		return new Promise((resolve, reject) => {
			netClient.on("data", (data: typeof Buffer | string) => {
				const httpRes = data.toString();
				netClient.end();

				resolve(httpRes);
			});

			netClient.on("error", (error: typeof Error) => {
				reject(error);
			});
		});
	}

	public toString(): string {
		return `ZClient. HTTP ${this.httpVersion}`;
	}
}

module.exports = ZClient;
