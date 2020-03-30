# html-bricks-plugin-translation

Translation for [html-bricks](https://github.com/html-bricks/html-bricks).

The goal of this is to have zero-config translation that is simple enough that anyone can figure it out and at the same time flexible enough that you can use it for everything.

> Disclaimer: Only translates inside HTML files.

## Requirements

`html-bricks` >= 0.3.

## Installation

Install using npm

`npm install --save-dev html-bricks-plugin-translation`

Then include the plugin in your config

```json
{
  "plugins": [
    "plugin-translation"
  ]
}
```

## Usage

In your HTML files you can translate something as follows:

```html
<translate lang="en">Something in English</translate>
<translate lang="es">Algo en español</translate>
<translate>Noget på dansk</translate>
```

In this example this HTML file adds three languages: en (English), es (Spanish) and the default (Danish).

Adding a language in any HTML files makes sure that *all HTML files* are compiled in *all languages*.

Be aware that there are no fallbacks, when the correct translation does not exist. In fact, you can understand the `<translate>` tags as if-statements: Is lang property equal the language that we are currently compiling? If so, render it's children, if not, leave it out completely.

## Todo

Add a `<switch>` tag that can be used to render fallbacks when the correct language is not present.
