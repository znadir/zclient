const net = require("node:net");
const { getIpFromDomain } = require("./utils");
const { Buffer } = require("node:buffer");
const Method = require("./Method");
const HttpRequest = require("./HttpRequest");

interface Params {
	headers: object;
}

interface PostParams extends Params {
	json: object;
}

class ZClient {
	public userAgentName = "ZClient";
	public httpVersion = "1.1";

	static get(url: string, params: Params) {
		return ZClient.send(Method.GET, url, params);
	}

	static post(url: string, params: PostParams) {
		return ZClient.send(Method.POST, url, params);
	}

	private getFullHeaders(customHeaders?: object, payload?: string) {
		return {
			"User-Agent": this.userAgentName,
			Accept: "*/*",
			"Accept-Language": "en",
			...customHeaders,
			Connection: "close",
			...(payload && { "Content-Length": payload.length }),
		};
	}

	private static buildRequest(
		method: typeof Method,
		url: string,
		params?: Params | PostParams
	): typeof HttpRequest {
		const zclient = new ZClient();

		const json = params && "json" in params ? params?.json : null;
		const payload = JSON.stringify(json);

		const fullHeaders = zclient.getFullHeaders(params?.headers, payload);

		const request = new HttpRequest(zclient, false, method, url, fullHeaders, payload);
		console.log("This raw will be sent: " + request.raw);

		return request;
	}

	/**
	 * Send a http request
	 * @param method http method enum
	 * @param url url of request
	 * @param params params
	 * @returns http response in string
	 */
	private static async send(
		method: typeof Method,
		url: string,
		params?: Params | PostParams
	): Promise<string> {
		const request = ZClient.buildRequest(method, url, params);

		// net lib handles dns for us :P
		const netClient = net.createConnection({ host: request.hostname, port: 80 }, () => {
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
