// REACT
import { useEffect, useState } from 'react';

// OWN
import Notification from '../ui/notification';

// CSS
import classes from './contact-form.module.css';


async function SendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState();

    // SetTimeout on Notification
    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        // add client side validation if needed

        setRequestStatus('pending');
        try {
            await SendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            });
            setRequestStatus('success');
            setEnteredMessage('');
            setEnteredEmail('');
            setEnteredName('');
        } catch (error) {
            setRequestStatus('error');
            setErrorMessage(error.message)
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message ...',
            message: 'Your message is on his way'
        }
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Message has been sent!',
            message: 'Your message is stored'
        }
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Message has not been sent!',
            message: errorMessage
        }
    }
    return <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="email">Your email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={enteredEmail}
                        onChange={event => setEnteredEmail(event.target.value)} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="name">Your Name</label>
                    <input
                        id="name"
                        type="text"
                        required
                        value={enteredName}
                        onChange={event => setEnteredName(event.target.value)} />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor="message">Your message</label>
                <textarea
                    id="message"
                    rows='5'
                    value={enteredMessage}
                    onChange={event => setEnteredMessage(event.target.value)}
                ></textarea>
            </div>

            <div className={classes.actions}>
                <button>Send Message</button>
            </div>

        </form>
        {notification && <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
        />}
    </section>
}

export default ContactForm;