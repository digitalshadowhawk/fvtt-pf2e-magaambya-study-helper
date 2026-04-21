import { Branches, Skills } from "../data/branches";
import { dcByLevel } from "../utils/dcByLevel";
import { SKILL_DICTIONARY_REVERSE } from "../data/branches";
import { slugify } from "../utils/slugify";
declare const game: any;
declare const token: Token;
declare const actor: Actor;
// All actions here are pulled from "game.pf2e.actions"

const { DialogV2 } = foundry.applications.api;

export function levelingDialog(branch: Branches, currentLevel: number, actor: any) {
  const skill_list = [...Skills[branch] ?? []];
  if (branch == Branches.Uzunjati) {
    const lores: string[] = actor.items
      .filter((item: any) => item.type == "lore")
      .map((lore: any) => lore.name);
    skill_list.push(...lores);
  }
  const options = Object.entries(skill_list)
    .map(([arrayPos, displayName]) => [
      `<option value="${displayName}">${displayName}</option>`,
    ])
    .join();

  const content = `<form>
        <div class="form-group">
            <label>Skill:</label>
            <select name="skill-selector">${options}</select>
        </div>
    </form>`;
  const dc = dcByLevel.get(currentLevel);
  
  new DialogV2({
    window: { title: "Choose which skill to roll" },
    position: { width: 400 },
    content,
    buttons: [
  {
    action: "roll",
    label: "Roll selected skill",
    icon: "<span class='pf2-icon'>1</span>",
    default: true,
    callback: (_event: Event, button: HTMLButtonElement) => {
      const skill = (button.form!.elements.namedItem("skill-selector") as HTMLSelectElement).value;
      const slugSkill = slugify(skill);
      actor.skills[slugSkill].check.roll({
        dc: { value: dc, adjustments: [] },
      });
    },
  },
  {
    action: "cancel",
    label: "Cancel",
    icon: "<span class='pf2-icon'>R</span>",
  },
],
  }).render({ force: true });
}
