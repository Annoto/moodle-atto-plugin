<?php
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

/**
 * Atto "Embed Annoto Media" button: callbacks.
 *
 * @package    atto_annoto
 * @copyright  Annoto Ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Strings used by the YUI module.
 */
function atto_annoto_strings_for_js() {
    global $PAGE;
    $PAGE->requires->strings_for_js(['buttontitle'], 'atto_annoto');
}

/**
 * Parameters for the YUI module.
 *
 * @param string $elementid
 * @param array $options Editor options (context)
 * @param array $fpoptions File picker options
 * @return array
 */
function atto_annoto_params_for_js($elementid, $options, $fpoptions) {
    $context = $options['context'] ?? null;
    if (!$context) {
        $context = \context_system::instance();
    }
    $enabled = false;
    if (class_exists('\local_annoto\embed\helper')) {
        $enabled = has_capability('atto/annoto:use', $context)
            && \local_annoto\embed\helper::can_embed($context)
            && \local_annoto\embed\helper::is_configured();
    }
    return [
        'enabled' => $enabled,
        'contextid' => $context->id,
    ];
}
