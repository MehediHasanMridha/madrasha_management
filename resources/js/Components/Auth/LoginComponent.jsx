import { Button } from '@/Components/UI/button';
import { Card } from '@/Components/UI/card';
import Field from '../UI/Field';
const LoginComponent = ({ handleSubmit, setData, loginImg1, loginImg2 }) => {
    return (
        <div className="flex h-screen w-full bg-[#f6f6f6]">
            <div className="relative hidden h-full w-[30%] md:block">
                <img className="h-screen w-full object-cover" alt="Element quran islam" src={loginImg1} />
            </div>
            <div className="flex h-full w-full items-center justify-center p-4 md:w-[70%]">
                <Card className="w-full max-w-[500px] overflow-hidden rounded-xl border-none bg-white shadow-none">
                    {/* Header image */}
                    <div className="h-[100px] w-full overflow-hidden">
                        <img className="h-full w-full object-cover" alt="Islamic decorative pattern" src={loginImg2} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 p-8">
                        {/* Form fields */}
                        <div className="space-y-6">
                            <Field label={'Email'} labelClassName={'text-[#afafaf]'}>
                                <input
                                    type="text"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter Email or phone number"
                                    className="font-14-regular h-[66px] rounded-lg border border-solid border-[#afafaf] px-4 py-3 text-[length:var(--14-regular-font-size)] leading-[var(--14-regular-line-height)] font-[number:var(--14-regular-font-weight)] tracking-[var(--14-regular-letter-spacing)] text-[#afafaf] [font-style:var(--14-regular-font-style)] focus:outline-0"
                                />
                            </Field>
                            <Field label={'password'} labelClassName={'text-[#afafaf]'}>
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter Password"
                                    className="font-14-regular h-[66px] rounded-lg border border-solid border-[#afafaf] px-4 py-3 text-[length:var(--14-regular-font-size)] leading-[var(--14-regular-line-height)] font-[number:var(--14-regular-font-weight)] tracking-[var(--14-regular-letter-spacing)] text-[#afafaf] [font-style:var(--14-regular-font-style)] focus:outline-0"
                                />
                            </Field>
                        </div>

                        {/* Login button */}
                        <Button
                            type="submit"
                            className="font-16-medium h-14 w-full rounded-lg bg-[#4891ff] text-[length:var(--16-medium-font-size)] leading-[var(--16-medium-line-height)] font-[number:var(--16-medium-font-weight)] tracking-[var(--16-medium-letter-spacing)] [font-style:var(--16-medium-font-style)] hover:bg-[#3a7fe6]"
                        >
                            Log in
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginComponent;
