import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import * as BiIcons from "react-icons/bi";
import { IconType } from "react-icons";

const iconLibraries: Record<string, IconType> = {
  ...RiIcons,
  ...FaIcons,
  ...AiIcons,
  ...SiIcons,
  ...BiIcons,
};

export const getIcon = (iconName: string): IconType => {
  return iconLibraries[iconName] || RiIcons.RiQuestionLine; // Default fallback icon
};
