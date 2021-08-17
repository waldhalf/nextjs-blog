// CORE
import Image from 'next/image';

// CSS
import classes from './hero.module.css';

function Hero() {
    return <section className={classes.hero}>
        <div className={classes.image}>
            <Image
                src="/images/profile/me.jpg"
                alt="My photo"
                width={300}
                height={300}
            />
        </div>
        <h1>Bonjour, je suis Rémy</h1>
        <p> Anim aliqua minim dolore reprehenderit sint pariatur commodo.Laboris aliquip exercitation et veniam dolore. Eiusmod minim proident pariatur esse ut nulla dolore aliquip in consequat. Do commodo eiusmod laborum eu esse voluptate veniam cupidatat. Ea id consequat consectetur ipsum officia pariatur. Cupidatat voluptate excepteur non consequat magna consectetur commodo nostrud sunt. Est culpa eu veniam amet aliquip sint anim reprehenderit do esse enim nostrud quis. </p>

    </section>
}

export default Hero;