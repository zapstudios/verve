import chalk from "chalk";
import { Command } from "commander";
import inquirer, { Question } from "inquirer";

interface CLIOptions {
  withLenis?: boolean;
  withRouteTransition?: boolean;
}

interface PromptAnswers {
  withLenis: boolean;
  withRouteTransition: boolean;
}

const program = new Command();

program
  .version("1.0.0")
  .description("Verve CLI | Scaffolding tool powered by zap.studio")
  .option("-l, --with-lenis [value]", "Include lenis scroll")
  .option("-t, --with-route-transition [value]", "Include route transitions");

function printWelcomeMessage() {
  console.clear();
  console.log(`${chalk.hex("#E11D48").bold("Verve CLI")} ${chalk.dim("| Scaffolding tool powered by zap.studio")}\n`);
}

async function promptForMissingOptions(options: CLIOptions): Promise<CLIOptions> {
  const questions: Question<PromptAnswers>[] = [];

  const defaultInquirerOptions = { prefix: chalk.hex("#E11D48").bold("-") + " " };

  if (options.withLenis === undefined) {
    const message = "Include lenis scroll?";

    await inquirer
      .prompt({
        type: "confirm",
        name: "withLenis",
        message,
        default: false,
        prefix: chalk.hex("#E11D48").bold("-") + " ",
      })
      .then((answers) => (options.withLenis = answers.withLenis));
  }

  if (options.withRouteTransition === undefined) {
    const message = "Include route transitions?";

    await inquirer
      .prompt({
        type: "confirm",
        name: "withRouteTransition",
        message,
        default: false,
      })
      .then((answers) => (options.withRouteTransition = answers.withRouteTransition));
  }

  const answers: Partial<PromptAnswers> = await inquirer.prompt(questions);
  return {
    ...options,
    ...answers,
  };
}

async function main() {
  program.parse(process.argv);
  let options: CLIOptions = program.opts();

  printWelcomeMessage();
  options = await promptForMissingOptions(options);
  console.log(options); // Use these options as needed in a typesafe manner
}

main().catch(console.error);
