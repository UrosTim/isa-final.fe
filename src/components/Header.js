'use client'
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Header() {
    const {data: session} = useSession();

    return (
        <>
            <div className="container">
                <header
                    className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <Link href="/"
                          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <svg width="4vh" id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
                            <title>Logo</title>
                            <g transform="translate(-8.000000, -2.000000)">
                                <g transform="translate(11.000000, 5.000000)">

                                    <polygon
                                        id="Shape"
                                        stroke="currentColor"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points="39 0 0 22 0 67 39 90 78 68 78 23"

                                        fill="none"
                                    />

                                    <text x="39" y="45" dominantBaseline="middle" textAnchor="middle"
                                          fontSize="30">R
                                    </text>
                                </g>
                            </g>
                        </svg>
                    </Link>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link href="/" className="nav-link px-2 link-dark link-opacity-50-hover">Home</Link></li>
                        <li><Link href="/recipe/list"
                                  className="nav-link px-2 link-dark link-opacity-50-hover">Recipes</Link></li>
                        <li><Link href="#" className="nav-link px-2 link-dark">Pricing</Link></li>
                        <li><Link href="/user/list"
                                  className="nav-link px-2 link-dark link-opacity-50-hover">Users</Link></li>
                        <li><Link href="#" className="nav-link px-2 link-dark">About</Link></li>
                    </ul>

                    <div className="col-md-3 text-end">
                        {session && session.user ? (
                            <>
                                <Link
                                    href="/"
                                    className="me-2 text-decoration-none"
                                    style={{ color: 'gray', textDecoration: 'none' }}
                                    onMouseOver={(e) => (e.target.style.color = '#eba99d')}
                                    onMouseOut={(e) => (e.target.style.color = 'gray')}
                                >
                                    {session.decoded.email}
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary me-2"
                                    onClick={() => signOut()}>Sign Out
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-outline-primary me-2"
                                onClick={() => signIn()}>Login
                            </button>
                        )}
                    </div>
                </header>
            </div>
        </>
    )
}