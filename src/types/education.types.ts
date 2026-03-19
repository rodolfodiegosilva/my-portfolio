export interface Course {
  name: string;
  provider: string;
  issued: string;
  credentialUrl: string;
  skills: string[];
}

export interface CertTechnology {
  name: string;
  courses: Course[];
}

export interface Degree {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Certifications {
  title: string;
  technologies: CertTechnology[];
}

export interface Education {
  title: string;
  view_details: string;
  close: string;
  degrees: Degree[];
  certifications: Certifications;
}
