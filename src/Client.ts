enum Method {
	get,
}

interface Params {
	method: Method;
	headers: object;
}

class Client {
	private userAgentName = "Z Client";
	private httpVersion = "1.1";

	constructor() {}

	private initHeaders = {
		"User-Agent": this.userAgentName,
		Accept: "*/*",
		"Accept-Language": "en",
		Connection: "close",
	};

	private async method(url: string, params: Params) {}

	static async get(url: string) {}

	public toString(): string {
		return `ZClient. HTTP ${this.httpVersion}`;
	}
}

module.exports = Client;
