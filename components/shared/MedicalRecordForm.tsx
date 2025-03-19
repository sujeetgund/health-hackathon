"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileUploader } from "./FileUploader";

import { medicalRecordFormDefaultValues } from "@/constants";
import type { IMedicalHistory } from "@/lib/database/models/medical-history.model";
import { medicalHistoryFormSchema } from "@/lib/validator";
import { useUploadThing } from "@/lib/uploadthing";
import {
  createMedicalRecord,
  updateMedicalRecord,
} from "@/lib/actions/medical-history.actions";

type MedicalRecordFormProps = {
  clerkId: string;
  type: "Create" | "Update";
  medicalRecord?: IMedicalHistory;
  mhid?: string;
};

const MedicalRecordForm = ({
  clerkId,
  type,
  medicalRecord,
  mhid,
}: MedicalRecordFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const initialValues =
    medicalRecord && type === "Update"
      ? { ...medicalRecord }
      : medicalRecordFormDefaultValues;

  const form = useForm<z.infer<typeof medicalHistoryFormSchema>>({
    resolver: zodResolver(medicalHistoryFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof medicalHistoryFormSchema>) {
    const uploadedImagesUrl: string[] = [];

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        alert("Failed to upload attachment");
        return;
      }
      uploadedImages.forEach((image) => {
        uploadedImagesUrl.push(image.ufsUrl);
      });
    }

    try {
      if (type === "Create") {
        const newRecord = await createMedicalRecord({
          record: { ...values, files: uploadedImagesUrl },
          clerkId,
        });
        if (newRecord) {
          router.push(`/medical-history/${newRecord._id}`);
          form.reset();
        }
      } else if (type === "Update" && mhid) {
        const modifiedRecord = await updateMedicalRecord({
          clerkId,
          record: { ...values, files: uploadedImagesUrl },
          mhid,
        });
        if (modifiedRecord) {
          router.push(`/medical-history/${modifiedRecord.mhid}`);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addDays(arg0: Date, arg1: number): Date | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {type} Medical Record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Record title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recordDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Date</FormLabel>
                    <FormControl>
                      <div className="flex items-center w-full overflow-hidden rounded-md border border-input px-3">
                        <Image
                          src="/assets/icons/calendar.svg"
                          alt="calendar"
                          width={24}
                          height={24}
                          className="mr-2 opacity-80"
                        />
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                          maxDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          className="w-full h-full py-[5px]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Condition suffered by patient"
                        className="h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="treatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Treatment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Treatment given to patient"
                        className="h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes"
                        className="h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Upload Files (Optional and max upto 3 files)
                  </FormLabel>
                  <FormControl>
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : `${type} Record`}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordForm;
