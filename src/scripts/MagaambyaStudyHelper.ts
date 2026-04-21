import { levelingDialog } from "./LevelingDialog";
import { BranchOverviewForm } from "./BranchOverviewForm";
import { MAGAAMBYA_ID, MAGAAMBYA_FLAGS } from "./constants";
import { Branches } from "../data/branches";

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
    Hooks.on('getActorSheetHeaderButtons' as any, (sheet: any, buttons: any[]) => {
      buttons.unshift({
        label: 'Magaambya Helper',
        class: 'popout',
        icon: 'fas fa-book',
        onclick: async () => {
          new BranchOverviewForm(sheet.actor).render({ force: true });
        },
      });
      return buttons;
    });

    Hooks.on("renderBranchOverviewForm" as any, (app: BranchOverviewForm, html: any) => {
      const element: HTMLElement = html instanceof HTMLElement ? html : html[0];

      const button = element.querySelector<HTMLButtonElement>("#firstBranchButton");
      button?.addEventListener("click", () => {
        const branch = (element.querySelector<HTMLSelectElement>("[name=firstBranch]"))!.value as Branches;
        const level = Number((element.querySelector<HTMLInputElement>("[name=firstBranchLevel]"))!.value);
        levelingDialog(branch, level, app.actor);
      });

      const secondButton = element.querySelector<HTMLButtonElement>("#secondBranchButton");
      secondButton?.addEventListener("click", () => {
        const branch = (element.querySelector<HTMLSelectElement>("[name=secondBranch]"))!.value as Branches;
        const level = Number((element.querySelector<HTMLInputElement>("[name=secondBranchLevel]"))!.value);
        levelingDialog(branch, level, app.actor);
      });
    });
  }
}
