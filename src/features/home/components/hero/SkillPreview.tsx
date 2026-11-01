import React from 'react'

export default function SkillPreview() {
    return (
        /* Wrapper: กำหนด width และ reserve พื้นที่สำหรับ glow + stacked cards */
        <div className="relative w-full max-w-sm shrink-0 select-none" aria-hidden="true">

            {/* ── Ambient glow ── ไม่ใช่ shadow กล่อง แต่เป็น blur blob ใต้ card */}
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-24 rounded-full bg-primary/20 blur-2xl dark:bg-primary/15" />

            {/* ── Ghost card ด้านหลัง (depth layer) ── */}
            <div
                className="absolute inset-x-6 top-3 h-full rounded-2xl bg-secondary/60 dark:bg-secondary/40"
                style={{ transform: 'rotate(1.5deg) translateY(2px)' }}
            />

            {/* ── Main card ── */}
            <div className="relative rounded-2xl bg-secondary dark:bg-secondary overflow-hidden">

                {/* Tab bar */}
                <div className="flex items-center gap-0 border-b border-border/40 px-4 pt-4">
                    {/* Active tab */}
                    <div className="flex items-center gap-2 rounded-t-lg bg-muted px-4 py-2 text-xs">
                        <span className="h-2 w-2 rounded-full bg-primary/70" />
                        <span className="font-mono text-foreground/70 tracking-wide">SKILL.md</span>
                    </div>
                    {/* Faded second tab (ทำให้รู้สึกว่ามี context) */}
                    <div className="flex items-center gap-2 px-4 py-2 text-xs opacity-30">
                        <span className="font-mono text-foreground/60 tracking-wide">README.md</span>
                    </div>
                    {/* Spacer + badge */}
                    <div className="ml-auto pb-2">
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                            Public
                        </span>
                    </div>
                </div>

                {/* Code body */}
                <div className="relative px-5 py-5">
                    <div className="relative rounded-xl bg-code px-5 py-4 font-mono text-sm leading-relaxed overflow-hidden">
                        {/* Code lines */}
                        <div className="flex flex-col gap-0.5 text-muted-foreground/60">
                            <span>---</span>
                            <span>
                                <span className="text-accent-foreground/90">name:</span>
                                <span className="text-foreground/80"> skill-keeper</span>
                            </span>
                            <span>
                                <span className="text-accent-foreground/90">description:</span>
                                <span className="text-foreground/80"> Keeps and shares agent skills</span>
                            </span>
                            <span>---</span>
                        </div>
                        <div className="mt-3 flex flex-col gap-0.5">
                            <strong className="font-bold text-foreground/90"># Skill Keeper</strong>
                            <span className="text-foreground/70 whitespace-nowrap">
                                Use when the user saves a skill
                                {/* Blinking cursor */}
                                <span className="ml-0.5 inline-block h-[1em] w-2 animate-pulse rounded-sm bg-primary/80 align-middle motion-reduce:animate-none" />
                            </span>
                            <span className="text-foreground/40 text-xs mt-1">
                                Triggers in any agent context…
                            </span>
                        </div>

                        {/* Fade-out gradient ด้านล่าง — ตัดขอบแบบเนียน */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-xl bg-linear-to-t from-code to-transparent" />
                    </div>
                </div>

                {/* Footer metadata — เล็กและเงียบ */}
                <div className="flex items-center justify-between px-6 pb-5 text-[11px] text-muted-foreground/50">
                    <span>2 files</span>
                    <span>edited just now</span>
                </div>
            </div>
        </div>
    )
}
