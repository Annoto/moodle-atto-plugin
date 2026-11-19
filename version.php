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
 * Version details.
 *
 * @package    atto_annoto
 * @copyright  Annoto Ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version   = 2026111900;        // The current plugin version (Date: YYYYMMDDXX).
$plugin->release   = '2.0.0';
$plugin->requires  = 2021051700;        // Moodle 3.11.
$plugin->supported = [311, 502];        // Atto is core up to 4.5; on 5.x it needs editor_atto from the plugins directory.
$plugin->maturity  = MATURITY_BETA;
$plugin->component = 'atto_annoto';
$plugin->dependencies = [
    'local_annoto' => 2026111900,
];
