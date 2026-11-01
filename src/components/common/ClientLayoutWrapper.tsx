'use client'

import Container from '@/components/layouts/Container'

export default function ClientLayoutWrapper({
    children,
}: ReactNodeProps) {
    return (
        <Container className="py-8">
            {children}
        </Container>
        
    )
}