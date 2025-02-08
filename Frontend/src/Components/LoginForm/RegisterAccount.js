// import React, { useState, useEffect } from 'react';

// const RegisterAccount = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [telegramUser, setTelegramUser] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Load Telegram Login Widget script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://telegram.org/js/telegram-widget.js?7';
//     script.async = true;
//     script.setAttribute('data-telegram-login', 'myregistertelegrambot'); // Replace with your bot username
//     script.setAttribute('data-size', 'large');
//     script.setAttribute('data-radius', '10');
//     script.setAttribute('data-auth-url', 'http://localhost:6000/auth'); // Replace with your backend auth URL
//     script.setAttribute('data-request-access', 'write');
//     script.onload = () => {
//       console.log('Telegram Widget Script Loaded');
//       window.onTelegramAuth = (user) => {
//         console.log('Telegram User Data:', user);
//         setTelegramUser(user);
//         handleTelegramLogin(user); // Automatically log in the user
//       };
//     };
//     script.onerror = () => {
//       console.error('Failed to load Telegram Widget Script');
//     };
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Clear errors when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: '',
//       });
//     }
//   };

//   const handleTelegramLogin = async (user) => {
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:6000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           telegramId: user.id,
//         }),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.message || 'Login failed');
//       }

//       console.log('Login successful:', result);
//       setIsLoggedIn(true);
//       setErrors({});
//     } catch (error) {
//       console.error('Login failed:', error);
//       setErrors({ submit: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};

//     if (!telegramUser && !formData.username) {
//       newErrors.username = 'Username is required';
//     }

//     if (!telegramUser && !formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!telegramUser && !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email address is invalid';
//     }

//     if (!telegramUser && !formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     if (!telegramUser && !formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (!telegramUser && formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const registrationData = telegramUser
//         ? {
//             telegramId: telegramUser.id,
//             firstName: telegramUser.first_name,
//             lastName: telegramUser.last_name,
//             username: telegramUser.username,
//           }
//         : formData;

//       const endpoint = telegramUser ? '/auth' : '/register';
//       const response = await fetch(`http://localhost:6000${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(registrationData),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.message || 'Registration failed');
//       }

//       console.log('Registration Data:', result);
//       setIsRegistered(true);
//       setErrors({});
//     } catch (error) {
//       console.error('Registration failed:', error);
//       setErrors({ submit: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <h2>Register Account</h2>
//           {isRegistered ? (
//             <div className="alert alert-success" role="alert">
//               Registration successful! You can now log in.
//             </div>
//           ) : isLoggedIn ? (
//             <div className="alert alert-success" role="alert">
//               Login successful! Welcome back, {telegramUser.first_name}.
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               {!telegramUser && (
//                 <>
//                   <div className="form-group">
//                     <label htmlFor="username">Username</label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.username ? 'is-invalid' : ''}`}
//                       id="username"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       required
//                     />
//                     {errors.username && (
//                       <div className="invalid-feedback">{errors.username}</div>
//                     )}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input
//                       type="email"
//                       className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                     {errors.email && (
//                       <div className="invalid-feedback">{errors.email}</div>
//                     )}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                       type="password"
//                       className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                       id="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                     {errors.password && (
//                       <div className="invalid-feedback">{errors.password}</div>
//                     )}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                     <input
//                       type="password"
//                       className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       required
//                     />
//                     {errors.confirmPassword && (
//                       <div className="invalid-feedback">{errors.confirmPassword}</div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {telegramUser ? (
//                 <div className="alert alert-info" role="alert">
//                   Logged in with Telegram as {telegramUser.first_name} (@
//                   {telegramUser.username})
//                 </div>
//               ) : (
//                 <div
//                   id="telegram-login"
//                   style={{ marginBottom: '20px' }}
//                 ></div>
//               )}

//               {errors.submit && (
//                 <div className="alert alert-danger" role="alert">
//                   {errors.submit}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm"
//                       role="status"
//                       aria-hidden="true"
//                     ></span>{' '}
//                     Registering...
//                   </>
//                 ) : (
//                   'Register'
//                 )}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterAccount;



import React, { useState, useEffect } from 'react';

const RegisterAccount = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '', // Changed from username to phoneNumber
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [telegramUser, setTelegramUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load Telegram Login Widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.async = true;
    script.setAttribute('data-telegram-login', 'myregistertelegrambot'); // Replace with your bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-auth-url', 'http://localhost:80/auth'); // Replace with your backend auth URL
    script.setAttribute('data-request-access', 'write');
    script.onload = () => {
      console.log('Telegram Widget Script Loaded');
      window.onTelegramAuth = (user) => {
        console.log('Telegram User Data:', user);
        setTelegramUser(user);
        handleTelegramLogin(user); // Automatically log in the user
      };
    };
    script.onerror = () => {
      console.error('Failed to load Telegram Widget Script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleTelegramLogin = async (user) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:80/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId: user.id,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      console.log('Login successful:', result);
      setIsLoggedIn(true);
      setErrors({});
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate phone number
    if (!telegramUser && !formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!telegramUser && !/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (10-15 digits required)';
    }

    // Validate email
    if (!telegramUser && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (!telegramUser && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Validate password
    if (!telegramUser && !formData.password) {
      newErrors.password = 'Password is required';
    }

    // Validate confirm password
    if (!telegramUser && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!telegramUser && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = telegramUser
        ? {
            telegramId: telegramUser.id,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            username: telegramUser.username,
          }
        : formData;

      const endpoint = telegramUser ? '/auth' : '/register';
      const response = await fetch(`http://localhost:80${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      console.log('Registration Data:', result);
      setIsRegistered(true);
      setErrors({});
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Register Account</h2>
          {isRegistered ? (
            <div className="alert alert-success" role="alert">
              Registration successful! You can now log in.
            </div>
          ) : isLoggedIn ? (
            <div className="alert alert-success" role="alert">
              Login successful! Welcome back, {telegramUser.first_name}.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {!telegramUser && (
                <>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">{errors.phoneNumber}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>
                </>
              )}

              {telegramUser ? (
                <div className="alert alert-info" role="alert">
                  Logged in with Telegram as {telegramUser.first_name} (@
                  {telegramUser.username})
                </div>
              ) : (
                <div
                  id="telegram-login"
                  style={{ marginBottom: '20px' }}
                ></div>
              )}

              {errors.submit && (
                <div className="alert alert-danger" role="alert">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{' '}
                    Registering...
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterAccount;