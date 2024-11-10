const { getIpFromDomain } = require("./utils");
const Request = require("./Request");
const Client = require("./Client");

async function main() {
	const zclient = new Client();

	const headers = {
		xcrsf: "sdade",
	};

	const request = new Request(zclient, "https://echo.free.beeceptor.com/", headers);
	const result = await request.send();

	console.log("RESULT: " + result);
}

main();
