# WebPack SetUp

Practicing the setup of a web project with **WebPack**, some difficulties may be met in the process of configuration at its earliest stage. Let's have a look at how setting up **WebPack** as well as to every single issue I'I have met in the process of doing so.

## 1. The structure of the project

I have a brand new project folder by the name of `card-generator-webpack`. The structure of that folder is as follows:

    __/ card-generator-webpack
      |__/ src
      |  |__/ assets / img
      |              |__ favicon.jpeg
      |  |__ app.js
      |  |__ index.html
      |  |__ styles.css
      |__ README.md (this file that you are now reading)

## 2. Initializing WebPack

The first two commands which I run are `npm init -y` and `npm install webpack webpack-cli --save-dev`. I do so at the root of my project via Terminal. Once I've done it, the structure of my project looks like so:

    __/ card-generator-webpack
      |__/ (+) node_modules
      |__/ src
      |  |__/ assets / img
      |              |__ favicon.jpeg
      |  |__ app.js
      |  |__ index.html
      |  |__ styles.css
      |__ (+) package-lock.json
      |__ (+) package.json
      |__ README.md

> Notice how new files and folders are depicted with a `(+)` at the beginning of its corresponding lines. Likewise, the removal of files and folders will be depicted with a `(-)` at the beginning of their corresponding lines.

## 3. Meeting the first issue

Probably in a very naive fashion, I go to the `package.json` of my project and, under `"scripts"`, I add `"build": "webpack"` for this final result:

    {
        "name": "card-generator-webpack",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "webpack": "^5.75.0",
            "webpack-cli": "^5.0.1"
        }
    }

But, after running `npm run build`, I get a quite long error as output on the Terminal. This is it:

    ERROR in main
    Module not found: Error: Can't resolve './src' in '/Users/AGLAYA/Local Sites/card-generator-webpack'
    resolve './src' in '/Users/AGLAYA/Local Sites/card-generator-webpack'
    using description file: /Users/AGLAYA/Local Sites/card-generator-webpack/package.json (relative path: .)
    Field 'browser' doesn't contain a valid alias configuration
    using description file: /Users/AGLAYA/Local Sites/card-generator-webpack/package.json (relative path: ./src)
    no extension
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src is not a file
    .js
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src.js doesn't exist
    .json
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src.json doesn't exist
    .wasm
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src.wasm doesn't exist
    as directory
    existing directory /Users/AGLAYA/Local Sites/card-generator-webpack/src
    using description file: /Users/AGLAYA/Local Sites/card-generator-webpack/package.json (relative path: ./src)
    using path: /Users/AGLAYA/Local Sites/card-generator-webpack/src/index
    using description file: /Users/AGLAYA/Local Sites/card-generator-webpack/package.json (relative path: ./src/index)
    no extension
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src/index doesn't exist
    .js
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src/index.js doesn't exist
    .json
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src/index.json doesn't exist
    .wasm
    Field 'browser' doesn't contain a valid alias configuration
    /Users/AGLAYA/Local Sites/card-generator-webpack/src/index.wasm doesn't exist

    webpack 5.75.0 compiled with 1 error and 1 warning in 503 ms

Now, the only way that I've found to solve all of that in order to get WebPack to create the famous folder dist has been adding the path `./src/app.js` to the `"build": "webpack"` that I've just added before, so that the line ends up reading like this:

    "build": "webpack ./src/app.js"

And, finally, once I run `npm run build`, I do now get the folder dist, so that I my project's structure is now:

    __/ card-generator-webpack
      |__/ (+) dist
      |  |__ (+) main.js
      |__/ node_modules
      |__/ src
      |  |__/ assets / img
      |              |__ favicon.jpeg
      |  |__ app.js
      |  |__ index.html
      |  |__ styles.css
      |__ package-lock.json
      |__ package.json
      |__ README.md

> **Note**: Later on, the meaning of that `main.js` folder - as well as the meaning of many other files which will get to have in that `dist` folder - will be dully explained.

Thus - and to start with - probable questions would be:

1. **What is that error yielded on the Terminal exactly saying?**

2. **Why can't that error be solved by changing the `"main": "index.js"` to `"main": "app.js"`, or to `"main": "./src/app.js"` in the `package.json`?**

That I don't know. All suggestions will be welcomed.

3. **Why the only solution that I've found by myself implies adding an entry point to my `"build"` script?**

Because that is a _possible_ solution. It might not be the only one, but it is definitively one of them.

4. **Is it _logical_ to add an entry point to my `"build"` script?**

I don't know what _logical_ may even mean, but it definitively seems so, as it helps to fix the issue.

Finally, according with WebPack's documentation:

### Additional configurations suggested by WebPack's official documentation

> We also need to adjust our `package.json` file in order to make sure we mark our package as `private`, as well as **removing the main entry**. This is to prevent an accidental publish of your code.

So...

1. **Why does WebPack's documentation read that removing the main entry is necessary?**

2. **What does WebPack's documentation mean with "accidental publish of your code"?**

3. **Why could our code be published by accident and how does `"private": true` help to prevent this from happening?**

4. **What if I want to willingly publish it? Should I erase or change this `"private": true` value?**

### Solutions

For what it may be worth, and according to what I've kept on researching, the solution to the problem lies in the fact that Webpack

> **take[s] `./src/index.js` as the default!**

---

**[Source](https://stackoverflow.com/questions/49772863/webpack-4-error-in-entry-module-not-found-error-cant-resolve-src)**

![Source](../../img/webpack/webpack-solution.png)

---

So either the .js file that we want to use as the entry point is called `index.js`, and it's in the `./src/` path or _things blow up_... Or, also, tweak the configuration of our project to make it work. This is, if we want the entry point to be different from the one taken by WebPack by default, we have three possible solutions:

#### First solution

_Tweaking_ a bit our `package.json` right where we define the script that usually gets the name of `"build"`. In this case, what needs to be done is to add an entry point after the `"webpack"` value. That is, it should end up like this:

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack [entry point]"
    },

Or, for example, if we were using the `app.js` file in the root of our document:

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack ./app.js"
    },

#### Second solution

The second solution is to start by adding the configuration file `webpack.config.js` to the root of our project. Within, we'll need to add:

    module.exports = {
        entry: "./app.js",
    };

#### Third solution

Forget about all the rest and just name your main .js file as `index.js` and place it within the path `./src/`.

Actually, we are going to opt out for this third solution in such a way that our folder structure would have started as:

    __/ card-generator-webpack
      |__/ src
      |  |__/ assets / img
      |  |           |__ favicon.jpeg
      |  |__ index.js
      |  |__ index.html
      |  |__ styles.css
      |__ README.md

And, for starters, that would solve the enormous error that I showed in the main message of this thread, as well as the first question, which was:

> 1. **What is that error yielded on the Terminal saying?**

If we take a closer look at each one of the errors outputted by the terminal separatedly:

    Module not found: Error: Can't resolve './src' in '/Users/AGLAYA/Local Sites/card-generator-webpack'
    resolve './src' in '/Users/AGLAYA/Local Sites/card-generator-webpack'
    using description file: /Users/AGLAYA/Local Sites/card-generator-webpack/package.json (relative path: .)

This is, a **module hasn't been found** because a certain path couldn't be resolved - concretely, `./src` - within the project folder (`/Users/AGLAYA/Local Sites/card-generator-webpack`) while trying to use the configuration found in the `package.json`file found at `/Users/AGLAYA/Local Sites/card-generator-webpack/package.json`

> 2. **Why can't that error be solved by changing the `"main": "index.js"` to `"main": "app.js"` (or to `"main": "./src/app.js"`) in our `package.json`?**

That I don't know. All suggestions will be welcomed.

> 3. **Why the only solution I've found by myself implies adding an entry point to my `"build"`?**

Because, indeed, it is one of the possible solutions.

> 4. **Is it _logical_ to add an entry point to my `"build"`?**

Well, I assume that _it is_ logical because, once again, **WebPack** defaults to `./src/index.js` as its entry point.

Now, regarding all the previous second set of questions, my doubts remain, in case somebody out there is kind enough to find an answer to share. These are those questions I am still uncertain about:

1. **Why does WebPack's documentation read that removing the main entry is necessary?**

2. **What does WebPack's documentation mean with "accidental publish of your code"?**

3. **Why could our code be published by accident and how does `"private": true` help to prevent this from happening?**

4. **What if I want to willingly publish it? Should I erase or change this `"private": true` value?**

### Back to the beginning (1)

Then, basically, we have an **initial** project folder which should look like so:

    __/ card-generator-webpack
      |__/ src
      |  |__/ assets / img
      |  |           |__ favicon.jpeg
      |  |__ index.js
      |  |__ index.html
      |  |__ styles.css
      |__ README.md

And, after running the initial `npm init -y` as well as the subsequent `npm install webpack webpack-cli --save-dev`, the structure would be like:

    __/ card-generator-webpack
      |__/ node_modules
      |__/ src
      |  |__/ assets / img
      |  |           |__ favicon.jpeg
      |  |__ index.js
      |  |__ index.html
      |  |__ styles.css
      |__ package.lock.json
      |__ package.css
      |__ README.md

We add the `"build": "webpack"` script to our `package.json` making it now look like so:

    {
        "name": "card-generator-webpack",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "webpack": "^5.75.0",
            "webpack-cli": "^5.0.1"
        }
    }

And now we can run our first `npm run build`, we should execute without a single problem. After doing that, we will have generated a `dist` folder, which should be containing one single .js file (`main.js`).

#### Funny stuff that deserves consideration

Our `dist` folder stands for _distribution_.

Now that we've generated it with its respective content (`main.js`), we can call this `main.js` file in our **source** (`./src`) HTML file (like so —`<script src="../dist/main.js"></script>`). Having done this, our application _should_ work properly as long as there's no inline calls to any of the functions contained in our original (**source**) JavaScript code. Those functions would not run since our new `main.js` does not include any of those calls.

This is:

Our **initial** (_source_) HTML code looked like so:

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>21 BlackJack</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body onload="initialConfig();">
            <div class="card">
            <div class="card-header">
                <div class="header-symbol"></div>
                </div>
            <div class="card-body">
                <div class="body-symbol"></div>
            </div>
            <div class="card-footer">
                <div class="footer-symbol"></div>
            </div>
            </div>
            <div id="button-div">
            <button class="button" onclick="initialConfig();">Click me</button>
            </div>
            <script src="index.js"></script>
        </body>
    </html>

After running `npm run build`, we change the inline call to the script, for a resulting:

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>21 BlackJack</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body onload="initialConfig();">
            <div class="card">
            <div class="card-header">
                <div class="header-symbol"></div>
                </div>
            <div class="card-body">
                <div class="body-symbol"></div>
            </div>
            <div class="card-footer">
                <div class="footer-symbol"></div>
            </div>
            </div>
            <div id="button-div">
            <button class="button" onclick="initialConfig();">Click me</button>
            </div>
            (-) <script src="index.js"></script>
            (+) <script src="../dist/main.js"></script>
        </body>
    </html>

Now, as that code above stands, neither `<body onload="initialConfig();">` nor `<button class="button" onclick="initialConfig();">Click me</button>` would work since our `main.js` would now read as:

    (() => {
        let e,
            o,
            t = ["♦", "♥", "♠", "♣"],
            r = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const d = document.querySelector(".header-symbol"),
            s = document.querySelector(".footer-symbol"),
            a = document.querySelector(".body-symbol"),
            l = () => {
                (e = t[Math.floor(4 * Math.random())]),
                    (o = r[Math.floor(13 * Math.random())]),
                    (d.innerText = e),
                    (s.innerText = e),
                    (a.innerText = o),
                    "♦" === e || "♥" === e
                        ? (d.classList.add("red"),
                        s.classList.add("red"),
                        a.classList.add("red"))
                        : (d.classList.remove("red"),
                        s.classList.remove("red"),
                        a.classList.remove("red"));
            };
        (window.onload = l()),
            document.querySelector(".button").addEventListener("click", l);
    })();

Therefore, having that `initialConfig` function called in our HTML code as it now points to `<script src="../dist/main.js"></script>` will yield no result as that function can't be found in our _newly generated_ `main.js` file.

What we could do instead would be create the source .js file (`index.js`) with _Event Listeners_ functions which produced the desired effects, and then packing up that source file using `npm run build` in a normal manner, to have those _Event Listeners_ functions compiled into the final output `main.js` file.

Let's say that our original HTML file code does not contain inline script calls to any function at all. This is:

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>21 BlackJack</title>
            <link rel="stylesheet" href="style.css" />
        </head>
        <body>
            <div class="card">
                <div class="card-header">
                    <div class="header-symbol"></div>
                </div>
                <div class="card-body">
                    <div class="body-symbol"></div>
                </div>
                <div class="card-footer">
                    <div class="footer-symbol"></div>
                </div>
            </div>
            <div id="button-div">
                <button class="button">Click me</button>
            </div>
            <script src="index.js"></script>
        </body>
    </html>

And, so, our initial .js file (`index.js`) looks like so:

    let symbols = ["♦", "♥", "♠", "♣"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let symbol;
    let value;

    const topSymbol = document.querySelector(".header-symbol");
    const bottomSymbol = document.querySelector(".footer-symbol");
    const mainValue = document.querySelector(".body-symbol");

    const valueGenerator = () => {
        symbol = symbols[Math.floor(Math.random() * 4)];
        value = values[Math.floor(Math.random() * 13)];
    };

    const assignSymbol = () => {
        topSymbol.innerText = symbol;
        bottomSymbol.innerText = symbol;
    };

    const assignValue = () => {
        mainValue.innerText = value;
    };

    const assignColor = () => {
        if (symbol === "♦" || symbol === "♥") {
            topSymbol.classList.add("red");
            bottomSymbol.classList.add("red");
            mainValue.classList.add("red");
        } else {
            topSymbol.classList.remove("red");
            bottomSymbol.classList.remove("red");
            mainValue.classList.remove("red");
        }
    };

    const initialConfig = () => {
        valueGenerator();
        assignSymbol();
        assignValue();
        assignColor();
    };

    window.onload = initialConfig();

    const button = document.querySelector(".button");

    button.addEventListener("click", initialConfig);

Once we run `npm run build` for first time (never mind the warnings outputted by the Terminal just yet, we will get to them later on), we can see again how the `dist` folder has been duly created, duly containing a `main.js`.

Just like we did before, we can now call this `main.js` file in our **source** (`./src`) HTML file (like so —`<script src="../dist/main.js"></script>`), run a live version of it in our browser, and _it most definitively should work now_.

### Funny stuff to be considered (1)

Let's delete the `dist` folder - and what it contains - and let's make sure that our original HTML code calls the script at `../dist/main.js` in our HTML code (`<script src="../dist/main.js"></script>`). Let's run `npm run build` again.

Notice any difference? You definitilve should not... because there's not a single difference. Because the **entry point** of our `"build"`script still is `index.js`, so there's has been no real change to what running thise particular script is concerned.

I am just pointing this out because we will most probably find a somewhat similar _funny issue_ as we move on with our practice.

## 4. Configuring the `mode`

Remember that one warning I said not to care about? Well, let's take care of it now. It goes like:

    WARNING in configuration
    The 'mode' option has not been set, webpack will fallback to 'production' for this value.
    Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
    You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

As we can read, by default, **WebPack** fall back to _production_ mode at the time of being run.

Basically, it is time - in case it's not been done yet - to create a config file at the root of our project. The name of the file can be many, but the recommendation would be to either call it `webpack.config.js`, or to create two of them and call them, resepctively, `dev.config.js` and `prod.config.js`. This second _strategy_ is obviously meant to have two configuration files set up which will be used, respectively, for _development_ mode, and for _production_ mode.

At the moment, we are going to go with `webpack.config.js`.

According to [WebPack's official documentation](https://webpack.js.org/configuration/mode/#root):

---

# Mode

Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.

`string = 'production': 'none' | 'development' | 'production'`

## Usage

Provide the `mode` option in the config...

    module.exports = {
        mode: 'development',
    };

...or pass it as a CLI argument:

`webpack --mode=development`

---

Thus, we create the `webpack.config.js` file and we add as its content:

    module.exports = {
        mode: 'development',
    };

... or:

    module.exports = {
         mode: 'production',
    };

## 5. Loading our HTML file(s) to the `dist` folder

In order to load our HTML file(s) to the `dist` folder, we are going to need the **[HTML Loader](https://webpack.js.org/loaders/html-loader/)**.

According to the official WebPack's HTML-loader documentation:

---

# Getting Started

To begin, you'll need to install html-loader by running this command on the Terminal:

`npm install --save-dev html-loader`

Once you've done it, you'll be able to see that another dependency has been added to the `package.json` file, like so:

![WebPack Snapshot 1](../../img/webpack/webpack-snapshot-1.png)

Then, add a call to HTML-Loader to your webpack config file (`webpack.config.js`):

    module.exports = {
        mode: "development",
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
            ],
        },
    };

That's just a way to tell WebPack to make use of the _loader_ `html-loader` to load the HTML into our `dist` folder as we run `npm run build`. Now, **what should WebPack do with it**?

For that, we are going to need a plugin. In this case, **[HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)**.

According to WebPack's official documentation on this plugin:

---

# HtmlWebpackPlugin

The **HtmlWebpackPlugin** simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates, or use your own loader.

## Installation

Run the `npm install --save-dev html-webpack-plugin` command in Terminal.

The `package.json` file should now look like so:

![WebPack Snapshot 2](../../img/webpack/webpack-snapshot-2.png)

## Basic Usage

The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.

---

Now, to add the plugin to your webpack configuration (file), include:

1. `const HtmlWebpackPlugin = require('html-webpack-plugin');` out of `module.exports`.

2. `plugins: [new HtmlWebpackPlugin()],` within `module.exports`.

At the end, this should be the result:

    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
        mode: "development",
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
            ],
        },
        plugins: [new HtmlWebpackPlugin()],
    };

Once this has been done:

1. Let's delete our `dist` folder (and its content).
2. Let's modify our _source_ HTML code to the initial set up (this is, including `<script src="index.js"></script>` to call for the original script file).
3. And let's run `npm run build`.

If we do so, we will see that, besides the `main.js` file, a new `index.html` file has been created _within_ the `dist` folder of our project, so that our project now looks like so:

    __/ card-generator-webpack
      |__/ (+) dist
         |__/ (+) index.html
         |__/ (+) main.js
      |__/ node_modules
      |__/ src
      |  |__/ assets / img
      |              |__ favicon.jpeg
      |  |__ index.js
      |  |__ index.html
      |  |__ styles.css
      |__ package-lock.json
      |__ package.json
      |__ README.md
      |__ (*) webpack.config.js

> **Please, remember**: `webpack.config.js` has not been generated as this last execution of `npm run build`. We created manually a while ago, which is why I've pointed out with a `(*)` in this case.

#### Analyzing the resulting HTML file contained within the `dist` folder

If we take a look at that resulting HTML file contained within the `dist` folder, we should see:

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Webpack App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="main.js"></script></head>
        <body>
        </body>
    </html>

So that we realize:

1. Our <title> tag content has changed.

2. The script is now not called within the `<body>` tag, but within the `<head>` tag.

3. The script call includes a keyword—`defer`.

But, more importantly,

4. The content of our `<body>` is gone!!!

Good questions - which I don't _yet_ know the answers for - about this would be:

1. Why has the `<title>` tag content changed?

2. Why is the script now being called within our `<head>` and not within our `<body>`?

    1. Does that make any difference?

3. What does `defer` mean and does?

4. Why the content of our `<body>` is gone!?

What I know is how to choose the content of the `<title>` tag od our resulting HTML file, as well and how to drag the content of our original HTML file. Let's take a look at it.

### Dragging the content of our original HTML file

Certainly, if we were to have a look at the live version of our project now, we will only see whichever content has been generated by the `main.js` stored in the `dist` folder... and nothing else.

Considering that it is more than likely that we want to see our original HTML code (the one that we had in the _source_ (`src`) folder represented in the `index.html` that we have now generated in our `dist` folder hby running `npm run start`.

In order to do that, we will need to draw upon the **HtmlWebpackPlugin**'s official documentation, which can be found on [GitHub](https://github.com/jantimon/html-webpack-plugin).

If we scroll down the `README.md` file, we will reach the "OPTIONS" part.

AS many options as we want to use, we will place them as an object within the calling of the `HtmlWebpackPlugin()`in our `webpack.config.js`. This is:

    ...
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Test",
            filename: "my-index.html",
            template: "./src/index.html",
            favicon: "./src/assets/img/favicon.jpeg",
        }),
    ],
    ...

For the following final overall result:

    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
        mode: "development",
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack Test",
                filename: "my-index.html",
                template: "./src/index.html",
                favicon: "./src/assets/img/favicon.jpeg",
            }),
        ],
    };

In this example:

-   `title` gives us the opportunity to choose the content of our `<title>` tag.

-   `filename` gives us the chance to rename the output HTML file.

-   `template` will drag all the content of our source HTML file.

-   `favicon` allows us to give a path where to find (and drag to the output) our favicon.

If we decide to run `npm run build` as things stand right now, the results will be a bit crazy:

1. A `my-index.html`file has been created. Its content reflects the given title and the tag of the favicon:

```
    ...
        <title>21 BlackJack</title>
        ...
        <link rel="icon" href="favicon.jpeg" />
    ...
```

2.  `my-index.html` has been added to the former contents of our `dist` folder along many other files, so that the structure of our project now is:

        __/ card-generator-webpack
        |__/ dist
            |__/ (+) "long-ass"-"hashed"-file.js
            |__/ (+) "long-ass"-"hashed"-file.css
            |__/ (+) favicon.jpeg
            |__/ index.html
            |__/ main.js
            |__/ (+) my-index.html
        |__/ node_modules
        |__/ src
        |  |__/ assets / img
        |              |__ favicon.jpeg
        |  |__ index.js
        |  |__ index.html
        |  |__ styles.css
        |__ package-lock.json
        |__ package.json
        |__ README.md
        |__ webpack.config.js

3.  There are two weird-named files (a .js file and a .css file). They - their names, in fact - have been _hashed_. **What is happening, why it is happening and what it entails** are questions which I don't yet have answer to. So, please, if anybody can give me proper answers to previous questions, I'd be more than grateful.

4.  Both of those _hashed_ files are being called in the content of the new `my-index.html` file.

```
    ...
    <link rel="stylesheet" href="e53c8ac6852bda264040.css" />
    ...
    <script src="e3f5fbec5fed691cceab.js"></script>
    ...
```

5.  The `index.html` that was generated thru the next-to-last execution of `npm run build` is still there.

> What the fudge is going on!? Please, somebody help me here!!!

## How to clean the output

Where as I don't have a single clue of what on Earth might have happened back there, one thing that I do know is how to prevent outputted files to keep piling up within our `dist` folder. In order to get that achieved, all that we have to do is add some more code to our configuration file (`webpack.config.js`), as explained in [WebPack's official documentation](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder). Concretely, this:

    output: {
        clean: true,
    },

For example, if we ran `npm run build` right after adding that last configuration to our `webpack.config.js` file, `index.html` would disappear, and the project's structure would remain like so:

        __/ card-generator-webpack
        |__/ dist
            |__/ "long-ass"-"hashed"-file.js
            |__/ "long-ass"-"hashed"-file.css
            |__/ favicon.jpeg
            |__/ (-) index.html
            |__/ main.js
            |__/ my-index.html
        |__/ node_modules
        |__/ src
        |  |__/ assets / img
        |              |__ favicon.jpeg
        |  |__ index.js
        |  |__ index.html
        |  |__ styles.css
        |__ package-lock.json
        |__ package.json
        |__ README.md
        |__ webpack.config.js
