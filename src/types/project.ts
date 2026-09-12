type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  demos?: { label: string; url: string }[];
  aiImage?: boolean;
};

export default Project;
