import type { ComponentType } from "react";
import type { ResolvedSection } from "./types";

export interface SectionProps {
  section: ResolvedSection;
}

export type SectionComponent = ComponentType<SectionProps>;

const registry = new Map<string, SectionComponent>();

export function registerSection(type: string, component: SectionComponent): void {
  registry.set(type, component);
}

export function getSection(type: string): SectionComponent | undefined {
  return registry.get(type);
}

export function hasSection(type: string): boolean {
  return registry.has(type);
}

export function registeredTypes(): string[] {
  return [...registry.keys()];
}
