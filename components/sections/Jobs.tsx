interface Job {
  id: string
  title: string
  description?: string
}

interface JobsProps {
  jobs?: Job[]
  contactEmail?: string
}

export default function Jobs({ jobs = [], contactEmail = 'hello@netherlandsbagels.com' }: JobsProps) {
  const hasOpenJobs = jobs.length > 0

  return (
    <section id="jobs" className="bg-white py-20 lg:py-24">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="text-center max-w-[832px] mx-auto">
          <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[48px] leading-[57.6px] text-black mb-6">
            Join Our Team
          </h2>
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-base lg:text-[18px] leading-[30.6px] mb-10">
            We&apos;re always looking for passionate people who love food and hospitality.
            If you want to be part of our team, we&apos;d love to hear from you.
          </p>

          {hasOpenJobs ? (
            <div className="flex flex-col gap-4 mb-10 text-left">
              {jobs.map((job) => (
                <div key={job.id} className="border border-stone-200 p-6">
                  <h3 className="font-['Outfit',sans-serif] font-semibold text-xl text-black mb-2">
                    {job.title}
                  </h3>
                  {job.description && (
                    <p className="font-['Inter',sans-serif] text-[#4a5565] text-base">
                      {job.description}
                    </p>
                  )}
                  <a
                    href={`mailto:${contactEmail}?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="inline-block mt-4 text-[#3a7d44] font-['Inter',sans-serif] text-sm font-medium hover:underline"
                  >
                    Apply now →
                  </a>
                </div>
              ))}
            </div>
          ) : null}

          <a
            href={`mailto:${contactEmail}?subject=Open Application`}
            className="inline-block bg-black text-white px-10 py-4 text-base font-['Inter',sans-serif] hover:bg-stone-800 transition-colors"
          >
            {hasOpenJobs ? 'Send open application' : 'Send us your CV'}
          </a>
        </div>
      </div>
    </section>
  )
}
