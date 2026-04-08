import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

interface Job {
  id: string
  title: string
  description?: string
}

interface JobsProps {
  jobs?: Job[]
  contactEmail?: string
}

export default async function Jobs({ jobs = [], contactEmail = 'hello@netherlandsbagels.com' }: JobsProps) {
  const t = await getTranslations('jobs')
  const hasOpenJobs = jobs.length > 0

  return (
    <section id="jobs" className="bg-[#9b5026] py-[120px]">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex flex-col gap-12">
          {/* Top row: text + button */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-7 items-start lg:items-center">
            <div className="flex flex-col gap-4 flex-1">
              <h2
                className="font-['Anton',sans-serif] text-[#eee6d9] uppercase"
                style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: '64px' }}
              >
                {t('heading')}
              </h2>
              <p className="font-['Inter',sans-serif] text-[#eee6d9] text-[20px] leading-[30px] max-w-[646px]">
                {t('subtitle')}
              </p>
            </div>
            <a
              href={`mailto:${contactEmail}?subject=${encodeURIComponent(t('openApplicationSubject'))}`}
              className="inline-flex items-center justify-center bg-white text-[#1e170e] px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#eee6d9] transition-colors shrink-0 lg:w-[372px]"
            >
              {hasOpenJobs ? t('openApplication') : t('sendCV')}
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
                  {job.description && (
                    <p className="font-['Inter',sans-serif] text-[#eee6d9]/80 text-[16px]">
                      {job.description}
                    </p>
                  )}
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(t('applicationSubject') + job.title)}`}
                    className="inline-block mt-4 text-white font-['Inter',sans-serif] text-[16px] font-medium underline hover:no-underline transition-all"
                  >
                    {t('applyNow')}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Team photo strip */}
          <div className="flex gap-6">
            <div className="rounded-[20px] overflow-hidden shrink-0 h-[333px] w-[286px] relative">
              <Image src="/images/jobs-1.png" alt="" fill className="object-cover" sizes="286px" />
            </div>
            <div className="rounded-[20px] overflow-hidden shrink-0 h-[333px] w-[285px] relative">
              <Image src="/images/jobs-2.png" alt="" fill className="object-cover" sizes="285px" />
            </div>
            <div className="rounded-[20px] overflow-hidden flex-1 h-[333px] relative">
              <Image src="/images/menu-highlight-2.png" alt="" fill className="object-cover" sizes="(max-width: 1672px) 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
