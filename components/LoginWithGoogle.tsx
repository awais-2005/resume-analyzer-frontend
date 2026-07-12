import Image from 'next/image'
import googleIcon from '@/public/google.svg'
function LoginWithGoogle() {

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

    const handleGoogleLogin = () => {
        if (!serverUrl) {
            alert("Sorry for inconvenience. This service is currently unavailable. Please try again later.");
            return;
        }
        window.location.href = `${serverUrl}/auth/google`;
    };

    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-700 font-medium transition-colors"
        >
            <Image
                src={googleIcon}
                alt="Google Icon"
                width={20}
                height={20}
            />
            <p className="text-sm font-medium">Sign in with Google</p>
        </button>
    )
}

export default LoginWithGoogle
