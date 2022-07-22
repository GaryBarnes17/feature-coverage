#!/usr/bin/env node
import { Command } from 'commander';
import util from 'node:util';
import { execSync } from 'node:child_process';

// entry point to cli
async function run() {
  const program = new Command();

  // define program options
  program
    .option(
      '-c, --coverage <coverage>',
      'The percentage of code coverage to mandate',
      '80',
    )
    .option('--no-branch', 'Exclude branch coverage')
    .option('--no-statement', 'Exclude statement coverage')
    .option('--no-function', 'Exclude function coverage')
    .option('--no-line', 'Exclude line coverage')
    .parse();

  // collect options from user
  const { coverage, branch, statement, line } = program.opts();

  // check for jest
  try {
    const stdout = await execSync('jest --version');
  } catch (e) {
    console.log('Global installation of Jest not found');
    console.log(
      'See more here: https://jestjs.io/docs/getting-started#running-from-command-line',
    );
    return;
  }
}

run();
