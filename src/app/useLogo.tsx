import AithoLogo from './assets/company-logo/aitho.svg';
import MadfarmLogo from './assets/company-logo/madfarm.svg';
import AvevaLogo from './assets/company-logo/aveva.svg';
import TreedomLogo from './assets/company-logo/treedom.svg';
import TimLogo from './assets/company-logo/tim.svg';
import PoliLogo from './assets/company-logo/polito.svg';
import UPVLogo from './assets/company-logo/upv.svg';


// Mapping of company names to their logo components
const companyLogos = {
    'AITHO': <AithoLogo />,
    'Madfarm': <MadfarmLogo />,
    'AVEVA': <AvevaLogo />,
    'Treedom': <TreedomLogo />,
    'Telecom Joint openLab': <TimLogo />,
    'Politecnico di Torino': <PoliLogo />,
    'Universidad Politécnica de Valencia - EPSG': <UPVLogo />,
};
export type companyName = keyof typeof companyLogos;

export const useLogo = () => {
    // Default logo if the company name does not match
    const DefaultLogo = () => null;

    // Select the logo component based on the company name or return DefaultLogo if not found
    const logoComponent = (companyName: companyName) => companyLogos[companyName] || DefaultLogo;

    return {logoComponent};
};
