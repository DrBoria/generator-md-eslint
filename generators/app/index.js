"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the ${chalk.red(
          "md-eslint"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "checkbox",
        name: "lintOptions",
        message: "Select Rule Groups:",
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
        ]
      }
    ];

    this.answers = await this.prompt(prompts).then(props => {
      const hasLintOption = (feat) => props.lintOptions.indexOf(feat) !== -1;

      return {
        strictNames: hasLintOption('strictNames'),
        importsOrder: hasLintOption('importsOrder'),
      }
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(".eslintrc.js"),
      this.destinationPath(".eslintrc.js"),
      {answers: this.answers}
    );

  }

  install() {
    this.installDependencies();
  }
};
