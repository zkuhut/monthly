declare type SideBarItem =
  | SideBarLink
  | SideBarGroup;

declare interface SideBarLink {
  text: string;
  link: string;
}

declare interface SideBarGroup {
  text: string;
  link?: string;
  // default: false
  // collapsable?: boolean;
  children: SideBarItem[];
}

declare interface TOC {
  [path: string]: SideBarItem[];
}
