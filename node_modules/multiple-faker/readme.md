# MASS FAKER DATA GENERATOR

This package utilizes the [faker](https://www.npmjs.com/package/faker) npm package to generate random data depending on user input.

## INSTALL

```
npm install multiple-faker
```

## API

```js
const multipleFaker = require("multiple-faker");
const generatedData = multipleFaker(numRows, attributes);
```

-> generatedData is an array of objects

-> numRows must be a valid integer -- this will be the number of items in the array generated

-> attributes are the attributes/sub-attributes of the [faker](https://www.npmjs.com/package/faker) library

### Note:

- the attributes and sub-attributes are taken from the [faker](https://www.npmjs.com/package/faker) library
- attributes field should be in the following format

```js
const attributes = {
  attribute1: ["sub-attribute1","sub-attribute2","sub-attribute3"]
  attribute2: ["sub-attribute1","sub-attribute2","sub-attribute3"]
}
```

## EXAMPLES

### EXAMPLE ONE

---

```js
const multipleFaker = require("multiple-faker");

const attributes = {
  name: ["firstName", "lastName", "jobTitle"],
  phone: ["phoneNumber"],
  random: ["number"]
};

const numRows = 1;

const generatedData = multipleFaker(numRows, attributes);
```

```js
//data
[
  {
    firstName: "Georgianna",
    lastName: "Monahan",
    jobTitle: "Future Data Designer",
    phoneNumber: "1-608-841-7767",
    number: 21605
  }
];
```

### EXAMPLE TWO

---

```js
const multipleFaker = require("multiple-faker");

const attributes = {
  image: ["avatar"],
  finance: ["account", "accountName"],
  hacker: ["abbreviation"]
};

const numRows = 3;

const generatedData = multipleFaker(numRows, attributes);
```

```js
//data
[
  {
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ionuss/128.jpg",
    account: "78877554",
    accountName: "Auto Loan Account",
    abbreviation: "HTTP"
  },
  {
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/therealmarvin/128.jpg",
    account: "47268519",
    accountName: "Savings Account",
    abbreviation: "FTP"
  },
  {
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/keryilmaz/128.jpg",
    account: "74557420",
    accountName: "Money Market Account",
    abbreviation: "SMS"
  }
];
```

### EXAMPLE THREE

---

```js
const multipleFaker = require("multiple-faker");

const attributes = {
  lorem: ["word", "lines"],
  random: ["number", "uuid", "boolean", "alphaNumeric"]
};

const numRows = 2;

const generatedData = multipleFaker(numRows, attributes);
```

```js
//data
[
  {
    word: "reprehenderit",
    lines: "Facilis dolorem occaecati commodi unde quis velit.\nQuia vel dolorum qui.",
    number: 45391,
    uuid: "81cfcb6e-577c-44b2-b19d-b28fa4b63d9f",
    boolean: false,
    alphaNumeric: "2"
  },
  {
    word: "et",
    lines:
      "Dolores saepe minima ut quam optio optio.\nExercitationem ut excepturi quia non corporis dolor velit et et.\nEum consectetur temporibus est totam.\nExercitationem atque totam quo dolor.\nQuibusdam architecto vero.",
    number: 1449,
    uuid: "126abb79-dc6d-43e2-80d7-6930ef35d9a9",
    boolean: false,
    alphaNumeric: "o"
  }
];
```
