# Open MCT Plugin Template

This is a template for developing plugin(s) for [Open MCT](https://github.com/nasa/openmct). We plan to include example plugins that show basic and intermediate usage of the Open MCT API to request and display data. This is a work in progress, so please stay tuned for updates.

## Setup

- [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
- Open a terminal to the root of the project and run `nvm install` to install the correct node version as specified in the `.nvmrc` file.
- `nvm use` to switch to the correct node version (if already installed).
- `npm install`
- Start the development server: `npm start`
- Build for production: `npm run build`

## Examples

### Simple LAD Table

This is a simplified version of a LAD Table (Latest Available Data Table). It will display the latest value as a row in the table for a given parameter. It demonstrates usage of the `TelemetryCollection` to request and subscribe to the latest value for a given parameter. It also demonstrates usage of the `CompositionCollection` to register handlers for when a parameter is added or removed from the table.

#### View/ViewProvider Implementations

- [x] Vue 3
- [ ] React (WIP)

### Simple Telemetry Table (WIP)

This is a simplified version of a Telemetry Table. It will demonstrate usage of the `TelemetryCollection` to request historical data and to subscribe to the latest value for a given parameter.
