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
    label: "Notifications",
    route: "/notifications",
  },
];

export const medicalRecordFormDefaultValues = {
  title: '',
  condition: '',
  treatment: '',
  imageUrl: '',
  recordDateTime: new Date(),
}