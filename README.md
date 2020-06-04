# i9multiselect

A jquery plugin to emulate checkboxes on html select multiple element, using jquery and fontawesome.

The motivation for creating this plugin was the desire to use the default html select multiple element without adding divs and more elements to have checkboxes on it, many incompatible with html5 validation.

## Dependencies

- jquery
- FontAwesome

## How it works

First, the plugin uses css and FontAwesome to add the checkbox icons before the option elements. It uses simple css, so you should override it with your own css for colors, background, borders, etc.

Then the plugin uses jquery to override the default browser behavior, to it can multiple select on click, navigate with keyboard, etc.

## Usage

1. Import the _i9multiselect_ `css` and `js` to your page

   - `<link rel="stylesheet" href="<path>/i9multiselect.css" />`

   - `<script src="<path>/i9multiselect.js"></script>`

2. Add the class `i9multiselect` to your select (with multiple property)

   - `<select class="i9multiselect" multiple>...`

3. Use jquery to apply the plugin on the select: `$('<selector>').i9multiselect();`
