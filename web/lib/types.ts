export type SettingType =
  | "checkbox" | "number" | "radio" | "range" | "select" | "text" | "textarea"
  | "color" | "color_background" | "color_scheme" | "color_scheme_group"
  | "font_picker" | "image_picker" | "richtext" | "inline_richtext" | "html" | "liquid"
  | "url" | "link_list" | "collection" | "collection_list" | "product" | "product_list"
  | "video" | "video_url" | "text_alignment" | "header" | "paragraph";

export interface SettingDef {
  type: SettingType;
  id?: string;
  label?: string;
  default?: unknown;
  info?: string;
  content?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface BlockSchema {
  type: string;
  name?: string;
  limit?: number;
  settings?: SettingDef[];
}

export interface SectionSchema {
  name: string;
  tag?: string;
  class?: string;
  settings?: SettingDef[];
  blocks?: BlockSchema[];
  max_blocks?: number;
  limit?: number;
  presets?: { name: string; blocks?: { type: string }[] }[];
  enabled_on?: { templates?: string[]; groups?: string[] };
  disabled_on?: { templates?: string[]; groups?: string[] };
}

export type SettingsValues = Record<string, unknown>;

export interface BlockInstance {
  type: string;
  settings?: SettingsValues;
  disabled?: boolean;
}

export interface SectionInstance {
  type: string;
  settings?: SettingsValues;
  blocks?: Record<string, BlockInstance>;
  block_order?: string[];
  disabled?: boolean;
}

export interface Template {
  sections: Record<string, SectionInstance>;
  order: string[];
  layout?: string;
  name?: string;
}

export interface SectionGroup {
  type: string;
  name: string;
  sections: Record<string, SectionInstance>;
  order: string[];
}

export interface ResolvedBlock {
  id: string;
  type: string;
  settings: SettingsValues;
}

export interface ResolvedSection {
  id: string;
  type: string;
  settings: SettingsValues;
  blocks: ResolvedBlock[];
}
