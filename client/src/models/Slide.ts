import { Dictionary } from "./Dictionary";
import { IImage } from "./IImage";

export type Slide = {
  title?: Dictionary;
  subtitle?: Dictionary;
  link?: string; 
  image: IImage 
};
