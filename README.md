# ZClient

This is my http client written from scratch TLS for fun :D

- Http 1.1 version only supported
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
