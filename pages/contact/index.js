// REACT 
import { Fragment } from "react";

// NEXT 
import Head from 'next/head';

// OWN
import ContactForm from "../../components/contact/contact-form";

function ContactPage() {
    return <Fragment>
        <Head>
            <title>Formulaire de contact</title>
            <meta name="description" content="Envoyez moi vos messages" />
        </Head>
        <ContactForm />
    </Fragment>

}

export default ContactPage;