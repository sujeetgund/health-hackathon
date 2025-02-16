import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getMedicalRecord } from "@/lib/actions/medical-history.actions"
import type { IMedicalHistory } from "@/lib/database/models/medical-history.model"

export default async function Page({
  params,
}: {
  params: Promise<{ mhid: string }>
}) {
  const mhid = (await params).mhid
  const record: IMedicalHistory = await getMedicalRecord(mhid)

  return (
    <div className="container mx-auto py-8">
      <Link href="/medical-history">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Medical History
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl">{record.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoSection title="Condition" content={record.condition} />
            <InfoSection title="Treatment" content={record.treatment} />
            <InfoSection title="Date" content={new Date(record.recordDate).toLocaleDateString()} />
            <InfoSection title="Notes" content={record.notes || "No notes available"} />
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="mb-4 text-lg font-semibold">Files</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {record.files?.map((file) => (
                <FileCard key={file} file={file} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-base">{content}</p>
    </div>
  )
}

function FileCard({ file }: { file: string }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={file || "/placeholder.svg"} alt="Medical file" className="h-32 w-full object-cover" />
      <div className="p-2">
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          View File
        </a>
      </div>
    </div>
  )
}

