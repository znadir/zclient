const { getIpFromDomain } = require("./utils");
const ZClient = require("./ZClient");

async function main() {
	const res = await ZClient.post("https://echo.free.beeceptor.com/", {
		headers: {
			lol: 123,
		},
		json: {
			haha: 123,
		},
	});
	console.log(res);
}

main();
