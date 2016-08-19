# TypeScript definitions for TagPro

Install the definitions in your userscript project:

```bash
typings install --save --global github:keratagpro/typed-tagpro
```

Then use an editor that supports TypeScript definition files, like [Visual Studio Code](https://code.visualstudio.com/).

```js
tagpro.<IntelliSense happens>
```

![Screenshot](example.png)

## NOTES

The definition file exports the tagpro object in three different ways:
1. As a module, so you can import it using e.g. `import tagpro from 'tagpro';` or `const tagpro = require('tagpro');`.
2. As a variable on window (`window.tagpro`).
3. As a global variable (`tagpro`).
