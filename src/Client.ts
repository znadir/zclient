enum Method {
	get,
}

interface Params {
	method: Method;
	headers: object;
}
`GET / HTTP/1.1\r\n` +
	`Host: echo.free.beeceptor.com\r\n` +
	`User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0\r\n` +
	`Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n` +
	`Accept-Language: en-CA,en-US;q=0.7,en;q=0.3\r\n` +
	`Accept-Encoding: gzip, deflate, br\r\n` +
	`Connection: close\r\n\r\n`;

class Client {
	private userAgentName = "Z Client";
	private httpVersion = "1.1";

	private initHeaders = {
		"User-Agent": this.userAgentName,
		Accept: "*/*",
		"Accept-Language": "en",
		Connection: "close",
	};

	private async method(url: string, params: Params) {}

	static async get(url: string) {}
}
