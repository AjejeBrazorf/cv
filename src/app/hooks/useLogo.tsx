import AithoLogo from '../assets/company-logo/aitho.svg'
import MadfarmLogo from '../assets/company-logo/madfarm.svg'
import AvevaLogo from '../assets/company-logo/aveva.svg'
import TreedomLogo from '../assets/company-logo/treedom.svg'
import TimLogo from '../assets/company-logo/tim.svg'
import PoliLogo from '../assets/company-logo/polito.svg'
import UPVLogo from '../assets/company-logo/upv.svg'


const companyLogos = {
    'AITHO': <AithoLogo />,
    'Madfarm': <MadfarmLogo />,
    'AVEVA': <AvevaLogo />,
    'Treedom': <TreedomLogo />,
    'Telecom Joint openLab': <TimLogo />,
    'Politecnico di Torino': <PoliLogo />,
    'Universidad Politécnica de Valencia - EPSG': <UPVLogo />,
}
export type CompanyName = keyof typeof companyLogos

export const useLogo = () => {
    const DefaultLogo = () => null

    const logoComponent = (companyName: string) => companyLogos[companyName as CompanyName] || DefaultLogo

    return {logoComponent}
}
