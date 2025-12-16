'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function PromptCardSkeleton() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-slate-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-4/5" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="h-6 w-14 bg-slate-200 rounded animate-pulse" />
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded animate-pulse w-full" />
            <div className="h-3 bg-slate-200 rounded animate-pulse w-5/6" />
          </div>
        </div>

        <div className="h-10 bg-slate-200 rounded-lg animate-pulse w-full" />
      </CardContent>
    </Card>
  );
}
