'use client'
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="container text-muted py-4 border-top">
                <div className="text-decoration-none">
                    <p className="float-end mb-1">
                        <Link
                            href="#"
                            style={{ color: '#ed6d56', textDecoration: 'none' }}
                            onMouseOver={(e) => (e.target.style.color = '#eba99d')}
                            onMouseOut={(e) => (e.target.style.color = '#ed6d56')}
                        >
                            Back to top
                        </Link>
                    </p>
                    <p>R is © Recipe List, but please feel free to explore and add your unique recipes!</p>
                    <p>New to R?
                        <Link
                            href="/recipe/list"
                            style={{ color: '#ed6d56', textDecoration: 'none' }}
                            onMouseOver={(e) => (e.target.style.color = '#eba99d')}
                            onMouseOut={(e) => (e.target.style.color = '#ed6d56')}
                        >
                            Visit the recipe page!
                        </Link>
                    </p>
                </div>
            </footer>
        </>
    )
}