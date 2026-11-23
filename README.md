# moodle-atto-plugin (atto_annoto) — "Embed Annoto Media" for Atto

Adds an Annoto button to the Atto editor. It opens the Annoto picker (upload, record or pick a video) through
LTI 1.3 Deep Linking and inserts the chosen media; `filter_annoto` renders it as an embedded player.
Works like Kaltura's `atto_kalturamedia`.

Version 2.0.0 replaces the 2018 button that toggled an `<annoto/>` tag (that tag is no longer read by the current
Annoto plugin). The old "Default mode" setting is removed on upgrade.

## Requirements

- Moodle 3.11 – 4.5 (Atto in core), or Moodle 5.x with `editor_atto` from the plugins directory.
- `local_annoto` 5.7.0+ and `filter_annoto`.
- The Annoto media embed LTI 1.3 tool registered on the site (see `local_annoto` README, "Embed Annoto Media").

## Install

1. Copy to `lib/editor/atto/plugins/annoto` or install the ZIP; run the upgrade.
2. Add `annoto` to *Site administration > Plugins > Text editors > Atto HTML editor > Atto toolbar settings*,
   e.g. `insert = equation, charmap, table, clear, annoto`.
3. The button shows only to users with `atto/annoto:use` **and** `local/annoto:embedmedia` in the course, when
   an embed tool is configured. For students, allow both for the Student role.

## Development

`yui/src/button/js/button.js` is the source; `yui/build` was generated from it (`grunt shifter` in a Moodle
checkout regenerates it).

## License

GPL v3 or later. © Annoto Ltd.
