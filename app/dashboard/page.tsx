import { auth } from "@clerk/nextjs/server";
import { getRecentMedicalRecords } from "@/lib/actions/medical-history.actions";
import { IMedicalHistory } from "@/lib/database/models/medical-history.model";
import QuickActionCardSection from "@/components/shared/QuickActionCard";
import RecentMedicalRecords from "@/components/shared/RecentMedicalRecords";
import { getHealthOverview } from "@/lib/actions/user.actions";
import HealthOverviewCard from "@/components/shared/HealthOverviewCard";
import { Suspense } from "react";

type IHealthOverview = {
  bloodPressure?: string;
  heartRate?: string;
  sugarLevel?: string;
  medicationAdherence?: string;
};

export default async function Dashboard() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const recentRecords: IMedicalHistory[] = await getRecentMedicalRecords(
    userId
  );

  const healthOverview: IHealthOverview = await getHealthOverview(userId);
  //   console.log(healthOverview);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto py-8 px-6">
        {/* Quick Card Section */}
        <QuickActionCardSection />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Recent Medical Records Card */}
          <Suspense fallback={<div>Loading...</div>}>
            <RecentMedicalRecords recentRecords={recentRecords} />
          </Suspense>

          {/* Health Overview Card */}
          <Suspense fallback={<div>Loading...</div>}>
            <HealthOverviewCard
              healthOverview={healthOverview}
              clerkId={userId}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
