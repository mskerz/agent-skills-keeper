'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'


export type SectionNavItem = Required<Pick<BaseProps, 'id' | 'label'>>

interface SectionNavProps extends BaseProps {
    items: SectionNavItem[]
}

// "เส้นสังเกตการณ์" บนหน้าจอ: ตัดขอบบน 40% และขอบล่าง 55% ออก
// เหลือแถบบางๆ ที่ 40–45% จากขอบบน ถ้า section ไหนแตะแถบนี้ = section นั้น active
const OBSERVER_MARGIN = '-40% 0px -55% 0px'


/**
 * หา element ของแต่ละ section จาก id
 * ข้าม id ที่ไม่มีอยู่บนหน้านี้ (เช่น section ที่ยังไม่ได้ render)
 */
function findSections(ids: string[]): HTMLElement[] {
    return ids
        .map((sectionId) => document.getElementById(sectionId))
        .filter((el): el is HTMLElement => el !== null)
}


/**
 * เริ่มสังเกต sections แล้วเรียก onChange ทุกครั้งที่ section ที่ active เปลี่ยน
 * คืนค่าเป็นฟังก์ชัน cleanup สำหรับหยุดสังเกต
 */
function observeActiveSection(
    sections: HTMLElement[],
    ids: string[],
    onChange: (activeId: string | null) => void
): () => void {
    // เก็บ id ของ section ที่กำลังแตะเส้นสังเกตการณ์ ณ ตอนนี้
    const inView = new Set<string>()

    const observer = new IntersectionObserver(
        (entries) => {
            // อัปเดตเฉพาะ section ที่สถานะเปลี่ยน (เข้า/ออกจากเส้น)
            for (const entry of entries) {
                if (entry.isIntersecting) inView.add(entry.target.id)
                else inView.delete(entry.target.id)
            }
            // ถ้าแตะพร้อมกันหลายอัน ให้เลือกอันที่อยู่ก่อนตามลำดับในเมนู
            // ถ้าไม่มีอันไหนแตะเลย (เช่น อยู่ที่ Hero) ให้เป็น null = ไม่ไฮไลต์
            onChange(ids.find((sectionId) => inView.has(sectionId)) ?? null)
        },
        { rootMargin: OBSERVER_MARGIN }
    )

    sections.forEach((section) => observer.observe(section))

    // cleanup: หยุดสังเกตทั้งหมด
    return () => observer.disconnect()
}


/**
 * เมนูเลื่อนไปยัง section ในหน้า Home
 * - คลิกแล้วเลื่อนแบบ smooth (ตั้งที่ globals.css + data-scroll-behavior ใน layout)
 * - ไฮไลต์เมนูตาม section ที่อยู่กลางจอ
 */
export default function SectionNav({ items, id, className }: SectionNavProps) {
    const pathname = usePathname()
    const [active, setActive] = useState<string | null>(null)

    // แปลง id ทั้งหมดเป็น string เดียว ใช้เป็น dependency แทน array
    // เพื่อไม่ให้ effect รันซ้ำเมื่อ items ถูกสร้างใหม่แต่ค่าเดิม
    const idsKey = items.map((item) => item.id).join(',')

    useEffect(() => {
        const ids = idsKey.split(',')

        // ไฮไลต์เฉพาะหน้า Home เท่านั้น หน้าอื่นไม่มี section เหล่านี้
        const sections = pathname === '/' ? findSections(ids) : []

        if (sections.length === 0) {
            setActive(null)
            return
        }

        // เริ่มสังเกต และคืน cleanup ให้ React เรียกเมื่อ unmount หรือ dependency เปลี่ยน
        return observeActiveSection(sections, ids, setActive)
    }, [pathname, idsKey])



    return (
        <nav
            id={id}
            aria-label="Page sections"
            className={cn(
                'flex items-center gap-6 text-sm font-medium text-muted-foreground',
                className
            )}
        >
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={cn(
                        'relative transition-colors hover:text-foreground',
                        'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform',
                        'aria-[current=location]:text-foreground aria-[current=location]:after:scale-x-100'
                    )}
                >
                    {item.label}
                </Link>

            ))}


        </nav>
    )
}
