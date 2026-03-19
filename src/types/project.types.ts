export interface HostingInfo {
  description: string;
  url: string;
}

export interface TestDetails {
  type: string;
  libraries_tools: string[];
  how_to_execute: string;
  report_details: string;
  report_link: string | null;
}

export interface AppDetails {
  deployment: string;
  technologies: string[];
  hosting: HostingInfo;
  tests: TestDetails | null;
  tests_aux?: TestDetails[];
}

export interface Project {
  project: string;
  image: string;
  name: string;
  description: string;
  technologies: string[];
  frontend: string;
  backend: string;
  link: string;
  images: string[];
  app_details: AppDetails;
  api_details: AppDetails;
}
