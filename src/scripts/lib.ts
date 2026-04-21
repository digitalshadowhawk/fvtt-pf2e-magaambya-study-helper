import { MagaambyaStudyHelper } from "./MagaambyaStudyHelper";
import { levelingDialog } from "./LevelingDialog";

MagaambyaStudyHelper.initialize();

Handlebars.registerHelper("ifEquals", function (this: any, arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifNotEquals", function (this: any, arg1, arg2, options) {
  return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});
