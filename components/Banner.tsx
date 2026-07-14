interface BannerProps {
    title: string;
    isError?: boolean;
}

function Banner({ title, isError }: BannerProps) {
    return (
        <div className={`absolute top-17 right-1 z-5000 px-4 py-3 rounded-lg ${isError ? 'bg-red-100 border border-red-200 text-red-700' : 'bg-emerald-100 border border-emerald-200 text-emerald-700'}`}>
            {title}
        </div>
    )
}

export default Banner
