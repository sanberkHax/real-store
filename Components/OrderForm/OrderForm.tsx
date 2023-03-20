import { useAppDispatch } from '@/redux/hooks';
import { emptyCart } from '@/redux/slices/cartSlice';
import { Button } from '@/Components/Button/Button';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { FormInput } from '@/Components/FormInput/FormInput';
import InputMask from 'react-input-mask';

export const OrderForm = () => {
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
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data) => {
    router.push('/success');
    dispatch(emptyCart());
  };

  const autoFillHandler = () => {
    clearErrors();
    setValue('cardNumber', '1234 5678 9123 4567');
    setValue('email', 'test@test.com');
    setValue('expirationDate', '1223');
    setValue('cvv', '123');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 border-4 border-slate-200 rounded-xl p-8"
    >
      <p
        className="text-orange-500 cursor-pointer font-bold text-sm"
        onClick={autoFillHandler}
      >
        Click to auto-fill test values
      </p>
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
        rules={{
          required: 'Card number is required',
          minLength: {
            value: 19,
            message: 'Card number must be at least 16 characters',
          },
        }}
        render={({ field: { onChange, onBlur, ref, value } }) => {
          return (
            <InputMask
              mask="9999 9999 9999 9999"
              maskPlaceholder=""
              inputRef={ref}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            >
              <FormInput label="Card Number" ref={ref} value={value} />
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
            render={({ field: { onChange, onBlur, ref, value } }) => {
              return (
                <InputMask
                  mask="99/99"
                  maskPlaceholder=""
                  inputRef={ref}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                >
                  <FormInput label="Expiration" ref={ref} />
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
            render={({ field: { onChange, onBlur, ref, value } }) => {
              return (
                <InputMask
                  mask="999"
                  maskPlaceholder=""
                  inputRef={ref}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                >
                  <FormInput label="CVV" ref={ref} />
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
