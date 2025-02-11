import type { FC } from 'react';
import React from 'react'

import { Chip } from '@/app/components/Chip/Chip'
import { Section } from '@/app/components/Section/Section'
import { ChipList } from '@/app/components/ChipList/ChipList'


export interface ToolsProps {
  tools: Record<string, string[]>
}

const Tools: FC<ToolsProps> = ({ tools }) => {

  return (<Section title='Tools' subsections={
        Object.entries(tools).map(([category, toolList]) => {
          return {
            title: category,
            content:<ChipList chips={
              toolList.map((tool, toolIndex) => (
                <Chip key={toolIndex}>{tool}</Chip>
              ))} />
          }
        })
      }></Section>
  )
}

export default Tools
