export default function Loader({ size = 40,   center = true, className = "" }) {
    const spinnerSize = `${size}px`

    return (
        <div className={`${center ? "flex flex-col items-center justify-center gap-2 w-full" : ""} ${className}`}>
            <div
                className="rounded-full border-4 border-gray-300 border-t-black animate-spin"
                style={{
                    width: spinnerSize,
                    height: spinnerSize,
                }}
            ></div>
        </div>
    )
}
