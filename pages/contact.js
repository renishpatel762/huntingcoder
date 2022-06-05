import React, { useState } from 'react'
import styles from '../styles/contact.module.css'
const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, email, phone, desc);
        const data = { phone, name, email, desc };
        fetch('http://localhost:3000/api/postcontact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.text())
            .then(data => {
                console.log('Sucess:', data);
                alert("thanks for contacting us");
                setPhone('');
                setName('');
                setDesc('');
                setEmail('');
            })
            .catch((err) => {
                console.error('Error:', error);
            })
    }

    const handleChange = (e) => {
        if (e.target.name === 'phone') {
            setPhone(e.target.value);
        } else if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'name') {
            setName(e.target.value);
        } else if (e.target.name === 'desc') {
            setDesc(e.target.value);//to set value of inner text use innerText
        }
    }

    return <div className={styles.container}>
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.mb3}>
                <label htmlFor="name" className={styles.formlabel}>Enter your name</label>
                <input className={styles.input} value={name} onChange={handleChange} type="text" id="name" name="name" required />
            </div>
            <div className={styles.mb3}>
                <label htmlFor="email" className={styles.formlabel}>Enter your email</label>
                <input className={styles.input} value={email} onChange={handleChange} type="email" id="email" name="email" required />
            </div>
            <div className={styles.mb3}>
                <label htmlFor="phone" className={styles.formlabel}>Enter your phone</label>
                <input className={styles.input} value={phone} onChange={handleChange} type="phone" id="phone" name="phone" />
            </div>
            <div className={styles.mb3}>
                <label htmlFor="phone" className={styles.formlabel}>Eleborate your concern</label>
                <textarea className={styles.input} value={desc} name="desc" onChange={handleChange} required />
            </div>
            <button type='submit' className={styles.btn}>Submit</button>
        </form>
    </div>
}

export default Contact