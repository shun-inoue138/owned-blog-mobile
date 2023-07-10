import { Theme } from "native-base";

declare module "native-base" {
  interface ITheme extends Theme {
    colors: {
      main: string;
      base: string;
      accent: string;
      main_text: string;
      sub_text: string;
      base_text: string;
      success: string;
      info: string;
      alert: string;
    };
  }
}
