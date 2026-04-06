import HeroBlockComponent from './HeroBlockComponent'
import AboutBlockComponent from './AboutBlockComponent'
import MenuPreviewBlockComponent from './MenuPreviewBlockComponent'
import CateringBlockComponent from './CateringBlockComponent'
import LocationBlockComponent from './LocationBlockComponent'
import JobsListBlockComponent from './JobsListBlockComponent'
import RichTextBlockComponent from './RichTextBlockComponent'
import CTABlockComponent from './CTABlockComponent'
import MenuPageHeaderBlockComponent from './MenuPageHeaderBlockComponent'
import AllergiesNoteBlockComponent from './AllergiesNoteBlockComponent'

interface BlockRendererProps {
  blocks: any[]
  siteSettings?: any
  openJobs?: any[]
}

export default function BlockRenderer({ blocks, siteSettings, openJobs = [] }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'heroBlock':
            return <HeroBlockComponent key={i} block={block} reservationUrl={siteSettings?.reservationUrl} />
          case 'aboutBlock':
            return <AboutBlockComponent key={i} block={block} />
          case 'menuPreviewBlock':
            return <MenuPreviewBlockComponent key={i} block={block} />
          case 'cateringBlock':
            return <CateringBlockComponent key={i} block={block} siteSettings={siteSettings} />
          case 'locationBlock':
            return <LocationBlockComponent key={i} block={block} siteSettings={siteSettings} />
          case 'jobsListBlock':
            return <JobsListBlockComponent key={i} block={block} openJobs={openJobs} siteSettings={siteSettings} />
          case 'richTextBlock':
            return <RichTextBlockComponent key={i} block={block} />
          case 'ctaBlock':
            return <CTABlockComponent key={i} block={block} />
          case 'menuPageHeaderBlock':
            return <MenuPageHeaderBlockComponent key={i} block={block} />
          case 'allergiesNoteBlock':
            return <AllergiesNoteBlockComponent key={i} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
