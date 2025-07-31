import { Card } from '@/Components/UI/card';
// import { IoMdArrowBack } from 'react-icons/io';
import loginImg1 from '@/assets/images/loginImg1.webp';
import loginImg2 from '@/assets/images/loginImg2.webp';
import BG from '@/assets/images/login_bg.webp';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import Field from '../UI/Field';
import SubmitBtn from '../UI/SubmitBtn';
const LoginComponent = ({ handleSubmit, togglePasswordVisibility, showPassword, register, errors }) => {
    return (
        <div style={{ backgroundImage: `url(${BG})` }} className="flex h-screen w-full bg-[#f6f6f6] bg-blend-luminosity">
            <div className="absolute top-0 left-0 h-full w-full bg-white opacity-[70%]" />
            <div className="relative hidden h-full w-[30%] md:block">
                <span className="absolute top-5 left-5 flex h-15 w-15 items-center justify-center rounded-full bg-[#FFFFFF1F]">
                    <IoMdArrowBack className="cursor-pointer text-2xl text-white" onClick={() => window.history.back()} />
                </span>
                <img className="h-screen w-full object-cover" alt="Element quran islam" draggable="false" src={loginImg1} />
            </div>
            <div className="relative z-10 flex h-full w-full items-center justify-center p-4 md:w-[70%]">
                <Card className="w-full max-w-[500px] overflow-hidden rounded-xl border-none bg-white shadow-lg">
                    {/* Header image */}
                    <div className="h-[100px] w-full overflow-hidden">
                        <img className="h-full w-full object-cover" alt="Islamic decorative pattern" draggable="false" src={loginImg2} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 p-8">
                        {/* Form fields */}
                        <div className="space-y-6">
                            <Field label={'Email or phone number'} labelClassName={'text-[#afafaf]'} error={errors.email}>
                                <input
                                    type="text"
                                    {...register('email', { required: 'Email or phone number is required' })}
                                    placeholder="Enter Email or phone number"
                                    className="font-14-regular h-[66px] rounded-lg border border-solid border-[#afafaf] px-4 py-3 text-[length:var(--14-regular-font-size)] leading-[var(--14-regular-line-height)] font-[number:var(--14-regular-font-weight)] tracking-[var(--14-regular-letter-spacing)] text-[#afafaf] [font-style:var(--14-regular-font-style)] focus:outline-0"
                                />
                            </Field>
                            <Field label={'password'} labelClassName={'text-[#afafaf]'} error={errors.password}>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', { required: 'Password is required' })}
                                        placeholder="Enter Password"
                                        className="font-14-regular h-[66px] w-full rounded-lg border border-solid border-[#afafaf] px-4 py-3 pr-12 text-[length:var(--14-regular-font-size)] leading-[var(--14-regular-line-height)] font-[number:var(--14-regular-font-weight)] tracking-[var(--14-regular-letter-spacing)] text-[#afafaf] [font-style:var(--14-regular-font-style)] focus:outline-0"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#afafaf] hover:text-[#666] focus:outline-none"
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                    </button>
                                </div>
                            </Field>
                        </div>

                        {/* Login button */}
                        <SubmitBtn
                            showIcon={false}
                            btnText={'Login'}
                            className="font-16-medium h-14 w-full cursor-pointer rounded-lg bg-[#4891ff] text-[length:var(--16-medium-font-size)] leading-[var(--16-medium-line-height)] font-[number:var(--16-medium-font-weight)] tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)] hover:bg-[#3a7fe6] hover:text-white"
                        />
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginComponent;
