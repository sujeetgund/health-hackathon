"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormDescription,
  FormField,
  FormItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { medicalRecordFormDefaultValues } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IMedicalHistory } from "@/lib/database/models/medical-history.model";
import { medicalHistoryFormSchema } from "@/lib/validator";
import { useUploadThing } from "@/lib/uploadthing";
import {
  createMedicalRecord,
  updateMedicalRecord,
} from "@/lib/actions/medical-history.actions";

type MedicalRecordFormProps = {
  userId: string;
  type: "Create" | "Update";
  medicalRecord?: IMedicalHistory;
  mhid?: string;
};

const MedicalRecordForm = ({
  userId,
  type,
  medicalRecord,
  mhid,
}: MedicalRecordFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    medicalRecord && type === "Update"
      ? {
          ...medicalRecord,
        }
      : medicalRecordFormDefaultValues;

  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof medicalHistoryFormSchema>>({
    resolver: zodResolver(medicalHistoryFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof medicalHistoryFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        alert("Failed to upload image");
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newRecord = await createMedicalRecord({
          record: { ...values, files: [uploadedImageUrl] },
          userId,
          // path: "/profile",
        });

        if (newRecord) {
          form.reset();
          router.push(`/medical-history/${newRecord._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!mhid) {
        router.back();
        return;
      }

      try {
        const modifiedRecord = await updateMedicalRecord({
          userId,
          record: { ...values, files: [uploadedImageUrl] },
          mhid,
          // path: `/medical-history/${mhid}`,
        });

        if (modifiedRecord) {
          form.reset();
          router.push(`/medical-history/${modifiedRecord.mhid}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Record Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Record title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Record Date */}
          <FormField
            control={form.control}
            name="recordDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center w-full overflow-hidden rounded-full bg-grey-50 px-4">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    {/* <p className="ml-3 whitespace-nowrap text-grey-600">
                      Record Date:
                    </p> */}
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      // showTimeSelect={true}
                      // timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          {/* Condition */}
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Condition suffered by patient"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Treatment */}
          <FormField
            control={form.control}
            name="treatment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Treatment given to patient"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
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
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Record `}
        </Button>
      </form>
    </Form>
  );
};

export default MedicalRecordForm;
