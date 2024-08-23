import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // Récupérer les cookies (ou utiliser des en-têtes si nécessaire)
    const isAuth = String(request.cookies.get('isAuth')) === 'true'; // ou 'isAuth' dans le cookie
    const role = request.cookies.get('role'); // 'role' dans le cookie

    // Si l'utilisateur n'est pas connecté et tente d'accéder à une page admin, redirigez-le vers la page de connexion
    if (!isAuth && url.pathname.startsWith('/admin') && String(role) === 'CUSTOMER') {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Continuez la requête si l'utilisateur est connecté ou s'il ne tente pas d'accéder à une page protégée
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'], // Applique le middleware aux routes sous /admin/*
};
