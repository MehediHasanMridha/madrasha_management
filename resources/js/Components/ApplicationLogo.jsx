import Logo from '@/assets/images/logo.png';
import { usePage } from '@inertiajs/react';
export default function ApplicationLogo(props) {
    const { logo } = usePage().props.institute || {};
    return <img src={logo ? `/${logo}` : Logo} alt="Institute Logo" className="h-[33.16px] w-[32px]" {...props} />;
}
