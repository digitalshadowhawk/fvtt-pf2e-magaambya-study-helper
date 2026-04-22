import { BranchData } from "../data/actor-data";
import { Branches, Skills } from "../data/branches";
import { MAGAAMBYA_ID, MAGAAMBYA_FLAGS, MAGAAMBYA_TEMPLATES } from "./constants";

type BranchOverviewData = {
  branches: Branches[];
  actor: Actor;
  magaambyaData: BranchData;
};

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class BranchOverviewForm extends HandlebarsApplicationMixin(ApplicationV2) {
  actor: Actor;
  magaambyaData: BranchData;
  constructor(actor: Actor) {
    super();
    this.actor = actor;
    // @ts-ignore
    this.magaambyaData = actor.getFlag(
      MAGAAMBYA_ID,
      MAGAAMBYA_FLAGS.BRANCHDATA
    );
    if (!this.magaambyaData) {
      // @ts-ignore
      actor.setFlag(
        MAGAAMBYA_ID,
        MAGAAMBYA_FLAGS.BRANCHDATA,
        {
          firstBranch: Branches.CascadeBearers,
          firstBranchLevel: 0,
          firstBranchStars: 0,
          secondBranch: Branches.EmeraldBoughs,
          secondBranchLevel: 0,
          secondBranchStars: 0,
        } as any
      );
      // @ts-ignore
      this.magaambyaData = actor.getFlag(
        MAGAAMBYA_ID,
        MAGAAMBYA_FLAGS.BRANCHDATA
      );
    }
  }

  static DEFAULT_OPTIONS = {
      id: "branch-overview",
      classes: ["form"],
      tag: "form",
      window: {
        title: "Branch Overview"
      },
      position: { width: 400 },
      form: {
        handler: BranchOverviewForm.#onSubmitForm,
        closeOnSubmit: true,
      }
  }

  static PARTS = {
    form: {
      template: MAGAAMBYA_TEMPLATES.branchOverview,
    }
  }

  async _prepareContext(options: any) {
    const context = await super._prepareContext(options)
    return {
      ...context,
      branches: [
        Branches.CascadeBearers,
        Branches.EmeraldBoughs,
        Branches.RainScribes,
        Branches.TempestSunMages,
        Branches.Uzunjati,
      ],
      actor: this.actor,
      magaambyaData: this.magaambyaData,
    };
  }

  get template(): string {
    return MAGAAMBYA_TEMPLATES.branchOverview;
  }

  static async #onSubmitForm(this: BranchOverviewForm, _event: Event, _form: HTMLFormElement, formData: FormDataExtended): Promise<void> {
    const d = formData.object;
    const updatedFlag: BranchData = {
      firstBranch: d.firstBranch as Branches,
      firstBranchLevel: d.firstBranchLevel as number,
      // firstBranchLore: formData.firstBranchLore,
      firstBranchStars: 0,
      secondBranch: d.secondBranch as Branches,
      secondBranchLevel: d.secondBranchLevel as number,
      // secondBranchLore: formData.secondBranchLore,
      secondBranchStars: 0,
    };
    await this.actor.setFlag(
      MAGAAMBYA_ID,
      MAGAAMBYA_FLAGS.BRANCHDATA,
      updatedFlag as any
    );
  }

}
