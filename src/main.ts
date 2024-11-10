const net = require("node:net");
const { getIpFromDomain } = require("./utils");
const Request = require("./Request");
const Client = require("./Client");

async function main() {
	const zclient = new Client();
	console.log(zclient);

	const request = new Request(zclient, "https://www.google.com/search?q=lol", { xcrsf: "sdade" });
	console.log(request.raw);

	// const ip = await getIpFromDomain("echo.free.beeceptor.com");
	// console.log("Domain name converted: " + ip);
	// const con = {
	// 	host: ip,
	// 	port: 80,
	// };
	// const client = net.createConnection(con, () => {
	// 	console.log("connected to server!");
	// });
	// client.on("data", (data: any) => {
	// 	console.log("Received: " + data.toString());
	// 	client.end();
	// });
	// client.on("end", () => {
	// 	console.log("disconnected from server");
	// });
}

main();
