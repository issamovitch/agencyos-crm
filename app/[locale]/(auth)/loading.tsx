export default function LoadingComponent() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent"
                style={{ borderColor: '#e41f07', borderTopColor: 'transparent' }}
            />
        </div>
    )
}