export interface iNavData {
  path?: string;
  label?: string;
  icon?: string;
}

export interface iFilter {
  name?: string;
  data?: string[];
  search?: string;
}

export interface iFooter {
  navs?: string[];
  label?: string;
}
