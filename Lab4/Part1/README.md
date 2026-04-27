# Part 1 - New York Times API

This part uses plain HTML, CSS, and JavaScript.

Before running it, open main.js and replace:

```js
const API_KEY = "PASTE_YOUR_NYT_API_KEY_HERE";
```

with a real New York Times developer API key.

Implementation notes:

- The page uses the Fetch API to call the NYT Popular Articles API.
- No external libraries are used.
- The filter form lets the user choose most viewed, most shared, or most emailed articles.
- The time frame options are day, week, and month.
- Each article is built inside a try/catch block. If required data is missing, that article is skipped and the next article is used.
