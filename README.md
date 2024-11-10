# ZClient

This is my http client written from scratch TLS for fun :D

- Http 1.1 version only supported
- Simple
- Typescript

Example:

```
const res = await ZClient.get("http://echo.free.beeceptor.com/");
console.log(res.text);
```

This is still under construction
