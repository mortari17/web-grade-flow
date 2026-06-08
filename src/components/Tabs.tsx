import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface TabItem {
  icon: React.ReactNode
  label: string
  content: React.ReactNode
}

interface TabsComponentProps {
  tabs: TabItem[]
}

export function TabsComponent({ tabs }: TabsComponentProps) {
  return (
    <Tabs defaultValue="tab-0">
      <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/5 dark:bg-white/5">
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={`tab-${index}`}
            className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-neutral-900 data-[state=active]:rounded-sm"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={`tab-${index}`}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
