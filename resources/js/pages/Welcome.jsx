import { Link } from '@inertiajs/react';

const Welcome = () => {
    return (
        <div className="bg-[#f2f2f2]">
            <div className="flex h-screen w-full items-center justify-center">
                <Link href={route('login')} className="bg-amber-800 p-10 text-3xl text-[#4891FF]">
                    Go to Login page
                </Link>
                <Link href={route('register')} className="bg-amber-800 p-10 text-3xl text-[#4891FF]">
                    Go to sign up page
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
