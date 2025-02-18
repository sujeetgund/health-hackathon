"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Pill, Droplet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addOrUpdateHealthOverview } from "@/lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";

type IHealthOverview = {
  bloodPressure?: string;
  heartRate?: string;
  sugarLevel?: string;
  medicationAdherence?: string;
};

const HealthOverviewCard = ({
  healthOverview,
  clerkId,
}: {
  healthOverview: IHealthOverview;
  clerkId: string;
}) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      bloodPressure: formData.get("bloodPressure") as string,
      heartRate: formData.get("heartRate") as string,
      sugarLevel: formData.get("sugarLevel") as string,
      medicationAdherence: formData.get("medicationAdherence") as string,
    };
    try {
      await addOrUpdateHealthOverview(clerkId, data);
      toast({
        title: "Success",
        description: "Health Overview updated successfully",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update Health Overview",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Health Overview{" "}
          <span className="text-sm font-normal text-muted-foreground">
            (From last checkup)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthMetric
            icon={<Activity className="h-6 w-6 text-blue-500" />}
            label="Blood Pressure"
            value={healthOverview?.bloodPressure || "No Data"}
            unit="mmHg"
          />
          <HealthMetric
            icon={<Droplet className="h-6 w-6 text-blue-500" />}
            label="Sugar Level"
            value={healthOverview?.sugarLevel || "No Data"}
            unit="mg/dL"
          />
          <HealthMetric
            icon={<Heart className="h-6 w-6 text-red-500" />}
            label="Heart Rate"
            value={healthOverview?.heartRate || "No Data"}
            unit="BPM"
          />
          <HealthMetric
            icon={<Pill className="h-6 w-6 text-green-500" />}
            label="Medication Adherence"
            value={healthOverview?.medicationAdherence || "No Data"}
            unit="%"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-4">
              Edit Health Overview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Edit Health Overview</DialogTitle>
              <DialogDescription>
                Update your health metrics here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bloodPressure" className="text-right">
                    BP
                  </Label>
                  <Input
                    id="bloodPressure"
                    name="bloodPressure"
                    placeholder="e.g. 120/80"
                    defaultValue={healthOverview?.bloodPressure || ""}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sugarLevel" className="text-right">
                    Sugar
                  </Label>
                  <Input
                    id="sugarLevel"
                    name="sugarLevel"
                    placeholder="e.g. 100"
                    defaultValue={healthOverview?.sugarLevel || ""}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="heartRate" className="text-right">
                    Heart Rate
                  </Label>
                  <Input
                    id="heartRate"
                    name="heartRate"
                    placeholder="e.g. 72"
                    defaultValue={healthOverview?.heartRate || ""}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medicationAdherence" className="text-right">
                    Med. Adherence
                  </Label>
                  <Input
                    id="medicationAdherence"
                    name="medicationAdherence"
                    placeholder="e.g. 95"
                    defaultValue={healthOverview?.medicationAdherence || ""}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

function HealthMetric({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
      <div className="bg-background rounded-full p-2">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">
          {value}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
}

export default HealthOverviewCard;
