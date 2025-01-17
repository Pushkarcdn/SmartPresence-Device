/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SelectProps } from "antd";

type LabelRender = SelectProps["labelRender"];

export const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return label;
  }
  return <span className="opacity-70 text-gray-400">-- Select --</span>;
};

export const timingOptions = [
  {
    label: "Part time",
    value: "partTime",
  },
  {
    label: "Full time",
    value: "fullTime",
  },
  {
    label: "Contract",
    value: "contract",
  },
];

export const levelOptions = [
  {
    label: "Senior level",
    value: "senior",
  },
  {
    label: "Mid level",
    value: "mid",
  },
  {
    label: "Entry level",
    value: "entry",
  },
  {
    label: "Internship",
    value: "internship",
  },
];

export const locationTypeOptions = [
  { label: "Remote", value: "remote" },
  { label: "Onsite", value: "onsite" },
  { label: "Hybrid", value: "hybrid" },
];

export const salaryOptions = [
  "Rs 20,000 - Rs 50,000",
  "Rs 50,000 - Rs 100,000",
  "Rs 100,000 - Rs 150,000",
  "Rs 150,000 - Rs 200,000",
  "Above Rs 200,000",
];

export const pastExperienceOptions = [
  "Less than 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "5 to 10 years",
  "Above 10 years",
];

export const urgencyOption = [
  { label: "Urgent", value: "urgent" },
  { label: "ASAP", value: "asap" },
  { label: "Flexible", value: "flexible" },
];

export const sourceOptions = [
  "Facebook",
  "Google",
  "Website",
  "Linkedin",
  "Organizations",
  "Friends",
  "Others",
];
