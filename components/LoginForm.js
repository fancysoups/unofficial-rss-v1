import React, { useState, useContext } from 'react';
import { postLogin, getInfo } from 'utils/api';
import { UserContext } from './UserContext';
import Router from 'next/router';
import { getColorForStringColor } from 'utils/colors';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [submitting, setSubmitting] = useState();
  const [success, setSuccess] = useState();
  const { setUser } = useContext(UserContext);
  const onSubmit = async e => {
    e.preventDefault();
    if (submitting || success) return;
    setSubmitting(true);
    setErrorMessage();
    const { user, error } = await postLogin({ email, password });
    if (user) {
      const { user } = await getInfo();
      setSuccess(true);
      setUser(user);
      Router.push('/feeds');
    } else if (error) {
      setErrorMessage(error);
    }
    setSubmitting(false);
  };
  return (
    <div className="login">
      <div className="title">Unofficial RSS for Stitcher</div>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="form-item">
          <label>Email address</label>
          <input
            type="email"
            required
            placeholder="Your Stitcher email address..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Your Stitcher password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <button type="submit" disabled={submitting || success}>
            {submitting || success ? 'Logging in...' : 'Log in'}
          </button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </form>
      <div className="info">
        <div className="info-title">How this works</div>
        <div className="info-text">
          Your login data is encrypted and sent to Stitcher's servers to confirm
          your premium subscription status. Your email and password are never
          saved or stored anywhere and our full source code can be viewed{' '}
          <a
            className="info-link"
            href="https://github.com/fancysoups/unofficial-rss"
            target="_blank"
          >
            here.
          </a>
        </div>
      </div>
      <style jsx>{`
        .login {
          border-radius: 10px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.4);
          margin-top: 20px;
        }
        .login-form {
          padding: 15px 30px;
        }
        .title {
          text-align: center;
          font-size: 12px;
          padding: 10px;
          color: #ccc;
          background: hsl(242, 27%, 1%);
        }
        .form-item {
          margin-bottom: 10px;
        }
        label {
          margin: 5px;
          font-weight: 500;
          font-size: 12px;
          display: block;
        }
        input {
          width: 100%;
          padding: 10px 15px;
          outline: none;
          border-radius: 10px;
          border: 1px solid hsl(236, 6%, 30%);
          background: rgba(255, 255, 255, 0.025);
          color: hsl(242, 3%, 55%);
          font-size: 14px;
        }
        input:focus {
          border: 1px solid ${getColorForStringColor('blue2')};
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        .info {
          background: hsl(242, 27%, 1%);
          padding: 20px 35px;
        }
        .info-title {
          text-transform: uppercase;
          font-size: 11px;
          margin-bottom: 5px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
        }
        .info-text {
          font-size: 13px;
          line-height: 1.5em;
          color: #ccc;
          margin-bottom: 10px;
        }
        .info-text:last-of-type {
          margin-bottom: 0;
        }
        .info-link {
          color: white;
        }
        .error {
          background: hsl(0, 100%, 30%);
          padding: 10px;
          color: white;
          border-radius: 5px;
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.4em;
        }
        @media (max-width: 768px) {
          .login {
            margin: 0;
          }
          input {
            font-size: 16px;
          }
          .login-form {
            padding: 15px 10px;
          }

          .info {
            padding: 20px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
