import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface Job {
  id: string
  title: string
}

interface JobsProps {
  jobs?: Job[]
  contactEmail?: string
  content?: {
    heading?: string | null
    subtitle?: string | null
    applyNowLabel?: string | null
    openApplicationLabel?: string | null
    sendCVLabel?: string | null
    applicationSubjectPrefix?: string | null
    openApplicationSubject?: string | null
  } | null
}

export default async function Jobs({
  jobs = [],
  contactEmail = 'hello@netherlandsbagels.com',
  content,
}: JobsProps) {
  const t = await getTranslations('jobs')
  const hasOpenJobs = jobs.length > 0
  const text = {
    heading: content?.heading?.trim() || t('heading'),
    subtitle: content?.subtitle?.trim() || t('subtitle'),
    viewDetails: t('viewDetails'),
    openApplication: content?.openApplicationLabel?.trim() || t('openApplication'),
    sendCV: content?.sendCVLabel?.trim() || t('sendCV'),
    openApplicationSubject: content?.openApplicationSubject?.trim() || t('openApplicationSubject'),
  }

  return (
    <section id="jobs" className="bg-[#9b5026] py-12 sm:py-20 lg:py-[120px]">
      <div className="max-w-[1672px] mx-auto px-3 sm:px-4 md:px-8 lg:px-[228px]">
        <div className="flex flex-col gap-12">
          {/* Top row: text + button */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-7 items-start lg:items-center">
            <div className="flex flex-col gap-4 flex-1">
              <h2
                className="font-['Anton',sans-serif] text-[#eee6d9] uppercase"
                style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: '64px' }}
              >
                {text.heading}
              </h2>
              <p className="font-['Inter',sans-serif] text-[#eee6d9] text-[20px] leading-[30px] max-w-[646px]">
                {text.subtitle}
              </p>
            </div>
            <a
              href={`mailto:${contactEmail}?subject=${encodeURIComponent(text.openApplicationSubject)}`}
              className="inline-flex items-center justify-center bg-white text-[#1e170e] px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#eee6d9] transition-colors shrink-0 lg:w-[372px]"
            >
              {hasOpenJobs ? text.openApplication : text.sendCV}
            </a>
          </div>

          {/* Open positions */}
          {hasOpenJobs && (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-[#eee6d9]/10 border border-[#eee6d9]/20 rounded-[16px] p-6">
                  <h3 className="font-['Anton',sans-serif] text-[24px] text-[#eee6d9] mb-2">
                    {job.title}
                  </h3>
                  <Link
                    href={`/jobs/${encodeURIComponent(job.id)}`}
                    className="inline-block mt-4 text-white font-['Inter',sans-serif] text-[16px] font-medium underline hover:no-underline transition-all"
                  >
                    {text.viewDetails}
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Team photo strip */}
          <div className="flex gap-6 overflow-x-auto pb-2 lg:overflow-x-visible lg:pb-0">
            <div className="rounded-[20px] overflow-hidden shrink-0 h-[333px] w-[260px] lg:w-[286px] relative">
              <Image src="/images/jobs-1.png" alt="" fill className="object-cover" sizes="286px" />
            </div>
            <div className="rounded-[20px] overflow-hidden shrink-0 h-[333px] w-[260px] lg:w-[285px] relative">
              <Image src="/images/jobs-2.png" alt="" fill className="object-cover" sizes="285px" />
            </div>
            <div className="rounded-[20px] overflow-hidden shrink-0 h-[333px] w-[260px] lg:w-auto lg:flex-1 relative">
              <Image src="/images/menu-highlight-2.png" alt="" fill className="object-cover" sizes="(max-width: 1024px) 260px, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
