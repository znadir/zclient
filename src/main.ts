const net = require("node:net");
const { getIpFromDoamin } = require("./utils");

async function main() {
	const requestHTTP =
		`GET / HTTP/1.1\r\n` +
		`Host: echo.free.beeceptor.com\r\n` +
		`User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0\r\n` +
		`Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n` +
		`Accept-Language: en-CA,en-US;q=0.7,en;q=0.3\r\n` +
		`Accept-Encoding: gzip, deflate, br\r\n` +
		`Connection: close\r\n\r\n`;

	const ip = await getIpFromDoamin("echo.free.beeceptor.com");
	console.log("Domain name converted: " + ip);

	const con = {
		host: ip,
		port: 80,
	};

	const client = net.createConnection(con, () => {
		console.log("connected to server!");
		client.write(requestHTTP);
	});

	client.on("data", (data: any) => {
		console.log("Received: " + data.toString());
		client.end();
	});

	client.on("end", () => {
		console.log("disconnected from server");
	});
}

main();
