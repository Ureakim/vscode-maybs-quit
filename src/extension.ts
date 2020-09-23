import * as vscode from "vscode";

class Action implements vscode.QuickPickItem {
  label: string;
  command?: string;

  constructor(label: string, command?: string) {
    this.label = label;
    this.command = command;
  }
}

const choices = [
  new Action("Quit Application", "workbench.action.quit"),
  new Action("Close Folder", "workbench.action.closeFolder"),
  new Action("Cancel"),
];

const options = {
  placeHolder: "Quit application ?",
};

export function activate(context: vscode.ExtensionContext) {
  const trap = vscode.commands.registerCommand("maybsQuit.guard.quit", () => {
    vscode.window.showQuickPick(choices, options).then((choice) => {
      if (choice?.command) vscode.commands.executeCommand(choice?.command);
    });
  });

  context.subscriptions.push(trap);
}
