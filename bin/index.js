#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const node_child_process_1 = require("node:child_process");
// entry point to cli
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const program = new commander_1.Command();
        // define program options
        program
            .option('-c, --coverage <coverage>', 'The percentage of code coverage to mandate', '80')
            .option('--no-branch', 'Exclude branch coverage')
            .option('--no-statement', 'Exclude statement coverage')
            .option('--no-function', 'Exclude function coverage')
            .option('--no-line', 'Exclude line coverage')
            .parse();
        // collect options from user
        const { coverage, branch, statement, line } = program.opts();
        // check for jest
        try {
            const stdout = yield (0, node_child_process_1.execSync)('jest --version');
        }
        catch (e) {
            console.log('Global installation of Jest not found');
            console.log('See more here: https://jestjs.io/docs/getting-started#running-from-command-line');
            return;
        }
        // grab changed files from git status
        try {
            const stdout = yield (0, node_child_process_1.execSync)('git status --porcelain');
            const output = stdout.toString();
            const changedFiles = output.split('\n').filter((str) => str != '');
            const tokenized = changedFiles.map((str) => str.split(' ').filter((str) => str != ''));
            const modified = tokenized
                .filter((arr) => arr[0] === 'M')
                .map((arr) => arr[1]);
            console.log(modified);
        }
        catch (e) {
            console.log(e);
        }
    });
}
run();
