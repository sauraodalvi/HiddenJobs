export default function TestPage() {
    return (
        <div>
            <p>Pub: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 10)}...</p>
            <p>Sec: {process.env.CLERK_SECRET_KEY ? "EXISTS" : "MISSING"}</p>
        </div>
    );
}
