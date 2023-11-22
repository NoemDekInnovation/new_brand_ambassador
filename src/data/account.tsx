// export const personal_details_titles = [
//   { text: 'First Name', required: true },
//   { text: 'Last Name', required: true },
//   { text: 'Email Address', required: false },
//   { text: 'Phone Number', required: false },
//   { text: 'Job Role', required: true },
// ];

export const company_details_titles = [
  { text: "Name", required: true },
  { text: "Type", required: true },
  { text: "Company Email Address", required: true },
  { text: "Phone Number", required: true },
  { text: "Website", required: true },
  { text: "Address", required: true },
];

export const personal_details_titles = [
  { text: "First Name", required: true },
  { text: "Last Name", required: true },
  { text: "Email Address", required: false },
  { text: "Phone Number", required: false },
  { text: "Gender", required: true },
  { text: "Date of Birth", required: true },
  { text: "State of Origin", required: true },
  { text: "Ethnicity", required: true },
  { text: "Nationality", required: true },
  { text: "Skin Color", required: true },
  { text: "Address", required: true },
  { text: "Skills", required: true },
];

export const education_details_titles = {
  details: [
    {
      subHeader: "First Degree",
      list: [
        { text: "Institution", required: true },
        { text: "Degree", required: true },
        { text: "Grade", required: true },
        { text: "Graduation Year", required: true },
      ],
    },
    {
      subHeader: "Second Degree",
      list: [
        { text: "Institution", required: false },
        { text: "Degree", required: false },
        { text: "Grade", required: false },
        { text: "Graduation Year", required: false },
      ],
    },
  ],
  subDetails: true,
};

export const social_details_titles = [
  { text: "Instagram Handle", required: true },
  { text: "Linkedin Profile", required: true },
  { text: "Facebook Profile", required: false },
  { text: "Twitter Handle", required: false },
  { text: "Trends Profile", required: false },
];
