
type SectionMeta = Required<Pick<BaseProps, 'id' | 'label'>>


export const HOME_SECTIONS = {
  why: { id: 'why', label: 'Why' },
  howItWorks: { id: 'how-it-works', label: 'How it works' },
  explore: { id: 'explore', label: 'Explore' },
  
} as const satisfies Record<string, SectionMeta>




// เรียงตามลำดับที่ section ปรากฏบนหน้า
export const homeNavItems: SectionMeta[] = Object.values(HOME_SECTIONS)