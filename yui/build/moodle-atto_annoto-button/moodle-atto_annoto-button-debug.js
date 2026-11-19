YUI.add('moodle-atto_annoto-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_annoto
 * @copyright  Annoto Ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_annoto-button
 */

/**
 * Atto "Embed Annoto Media" button.
 *
 * Opens local/annoto/embed/select.php (LTI 1.3 Deep Linking with Annoto) in a dialogue iframe and
 * inserts the placeholder link that local/annoto/embed/return.php posts back. filter_annoto renders it.
 *
 * @namespace M.atto_annoto
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_annoto',
    IFRAME_ALLOW = 'camera *; microphone *; display-capture *; autoplay *; fullscreen *; clipboard-write *';

Y.namespace('M.atto_annoto').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * The selection saved when the dialogue opened.
     *
     * @property _currentSelection
     * @type Range[]
     * @private
     */
    _currentSelection: null,

    /**
     * The window message handler while the dialogue is open.
     *
     * @property _messageHandler
     * @type Function
     * @private
     */
    _messageHandler: null,

    initializer: function() {
        if (!this.get('enabled')) {
            return;
        }
        this.addButton({
            icon: 'icon',
            iconComponent: COMPONENTNAME,
            buttonName: 'annoto',
            title: 'buttontitle',
            callback: this._openPicker
        });
    },

    /**
     * Open the Annoto picker in a dialogue.
     *
     * @method _openPicker
     * @private
     */
    _openPicker: function() {
        var host = this.get('host'),
            url = M.cfg.wwwroot + '/local/annoto/embed/select.php?contextid=' +
                encodeURIComponent(this.get('contextid')),
            dialogue,
            iframe;

        this._currentSelection = host.getSelection();

        dialogue = this.getDialogue({
            headerContent: M.util.get_string('buttontitle', COMPONENTNAME),
            width: '1100px',
            focusAfterHide: true
        });

        iframe = Y.Node.create('<iframe></iframe>');
        iframe.setAttrs({
            src: url,
            allow: IFRAME_ALLOW,
            allowfullscreen: 'true',
            title: M.util.get_string('buttontitle', COMPONENTNAME)
        });
        iframe.setStyles({width: '100%', height: '70vh', border: '0'});

        dialogue.set('bodyContent', iframe);
        dialogue.after('visibleChange', function(e) {
            if (!e.newVal) {
                this._stopListening();
                dialogue.set('bodyContent', '');
            }
        }, this);

        this._stopListening();
        this._messageHandler = Y.bind(function(event) {
            var data = event.data;
            if (event.origin !== window.location.origin || !data || data.source !== 'local_annoto_embed' ||
                    !iframe.getDOMNode() || event.source !== iframe.getDOMNode().contentWindow) {
                return;
            }
            if (data.action === 'insert' && typeof data.html === 'string') {
                this._insert(data.html);
            }
            dialogue.hide();
        }, this);
        window.addEventListener('message', this._messageHandler);

        dialogue.show();
    },

    /**
     * Insert the placeholder HTML at the saved selection.
     *
     * @method _insert
     * @param {String} html
     * @private
     */
    _insert: function(html) {
        var host = this.get('host');
        this.editor.focus();
        if (this._currentSelection) {
            host.setSelection(this._currentSelection);
        }
        host.insertContentAtFocusPoint(html + '&nbsp;');
        this.markUpdated();
    },

    /**
     * Remove the window message handler.
     *
     * @method _stopListening
     * @private
     */
    _stopListening: function() {
        if (this._messageHandler) {
            window.removeEventListener('message', this._messageHandler);
            this._messageHandler = null;
        }
    }
}, {
    ATTRS: {
        /**
         * Whether the user may use the button here (capabilities and a configured embed tool).
         *
         * @attribute enabled
         * @type Boolean
         */
        enabled: {
            value: false
        },

        /**
         * Context id of the editor.
         *
         * @attribute contextid
         * @type Number
         */
        contextid: {
            value: null
        }
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
