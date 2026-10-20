"use client";

import React, { useEffect, useState } from 'react'
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Container from '../layouts/Container';


interface ClientAppProps {
    children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientAppProps) {
    const currentYear = new Date().getFullYear();
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                <Container className="py-8">{children}</Container>
            </main>

            <Footer year={currentYear} />
        </div>
    );
}
