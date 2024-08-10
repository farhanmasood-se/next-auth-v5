'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

interface ButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: ButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
