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
 * Upgrade steps for atto_annoto.
 *
 * @package    atto_annoto
 * @copyright  Annoto Ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Upgrade atto_annoto.
 *
 * @param int $oldversion
 * @return bool
 */
function xmldb_atto_annoto_upgrade($oldversion) {
    if ($oldversion < 2026111900) {
        // The 2018 <annoto/> toggle and its "Default mode" setting were removed.
        unset_config('default_mode', 'atto_annoto');
        upgrade_plugin_savepoint(true, 2026111900, 'atto', 'annoto');
    }
    return true;
}
