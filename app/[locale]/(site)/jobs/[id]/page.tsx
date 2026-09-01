import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import RichTextClient from '@/components/blocks/RichTextClient'
import { Link } from '@/i18n/navigation'
import { getHomepageContent, getOpenJobById, getSiteSettings } from '@/lib/payload'

export const revalidate = 60
export const dynamic = 'force-dynamic'

type JobPageParams = Promise<{ locale: string; id: string }>

export async function generateMetadata({
  params,
}: {
  params: JobPageParams
}): Promise<Metadata> {
  const { locale, id } = await params
  const t = await getTranslations({ locale, namespace: 'jobs' })
  const job = await getOpenJobById(id)

  if (!job) {
    return {}
  }

  return {
    title: `${job.title} | Netherlands Bagels`,
    description: t('detailMetadataDescription', { title: job.title }),
  }
}

export default async function JobPage({ params }: { params: JobPageParams }) {
  const { locale, id } = await params
  const payloadLocale = locale === 'nl' ? 'nl' : 'en'
  const t = await getTranslations({ locale, namespace: 'jobs' })

  const [job, settings, homepageContent] = await Promise.all([
    getOpenJobById(id),
    getSiteSettings(payloadLocale).catch(() => null),
    getHomepageContent(payloadLocale).catch(() => null),
  ])

  if (!job) {
    notFound()
  }

  const contactEmail = settings?.contactEmail ?? 'hello@netherlandsbagels.com'
  const applicationSubject =
    homepageContent?.jobs?.applicationSubjectPrefix?.trim() || t('applicationSubject')
  const applyNowLabel = homepageContent?.jobs?.applyNowLabel?.trim() || t('applyNow')

  return (
    <section className="bg-[#9b5026] py-12 sm:py-20 lg:py-24">
      <div className="max-w-[960px] mx-auto px-3 sm:px-4 md:px-8">
        <Link
          href="/#jobs"
          className="inline-block mb-6 font-['Inter',sans-serif] text-[#eee6d9] underline hover:no-underline"
        >
          {t('backToJobs')}
        </Link>

        <article className="bg-[#eee6d9] rounded-[20px] px-6 py-8 sm:p-10 lg:p-14">
          <p className="font-['Inter',sans-serif] text-sm font-semibold uppercase tracking-[0.16em] text-[#9b5026] mb-4">
            {t('detailEyebrow')}
          </p>
          <h1
            className="font-['Anton',sans-serif] uppercase text-[#1e170e] mb-8"
            style={{ fontSize: 'clamp(40px, 7vw, 68px)', lineHeight: 1.05 }}
          >
            {job.title}
          </h1>

          {job.description && (
            <RichTextClient data={job.description} className="rich-text" />
          )}

          <div className="border-t border-[#1e170e]/15 mt-10 pt-8">
            <a
              href={`mailto:${contactEmail}?subject=${encodeURIComponent(applicationSubject + job.title)}`}
              className="inline-flex items-center justify-center bg-[#1e170e] text-[#eee6d9] px-8 py-4 text-[18px] font-['Inter',sans-serif] rounded-[12px] hover:bg-[#3a2e22] transition-colors"
            >
              {applyNowLabel}
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
