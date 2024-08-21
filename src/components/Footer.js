import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="container text-muted py-4 border-top">
                <div className="text-decoration-none">
                    <p className="float-end mb-1">
                        <Link
                            className="text-decoration-none"
                            href="#">
                            Back to top
                        </Link>
                    </p>
                    <p>R is © Recipe List, but please feel free to explore and add your unique recipes!</p>
                    <p>New to R? <Link
                        className="text-decoration-none"
                        href="/recipe/list">Visit the recipe page!</Link>
                    </p>
                </div>
            </footer>
        </>
    )
}