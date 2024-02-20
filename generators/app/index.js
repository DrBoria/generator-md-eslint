"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const fs = require("fs");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.framework = opts.framework;
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red("md-eslint")} generator!`));

    this.answers = await this.prompt([
      {
        type: "confirm",
        name: "isDefaultConfig",
        message: "Do you want to use default config?",
        default: true
      },
      {
        type: "checkbox",
        name: "lintOptions",
        message: "Select rules for your project:",
        choices: [
          {
            name: "Strict naming convention",
            value: "strictNames",
            checked: true
          },
          {
            name: "Imports order",
            value: "importsOrder",
            checked: true
          }
        ],
        when(answers) {
          return !answers.isDefaultConfig;
        }
      }
    ]).then(props => {
      const hasLintOption = feat => props.lintOptions.indexOf(feat) !== -1;

      return {
        strictNames: props.isDefaultConfig || hasLintOption("strictNames"),
        importsOrder: props.isDefaultConfig || hasLintOption("importsOrder")
      };
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(".eslintrc.js"),
      this.destinationPath(".eslintrc.js"),
      { answers: this.answers }
    );

    // Merge Package Json
    const templateJSON = this.fs.readJSON(this.templatePath("package.json"));
    const usersJSON = this.fs.readJSON(this.destinationPath("package.json"));
    const newPackageJsonContent = _.merge(usersJSON, templateJSON);
    fs.writeFileSync(
      this.destinationPath("package.json"),
      JSON.stringify(newPackageJsonContent, null, 4)
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      yarn: true,
      callback: function() {
        console.log("Everything is ready!");
        console.log("Thanks for using MD tools");
      }
    });
  }
};
