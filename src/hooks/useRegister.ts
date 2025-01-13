import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "@validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;

    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  };

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    dispatch(resetUI());
  }, [dispatch]);

  return {
    loading,
    error,
    register,
    handleSubmit,
    submitForm,
    emailOnBlurHandler,
    emailAvailabilityStatus,
    errors,
    accessToken,
  };
};

export default useRegister;
