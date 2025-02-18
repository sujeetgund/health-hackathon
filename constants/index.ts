export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Medical History",
    route: "/medical-history",
  },
  {
    label: "Dashboard",
    route: "/dashboard",
  },
];

export const medicalRecordFormDefaultValues = {
  title: "",
  condition: "",
  treatment: "",
  imageUrl: "",
  recordDateTime: new Date(),
};
