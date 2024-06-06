import Head from 'next/head';
import Image from 'next/image';
import style from '../styles/login.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      // Sucesso
      router.push('/Home'); 
    } else {
      // Erro
      setError(data.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.logo} src="/assets/logo.png" alt="Logo da empresa" />
      </div>

      <div className={style.content}>
        <div className={style.form}>
          <h3 className={style.subTitle}>Acesse sua conta</h3>
          <input
            className={style.input}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={style.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={style.error}>{error}</p>}
          <button className={style.button} type="button" onClick={handleLogin}>
            Acessar
          </button>
        </div>
      </div>

      <div className={style.blackBackground}></div>
      <div className={style.footer}>
        <p>Ainda não tem acesso?</p>
        <button className={style.button2} onClick={() => router.push('/signup')}>
          Criar uma conta
        </button>
      </div>
    </div>
  );
}

export default Login;
