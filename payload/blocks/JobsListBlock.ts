import type { Block } from 'payload'

export const JobsListBlock: Block = {
  slug: 'jobsListBlock',
  labels: { singular: 'Jobs Section', plural: 'Jobs Sections' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subtitle', type: 'text', localized: true },
    { name: 'applyNowLabel', type: 'text', localized: true },
    { name: 'openApplicationLabel', type: 'text', localized: true },
    { name: 'sendCVLabel', type: 'text', localized: true },
    { name: 'applicationSubjectPrefix', type: 'text', localized: true },
    { name: 'openApplicationSubject', type: 'text', localized: true },
  ],
}
