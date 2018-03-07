# Offset XX

#### Current stable version: Version 1.0

## Finished Features
* Live VATSIM Map
    * Displaying Air Traffic Controllers.
    * Displaying Pilots.
* List of Aircraft
    * Including all flight plan information.
* List of Air Traffic Controllers
    * Including callsign, area of responsibility (following a general scheme), member, frequency and rating.
* List of online pilots (dual-cockpit/observer mode), observers, supervisors and administrators.
* List of prefiled flight-plans.
    * Includes all flight-plan information.
## Beta Features
* List of Online Airports (_in beta_)
    * Displays ICAO and if DEL, GND, TWR, DEP, APP positions are manned.
        * Some American and Chinese airports use 3-letter IATA codes as opposed to ICAO. Current method of filtering is manual within a PHP file - a database would be better for filtering.
* Weekly ATC League (_in beta_)
    * Similar to the VATSIM one, except it looks nicer and compares members not positions.
    * Timing isn't perfect, but it tries it's best.

* _Website version does not have a currently active weekly ATC league, haven't got around to resetting up cron job for it_

## Run your own!
If you're looking to run your own, firstly download the [latest relase](https://github.com/KiloSierraCharlie/OffsetXX/releases) (or if you're feeling a little more experimental, clone the current repo). Place it straight into the web directory where you want it to display, and setup a cron job for the necessary file.
