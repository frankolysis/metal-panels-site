export type QuoteStatus = "NEW" | "REVIEWED" | "REPLIED" | "CLOSED";
export type ContactStatus = "NEW" | "READ" | "REPLIED" | "CLOSED";
export type ProjectType =
  | "COMMERCIAL"
  | "HOSPITALITY"
  | "RESIDENTIAL"
  | "RETAIL"
  | "PUBLIC_SPACES"
  | "HEALTHCARE"
  | "EDUCATION"
  | "MIXED_USE";

export interface FilterState {
  [key: string]: string | string[] | undefined;
}
