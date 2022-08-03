import React, { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector, fetchRegister } from '../../redux/slices/authSlice';
import axios from '../../axios';
import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const inputFileRef = useRef();
  const [imageUrl, setImageUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      avatarUrl: imageUrl,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    console.log({...values, avatarUrl: imageUrl}, 'v');
    const data = await dispatch(fetchRegister({...values, avatarUrl: imageUrl}));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  const handleChangeFile = async (event) => {
    try {
      console.log(event, 'e');
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch(err) {
      console.warn(err);
      alert('Ошибка загрузки файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          type="text"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName' , { required: 'Укажите имя' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email' , { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password' , { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button onClick={() => inputFileRef.current.click()} {...register('avatarUrl')} variant="outlined" size="large">
          Загрузить аватар
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile}  hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" width='300' height='200'/>
          </>
        )}
        <br />
        <br />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
