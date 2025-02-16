import * as z from "zod";

export const medicalHistoryFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  condition: z
    .string()
    .min(3, "Condition must be at least 3 characters")
    .max(500, "Condition must be less than 400 characters"),
  treatment: z
    .string()
    .min(3, "Treatment must be at least 3 characters")
    .max(1000, "Treatment must be less than 400 characters"),
  imageUrl: z.string(),
  recordDate: z.date(),
});
