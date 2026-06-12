import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface TabItem {
  icon: React.ReactNode
  label: string
  content: React.ReactNode
}

type TabVariant = 'default' | 'fdsbc'

interface TabsComponentProps {
  tabs: TabItem[]
  variant?: TabVariant
}

const variantStyles: Record<TabVariant, { list: string; trigger: string }> = {
  default: {
    list: 'bg-black/5 dark:bg-white/5',
    trigger:
      'data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:bg-neutral-900',
  },
  fdsbc: {
    list: 'bg-white/5',
    trigger:
      'data-[state=active]:text-amber-400 data-[state=active]:border-amber-400 data-[state=active]:bg-blue-800',
  },
}

export function TabsComponent({ tabs, variant = 'default' }: TabsComponentProps) {
  const styles = variantStyles[variant]

  return (
    <Tabs defaultValue="tab-0">
      <TabsList className={`grid w-full grid-cols-2 mb-8 ${styles.list}`}>
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={`tab-${index}`}
            className={`flex items-center gap-2 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:rounded-sm ${styles.trigger}`}
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
