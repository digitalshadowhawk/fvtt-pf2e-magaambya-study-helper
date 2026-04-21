import { levelingDialog } from "./LevelingDialog";
import { BranchOverviewForm } from "./BranchOverviewForm";
import { MAGAAMBYA_ID, MAGAAMBYA_FLAGS } from "./constants";

declare const game: Game;

export class MagaambyaStudyHelper {

  static SETTINGS = {};

  static log(force :any, ...args :any) {
    const shouldLog =
      force ||
      //      @ts-ignore
      game.modules.get("_dev-mode")?.api?.getPackageDebugValue(this.ID);

    if (shouldLog) {
      console.log(MAGAAMBYA_ID, "|", ...args);
    }
  }

  static initialize() {
    Hooks.on("renderCharacterSheetPF2e" as any, (app: any, html: any) => {
  const actor = app.object;

  // handle both jQuery and plain HTMLElement
  const element: HTMLElement = html instanceof HTMLElement ? html : html[0];

  const header = element.querySelector(".window-header .window-title");
  if (!header) return;

  const button = document.createElement("a");
  button.className = "popout";
  button.innerHTML = `<i class="fas fa-book"></i>Magaambya Helper`;
  button.addEventListener("click", () => {
    new BranchOverviewForm(actor).render({ force: true });
  });

  header.after(button);
});

    Hooks.on("renderBranchOverviewForm" as any, (app: any, html: HTMLElement) => {
      const actor = app.actor;
      const { firstBranchLevel, secondBranchLevel, firstBranch, secondBranch } =
        actor.getFlag(MAGAAMBYA_ID, MAGAAMBYA_FLAGS.BRANCHDATA);

      const button = html.querySelector<HTMLButtonElement>("#firstBranchButton");
      button?.addEventListener("click", () => {
        levelingDialog(firstBranch, firstBranchLevel, actor);
      });

      const secondButton = html.querySelector<HTMLButtonElement>("#secondBranchButton");
      secondButton?.addEventListener("click", () => {
        levelingDialog(secondBranch, secondBranchLevel, actor);
      });
    });
  }
}
