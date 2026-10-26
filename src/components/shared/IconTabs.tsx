import type { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export interface IconTabItem {
  value: string
  icon: ReactNode
  label: string
  content: ReactNode
}

interface IconTabsProps {
  tabs: IconTabItem[]
  defaultValue?: string
}

export function IconTabs({ tabs, defaultValue = tabs[0]?.value }: IconTabsProps) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList
        className="grid w-full mb-8 bg-black/5"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-neutral-900 data-[state=active]:rounded-sm"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
