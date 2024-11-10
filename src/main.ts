const { getIpFromDomain } = require("./utils");
const Request = require("./Request");
const Client = require("./Client");

async function main() {
	const zclient = new Client();

	const headers = {
		xcrsf: "sdade",
	};
	const request = new Request(zclient, "GET", "https://echo.free.beeceptor.com/", headers);
	const result = await zclient.send(request);

	console.log("RESULT: " + result);
}

main();
