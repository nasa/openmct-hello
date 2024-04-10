# Open MCT Plugin Template

This is a template for developing plugins for [Open MCT](https://github.com/nasa/openmct). It includes example plugins demonstrating basic usage of the Open MCT API for requesting, subscribing to, and displaying data. This document is a work in progress and will be updated with more examples and guidance.

## Table of Contents

- [Setup](#setup)
- [Examples](#examples)
  - [Simple LAD Table](#simple-lad-table)
  - [Simple Telemetry Table (WIP)](#simple-telemetry-table-wip)

## Setup

1. Ensure [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) is installed.
2. Open a terminal at the project root and run `nvm install` to install the node version specified in `.nvmrc`.
3. Use `nvm use` to switch to the correct node version.
4. Install dependencies with `npm install`.
5. Start the development server with `npm start`.
6. To build for production, run `npm run build`.

## Examples

### Simple LAD Table

A simplified version of a LAD Table that displays the latest value for a given parameter. Demonstrates how to use `TelemetryCollection` for data subscription and `CompositionCollection` for parameter management in a table.

### Simple Telemetry Table (WIP)

A work-in-progress example showing how to use `TelemetryCollection` for requesting historical data and subscribing to the latest parameter values.

