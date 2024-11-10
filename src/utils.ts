const dns = require("node:dns");

export function getDomainFromUrl(url: string): string | null {
	const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;
	const match = url.match(regex);
	return match ? match[1] : null;
}

export function getIpFromDoamin(domainName: string): Promise<string> {
	return new Promise((resolve, reject) =>
		dns.lookup(domainName, (err: string, address: string, family: string) => {
			if (err) {
				reject(new Error(err));
			}

			resolve(address);
		})
	);
}
