// REACT
import { useEffect, useState } from 'react';

// NEXT
import { useRouter } from 'next/router';

// THIRD PARTY
import { getSession } from 'next-auth/client';

// OWN
import AuthForm from '../../components/auth/auth-form';

function AuthPage() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        getSession().then(session => {
            if (session) {
                router.replace('/');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);


    if (isLoading) {
        return <p>Loading...</p>
    }

    return <AuthForm />;
}

export default AuthPage;