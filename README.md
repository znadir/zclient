# ZClient

This is my http client written from scratch TCP/TLS for fun :D

- Tls 1.3
- Simple
- Typescript

Example:

## Get request:

```ts
const res = await ZClient.get("http://echo.free.beeceptor.com/");
console.log(res.text);
```

## Post request:

```ts
const res = await ZClient.post("http://echo.free.beeceptor.com/", {
	headers: {
		"csrf-token": "sd2edj2e",
	},
	json: {
		test: 123,
	},
});
```

This is still under construction
