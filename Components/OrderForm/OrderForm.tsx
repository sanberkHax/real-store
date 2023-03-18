import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';
import { selectCartArray, emptyCart } from '@/redux/slices/cartSlice';
import { Button } from '@/Components/Button/Button';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { FormInput } from '@/Components/FormInput/FormInput';
import InputMask from 'react-input-mask';

export const OrderForm = () => {
  const cart = useSelector(selectCartArray);
  const dispatch = useAppDispatch();
  const router = useRouter();

  type FormData = {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    email: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data) => {
    dispatch(emptyCart());
    alert(`'Order Succesful!`);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        label="Email"
        {...register('email', {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
          required: 'Email is required',
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <Controller
        name="cardNumber"
        control={control}
        rules={{ required: 'Card number is required' }}
        render={({ field }) => {
          return (
            <InputMask mask="9999 9999 9999 9999" maskPlaceholder="" {...field}>
              <FormInput label="Card Number" />
            </InputMask>
          );
        }}
      />
      {errors.cardNumber && <span>{errors.cardNumber.message}</span>}
      <Controller
        name="expirationDate"
        control={control}
        rules={{ required: 'Expiration date is required' }}
        render={({ field }) => {
          return (
            <InputMask mask="99/99" maskPlaceholder="" {...field}>
              <FormInput label="Expiration Date" />
            </InputMask>
          );
        }}
      />
      {errors.expirationDate && <span>{errors.expirationDate.message}</span>}
      <FormInput
        label="CVV"
        maxLength={3}
        {...register('cvv', { required: 'CVV is required' })}
      />
      {errors.cvv && <span>{errors.cvv.message}</span>}
      <Button text="Pay" />
    </form>
  );
};
