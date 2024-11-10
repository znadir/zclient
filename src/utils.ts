const dns = require("node:dns");

export async function getIpFromDomain(domainName: string): Promise<string> {
	return new Promise((resolve, reject) =>
		dns.lookup(domainName, (err: string, address: string, family: string) => {
			if (err) {
				reject(new Error(err));
			}

			resolve(address);
		})
	);
}
