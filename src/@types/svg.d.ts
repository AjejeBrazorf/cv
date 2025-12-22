declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  
  // This allows you to use: import MyIcon from './icon.svg'
  // as a React component: <MyIcon />
  const ReactComponent: FC<SVGProps<SVGSVGElement>>
  export default ReactComponent

  // This allows you to access the static URL if needed
  // (though svgr/webpack usually exports the component as default)
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>
}

// Support for importing as a string URL if you use specific loaders
declare module '*.svg?url' {
  const content: string
  export default content
}