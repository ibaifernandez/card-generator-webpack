/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("let symbols = [\"♦\", \"♥\", \"♠\", \"♣\"];\nlet values = [\"A\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"10\", \"J\", \"Q\", \"K\"];\nlet symbol;\nlet value;\n\nconst topSymbol = document.querySelector(\".header-symbol\");\nconst bottomSymbol = document.querySelector(\".footer-symbol\");\nconst mainValue = document.querySelector(\".body-symbol\");\n\nconst valueGenerator = () => {\n    symbol = symbols[Math.floor(Math.random() * 4)];\n    value = values[Math.floor(Math.random() * 13)];\n};\n\nconst assignSymbol = () => {\n    topSymbol.innerText = symbol;\n    bottomSymbol.innerText = symbol;\n};\n\nconst assignValue = () => {\n    mainValue.innerText = value;\n};\n\nconst assignColor = () => {\n    if (symbol === \"♦\" || symbol === \"♥\") {\n        topSymbol.classList.add(\"red\");\n        bottomSymbol.classList.add(\"red\");\n        mainValue.classList.add(\"red\");\n    } else {\n        topSymbol.classList.remove(\"red\");\n        bottomSymbol.classList.remove(\"red\");\n        mainValue.classList.remove(\"red\");\n    }\n};\n\nconst initialConfig = () => {\n    valueGenerator();\n    assignSymbol();\n    assignValue();\n    assignColor();\n};\n\nwindow.onload = initialConfig();\n\nconst button = document.querySelector(\".button\");\n\nbutton.addEventListener(\"click\", initialConfig);\n\n\n//# sourceURL=webpack://card-generator-webpack/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;