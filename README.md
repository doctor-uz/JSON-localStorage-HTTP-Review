## Exercises

1. Make a JSON validator website. It should have a `<textarea>` where users can input their JSON. After clicking a button a message should appear, telling users if the JSON is valid or not.

   #### My [solution](https://github.com/doctor-uz/JSON-localStorage-HTTP-Review/tree/master/json_validator).



2. Write a function `askForNumber` that uses `prompt` to ask the user for a number between one and ten. It should check the result and if it is not a number between 1 and 10 it should throw an error with the message "not a valid number". Otherwise, it should return the number the user entered. Then, write a second function `translateNumberToGerman` that calls `askForNumber` and returns the German translation of that number as a string. If `askForNumber` throws an error, it should print the error's message to the console and prompt the user again.

   To restate this a bit differently:

- The process is started by calling `translateNumberToGerman`. It is `translateNumberToGerman` that calls `askForNumber`.

- `askForNumber` should call `prompt` and, depending on what `prompt` returns, either return a number or throw an exception.

- If `askForNumber` returns a number, `translateNumberToGerman` should return a string (a German translation of the number).

- If `askForNumber` throws an exception, `translateNumberToGerman` should catch that exception and restart the process.

  #### My [solution](https://github.com/doctor-uz/JSON-localStorage-HTTP-Review/tree/master/ask_for_number).



# <p align="center"> Some Theory</p>





# JSON

JSON is a format for data that is based on syntax used in the Javascript programming language. The name JSON stands for _Javascript Object Notation_. You already know how to write valid JSON since the format is just a stricter version of object literal syntax with which you are familiar.

JSON files are text files. If they have a file extension it is usually `.json` and when they are transferred via HTTP the content-type is usually `application/json`, although you sometimes see `text/json` and even `text/javascript` used instead.

The following is a valid JSON document:

```json
{
    "name": "Superman",
    "secretIdentity": "Clark Kent",
    "age": 77,
    "wearsCapes": true,
    "spouse": null,
    "powers": [ "flight", "strength", "x-ray vision" ],
    "residences": {
        "Metropolis": "main",
        "Antarctica": "weekends and holidays"
    }
}
```

Note that all of the property names are surrounded by quotes. In Javascript, quotes are optional for properties of object literals that are valid identifiers. They are not optional in JSON.

Below are some other examples of valid JSON documents.

```json
[ "Wonder Woman", "Batman", "Superman" ]
```

```json
"JSON is fun!"
```

```json
90210
```

```json
true
```

```json
null
```

## Dealing with JSON in Javascript

Javascript has a built in `JSON` object with two very useful methods:

* `parse` - converts a valid JSON string into a Javascript object

* `stringify` - converts a Javascript object into a valid JSON string

Both of these methods can throw exceptions when they receive invalid input. Unless you are very confident in what you are parsing or stringifying, you will want to use `try...catch` when calling these methods.

When you pass an object to `JSON.stringify` containing properties that JSON does not allow, those properties will be omitted from the resulting string and no exception will be thrown.

```js
var shape = {
    type: 'rectangle',
    width: undefined,
    height: undefined,
    getArea: function() {
        return this.width * this.height;
    }
}

console.log(JSON.stringify(shape)); //logs '{ "type": "rectangle" }'
```

Undefined values and functions are not allowed in JSON. Similarly, properties that are inherited from a prototype or are unenumerable are also omitted.

```js
var square = Object.create({ type: 'rectangle' }, {
    width: {
        value: 10
    },
    height: {
        value: 10,
        enumerable: true
    }
});

console.log(JSON.stringify(square)); //logs '{ "height": 10 }'
```



# `try...catch`

`try...catch` structures are used to handle exceptions. If you are writing code that may throw an exception due to circumstances beyond your control, you should put it in a `try` block and follow it with a `catch` block in which you handle the exception.

```js
try {
    doSomethingThatMayThrowAnException();
} catch (e) {
    logException(e);
}
```

The `catch` block is like a function in that it is passed a parameter that is inaccessible outside of it. That parameter will usually contain information about the error.

```js
try {
    asdfasfasf;
} catch (e) {
    console.log(e); //logs 'ReferenceError: asdfasfasf is not defined'
}
console.log(typeof e); //logs 'undefined'
```

However, if an exception is thrown manually it is possible that it will contain no useful information since it is possible to `throw` anything.

```js
try {
    throw null;
} catch (e) {
    console.log(e); //logs 'null'
}
```

## `finally`

You can also use a `finally` block with `try` or `try...catch`. Code inside a `finally` block will run whether or not an exception is thrown.

```js
try {
    doSomethingThatMayThrowAnException();
} catch (e) {
    handleTheException(e);
} finally {
    cleanUp();
}
```

Here's an interesting thing about `finally`: a `return` statement in a `finally` block will supersede a `return` in the `try` block.

```js
var fn = function() {
    try {
        return 5;
    } finally {
        return 10;
    }
};

fn(); //10
```



# `localStorage`

`localStorage` is a mechanism for storing data in the browser. As with cookies, access to stored data is governed by the <a href="https://en.wikipedia.org/wiki/Same-origin_policy">same-origin policy</a>. Data can only be read on pages in the same domain as the page on which the data was set.

A major advantage of `localStorage` over cookies is that you can store much more data with it. The exact amount differs from browser to browser, and some browsers allow users to configure the limits, but usually you can expect to have about 5MB available to you. Another important difference between `localStorage` and cookies is that data in `localStorage` is not automatically sent to the server when requests are made within the same domain.  

`localStorage` is a key-value database.

```js
localStorage.setItem('motto', 'Failing to prepare is preparing to fail.');
console.log(localStorage.getItem('motto')); // logs "Failing  to prepare is preparing to fail." 
localStorage.removeItem('motto');

```

One annoying thing is how some browsers handle `localStorage` when in private or incognito mode. The `localStorage` object is still available but if you  write data to it an exception is thrown. This means that you pretty much have to put your calls in a `try/catch`. 

```javascript
try {
  localStorage.setItem('motto', 'Failing to prepare is preparing to fail.');
  console.log(localStorage.getItem('motto')); // logs "Failing  to prepare is preparing to fail." 
  localStorage.removeItem('motto');
} catch (e) {
  console.log('What a nuisance');
}
```

Strings are the only type of data supported by  `localStorage` so the use of `JSON.parse` and `JSON.stringify` is often involved.

`localStorage` has a friend named [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) that works in the exact same way except that it is tied to the window. When the user closes the window or tab, the data held by `sessionStorage` is blown away. If a user has two tabs open with the same site in each, the data placed in `sessionStorage` in one tab is _not_ accessible in the other. 

# HTTP

<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP">HTTP</a> is the protocol web clients and web servers use to communicate and transfer resources. Every time you type a url into your web browser you are initiating an HTTP request. The page that your browser then displays was delivered in the HTTP response sent by whatever server you specified with the url you typed. Every image you see on the page represents an additional HTTP request. Similarly, the stylesheets and script files that make the page display and function correctly are also requested via HTTP.

## Requests

HTTP requests start with a single line that contains the HTTP _method_ for the request, the location of the requested resource on the server receiving the request, and the version of HTTP being used.

The first line is followed by a series of zero or more lines containing _headers_. Each header has a name and a value. There is a set of standard headers with specific meanings but it is also permitted to add non-standard, custom headers.

After the headers there is a blank line that is optionally followed by a message body. For example, if the request is the submission of form data, the form data would be the body.

## Responses

HTTP responses start with a single line that contains the HTTP version being used, a _status code_, and a status message in English (e.g., OK, Forbidden, etc.).

The first line is followed by a series of zero or more lines containing _headers_. Each header has a name and a value. There is a set of standard headers with specific meanings but it is also permitted to add non-standard, custom headers.

After the headers there is a blank line that is optionally followed by a message body. For example, if the request was for a web page or an image, an HTML document or image file would be the body.

## HTTP Methods

The HTTP methods you will deal with most often are:

* **GET** - GET requests simply request a resource. GET requests cannot usefully have a body. GET responses, however, will usually have a body containing the requested resource.

* **HEAD** - HEAD is exactly like GET except the responses do not have bodies. When you make a HEAD request, you are saying that you are only interested in seeing the headers.

* **POST** - POST requests are meant to initiate an action on the server, such as the writing of the submitted data to a database.

* **DELETE** - DELETE requests are for removing a resource from the server

* **PUT** - PUT requests are for putting a new resource on the server or for replacing an existing resource. In practice, PUT requests are frequently used for updating an existing resource as well.

* **OPTIONS** - OPTIONS requests are for determining what communication options are available. Browsers automatically make OPTIONS requests to determine whether to allow a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a> request.

## HTTP headers

There are <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html">47 standard HTTP headers</a> that clients and/or servers may send. Some headers you are particularly likely to have dealings with are:

* `Cache-Control` - set by the server to indicate whether and for how long the content of the response should be cached

* `Content-Type` - set by the server to indicate the mime type of the content of the response (e.g., "text/html" or "text/css")

* `Date` - set by the server to indicate the date and time that the response originated. This header is also involved with controlling caching behavior. Clients may also set this header in requests that have a message body

* `Expires` - set by the server to indicate the date and time at which the response's content should be considered out of date. This header is also involved with controlling caching behavior

* `Host` - set by the client to indicate the host the request is intended for. Servers need to know this information because there may be more than one host on a single server

* `Referer` - set by the client to indicate the url of the previous page. Browsers only set this if the user clicks a link on a page to go to another page. It is not set if the user types in another page's url in the browser's location bar. It is also not set when going from an https page to and http page. Note that this header's name is a misspelling (it should have been _referrer_). It's too late to fix this now!

* `User-Agent` - set by the client to convey information about itself, such as its name, version number, and the operating system it is running on

* `Cookie` - set by the client and contains the cookies that have been set for the domain

* `Set-Cookie` - set by the server to communicate the cookie data that the client should send back in subsequent requests to the domain

* `WWW-Authenticate` - set by the server to indicate that a password prompt should be shown

* `Authorization` - set by the client and to communicate user credentials for access to restricted resources

* `Location` - set by the server to redirect the client to the specified url



## HTTP Status Codes

There are <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">over 50 defined status codes</a> currently. Some status codes you will frequently encounter are:

* **200 OK** - Indicates success

* **301 Moved Permanently** - Indicates that the resource has been relocated permanently. Browsers automatically redirect to the new location indicated in the response

* **302 Found** - Indicates that the resource has been relocated temporarily. Browsers automatically redirect to the new location indicated in the response

* **400 Bad Request** - The request used invalid syntax and could not be understood

* **401 Unauthorized** - Authentication is required to complete the request

* **403 Forbidden** - The client does not have permission to access the resource

* **404 Not Found** - The resource does not exist on the server

* **408 Request Timeout** - The client is taking too long and the server is shutting down the connection

* **500 Internal Server Error** - The server is unable to handle the request because of some failing on its part

* **503 Service Unavailable** - The server is down or too busy handling other requests