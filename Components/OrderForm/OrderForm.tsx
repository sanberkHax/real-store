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
      {errors.email && (
        <span className="text-sm text-red-500 font-bold">
          {errors.email.message}
        </span>
      )}

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
      {errors.cardNumber && (
        <span className="text-sm text-red-500 font-bold">
          {errors.cardNumber.message}
        </span>
      )}
      <div className="flex gap-4">
        <div className="flex flex-col just">
          <Controller
            name="expirationDate"
            control={control}
            rules={{ required: 'Expiration date is required' }}
            render={({ field }) => {
              return (
                <InputMask mask="99/99" maskPlaceholder="" {...field}>
                  <FormInput label="Expiration" />
                </InputMask>
              );
            }}
          />

          {errors.expirationDate && (
            <span className="text-sm text-red-500 font-bold">
              {errors.expirationDate.message}
            </span>
          )}
        </div>
        <div className="flex flex-col just">
          <Controller
            name="cvv"
            control={control}
            rules={{ required: 'CVV is required' }}
            render={({ field }) => {
              return (
                <InputMask mask="999" maskPlaceholder="" {...field}>
                  <FormInput label="CVV" />
                </InputMask>
              );
            }}
          />
          {errors.cvv && (
            <span className="text-sm text-red-500 font-bold">
              {errors.cvv.message}
            </span>
          )}
        </div>
      </div>
      <Button text="Pay" />
    </form>
  );
};
